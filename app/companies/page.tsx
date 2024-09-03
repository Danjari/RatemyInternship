'use client';
import React from 'react'
import { useState } from 'react';
import JobCard from '../components/JobCard'
import FilterCompanies from '../components/CompanyFilter'
const Page = () => {

    
    // This is just dummy data
    const jobCards = [
        {
          name: "TechCorp",
          title: "Software Engineer Intern",
          location: "San Francisco, CA",
          description:
            "Work on exciting projects with cutting-edge technologies in a dynamic team environment. Great opportunity to learn and grow your skills.",
          employees: 2000,
          industry: "Technology",
          reviews: 150,
          logo: "/images/techcorp-logo.png", // Make sure to have this image in your public folder
          stars: 4,
        },
        {
          name: "FinBank",
          title: "Data Analyst Intern",
          location: "New York, NY",
          description:
            "Analyze and interpret complex data sets. Collaborate with senior analysts to provide insights that drive key decisions.",
          employees: 5000,
          industry: "Finance",
          reviews: 220,
          logo: "/images/finbank-logo.png", // Make sure to have this image in your public folder
          stars: 5,
        },
        {
          name: "HealthPlus",
          title: "UX/UI Designer Intern",
          location: "Austin, TX",
          description:
            "Design user-friendly interfaces for our health platforms. Work closely with product managers and developers to bring your designs to life.",
          employees: 300,
          industry: "Healthcare",
          reviews: 75,
          logo: "/images/healthplus-logo.png", // Make sure to have this image in your public folder
          stars: 3,
        },
      ];
    
    //   && job.name===company && job.industry===industry && job.location===location
    const [location, setLocation] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [filteredCompanies, setFilteredCompanies] = useState(jobCards);
    const handleFilter = (newLocation: string, newIndustry: string) => {
      setLocation(newLocation);
    setIndustry(newIndustry);
    // Implement filtering logic here, e.g., fetch filtered data from an API
    console.log('Filtered by:', { location: newLocation, industry: newIndustry });
    setFilteredCompanies(jobCards.filter((job) => job.location===location  && job.industry ===industry));
  };
    const handleSearch = (searchTerm: string) => {
        setCompany(searchTerm);
        setFilteredCompanies(jobCards.filter((job) => job.name.toLowerCase()===company.toLowerCase() || job.industry.toLowerCase().includes(company.toLowerCase())));
      };

  return (
    <div>
        {/* This is the serach bar */}
      <div className="flex justify-center items-center h-16 bg-gray-900 px-4">
      <div className="w-full max-w-lg flex">
        <input
          type="text"
          placeholder="search for a company"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={(e) => setCompany(e.target.value)}
        />
        <button onClick={() => handleSearch(company)} className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </div>
    </div>
    <div className="space-y-6">
      {filteredCompanies.map((job, index) => (
        <JobCard
          key={index}
          {...job}
        />
      ))}
    </div>
    <div className="p-6">
      <FilterCompanies onFilter={handleFilter} />
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Filtered Results</h2>
        <p>Location: {location}</p>
        <p>Industry: {industry}</p>
        {/* Render filtered results here based on location and industry */}
      </div>
    </div>


    </div>
  )
}

export default Page
