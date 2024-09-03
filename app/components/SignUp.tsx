// 'use client'
// import React from 'react'
// import { useSession, signIn, signOut } from 'next-auth/react'

// const SignUp = () => {
//     const { data: session } = useSession()

//   return (
//     <div>
//       {session ? (
//         <div>
//             <h1>Welcome {JSON.stringify(session.user)}</h1>
//             {/* <p>Emaixl: {session.user.email}</p> */}
//         </div>
//       ) : (
//         <div>
//             <h1>You are not signed in, log into your account now</h1>
//             <div className='flex flex-col gap-4'>
//             <button className='bg-blue-500' onClick={() => signIn('google')}>Sign in with google</button>
//             <button className='bg-blue-900' onClick={() => signIn('github')}>Sign in with github</button>
//             </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SignUp
