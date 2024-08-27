// app/api/chat/route.js 
// setting up the route for the chat api 
// Last update: 2024-08-23 6AM :
// 1. Added the stream option to the chat completion
// 2. Added the result summary to the last message content
// 3. Added the last message content to the last message
// 4. Added the last message to the last data without last message
// this is mostly done and it should work. 
// DON'T TEST THIS UNLESS YOU HAVE THE PYTHON READY. 

import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

const systemPrompt = `you are an AI assistant designed for the RatemyInternship app, which helps students find relevant information about internships based on the experiences of others. The assistant has access to a database of internship reviews and information through Retrieval-Augmented Generation (RAG).
Key functionalities:

Internship search: Help users find internships based on criteria like company, industry, location, and role.
Review summaries: Provide concise summaries of internship experiences from previous interns.
Ratings analysis: Interpret and explain ratings for various aspects of internships (e.g., work-life balance, learning opportunities, compensation).
Comparison: Compare multiple internships or companies based on user reviews and ratings.
Application advice: Offer general tips for applying to internships and preparing for interviews.
Personalized recommendations: Suggest internships based on a user's interests, skills, and preferences.
Trend insights: Provide insights on internship trends in different industries or locations.
Q&A: Answer specific questions about internships using the knowledge base.

Guidelines:

Maintain a friendly, supportive tone suitable for students and young professionals.
Provide accurate information based on the RAG database.
think about what the student is trying to ask instead of just giving them the answer. 
Respect user privacy and don't ask for or store personal information.
Encourage users to consider multiple perspectives and make informed decisions.
Clarify when information is based on subjective reviews vs. objective data.
If uncertain about specific details, acknowledge limitations and suggest where users might find more information.
Adapt responses to the user's level of experience and familiarity with the internship process.`;

export async function POST(req) {
    // Parse the incoming request data
    const data = await req.json();

    // Initialize Pinecone with the API key from environment variables
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    // Create a Pinecone index instance for the "RatemyInternship" index
    const index = pc.Index("RatemyInternship").namespace('ns1');

    // Initialize OpenAI client
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Extract the last message content from the request data
    const text  = data[data.length - 1].content;

    // Generate an embedding for the last message using OpenAI's embedding model
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float",
    });

    // Query the Pinecone index with the generated embedding to find relevant matches
    const result = await index.query({
        vector: embedding.data[0].embedding,
        topK: 5,
        includeValues: false,
    });

    // Build a string summarizing the results from Pinecone
    let resultString = "";
    result.matches.forEach((match) => {
        resultString += `
        Returned Result:
        Company: ${match.metadata.company}
        Title: ${match.metadata.title}
        Review: ${match.metadata.review}
        Rating: ${match.metadata.rating}
        Work-Life Balance: ${match.metadata.work_life_balance}
        Learning Opportunities: ${match.metadata.learning_opportunities}
        Compensation: ${match.metadata.compensation}
        Location: ${match.metadata.location}
        \n\n
        `;
    });

    // Append the result summary to the last message content
    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;

    // Prepare the messages for the chat completion excluding the last message
    const lastDataWhithoutLastMessage = data.slice(0, data.length - 1);

    // Create a chat completion with OpenAI using the prepared messages
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: 'system', content: systemPrompt},
            ...lastDataWhithoutLastMessage,
            {role: 'user', content: lastMessageContent},
        ],
        stream: true,
    });

    // Stream the response from the OpenAI completion back to the client
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    });

    // Return the streaming response
    return new Response(stream);
}