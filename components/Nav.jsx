'use client'
import Image from '@node_modules/next/image'
import Link from '@node_modules/next/link'
import React, { useEffect, useState } from 'react'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'

const Nav = () => {
  const { data: session} = useSession()
  const [ provider, setProvider ] = useState(null)
  const [ dropdown, setDropdown ] = useState(false)

  useEffect(()=>{
    (async () => {
      const res = await getProviders();
      setProvider(res);
    })();
  }, [])

// provier=>  google: 
//             callbackUrl: "http://localhost:3000/api/auth/callback/google"
//             id: "google"
//             name: "Google"
//             signinUrl: "http://localhost:3000/api/auth/signin/google"
//             type: "oauth"
// session =>
//         expires: "2025-01-27T13:56:25.091Z"
//         user: 
//            email: "teddytp330@gmail.com"
//            image: "https://lh3.googleusercontent.com/a/ACg8ocIK10LRpqWftXSUrJO9brlfSCOUNn5o7nHwpRXye2wJsOZaASQ=s96-c"
//            name: "Teddy Tp"

  return (
    <nav className='flex justify-between items-center relative'>
      <Link className="flex space-x-4 flex-center items-center" href={'/'}>
        <Image src={'/assets/images/logo.svg'} className='rounded-full' width={30} height={30} alt='logo'/>
        <h2 className="font-satoshi font-semibold sm:block  hidden">Promptopia</h2>
      </Link>

      {/* Desktop View */}
      <div className='flex items-center space-x-4 hidden sm:flex'>
        {session?.user ? <>
          <Link className='bg-black text-white text-black rounded-3xl p-2 px-4 font-semibold text-sm hover:bg-white hover:text-black hover:border hover:border-black' href={'/create-prompt'}>Create Post</Link>
          <button className='border  rounded-3xl p-2 px-4 border-black font-semibold text-sm hover:bg-black hover:text-white' onClick={signOut}>Sign Out</button>
          <Link href={'/profile'}>
            <Image src={session?.user.image} className='rounded-full' width={30} height={30} alt='logo'/>
          </Link>
        </>:<>
          {provider && Object.values(provider).map(pro=>(<button type='button' onClick={()=>signIn(pro.id)} key={pro.name} className='border  rounded-3xl p-2 px-4 border-black font-semibold text-sm hover:bg-black hover:text-white'>
            Sign In
          </button>))}
        </>}
      </div>

      {/* Mobile View */}
      <div className='sm:hidden flex'>
        {session?.user ? <>
          <Image className='rounded-full sm:hidden cursor-pointer' width={30} height={30} alt='profile'src={session?.user.image} onClick={()=>setDropdown(!dropdown)}/>
          { dropdown && 
            <div className='border rounded-2xl p-4 w-[45%] absolute right-0 top-full mt-3 p-5 rounded-lg min-w-[210px] flex flex-col gap-2 justify-end items-end bg-white shadow-lg'>
              <Link href={'/profile'} className='underline cursor-pointer hover:text-sky-400 font-semibold text-sm text-right' onClick={()=>setDropdown(false)}>My Profile</Link>
              <Link href={'/create-prompt'} className='underline cursor-pointer hover:text-sky-400 font-semibold text-sm text-right mt-1' onClick={()=>setDropdown(false)}>Create Post</Link>
              <button className='border px-4 bg-black text-white py-2 w-full mt-8 rounded-3xl mx-auto hover:bg-white hover:text-black hover:border hover:border-black' onClick={()=>{
                setDropdown(false)
                signOut()
                }} >Sign Out</button>
            </div>
          }
        </>:<>
          {provider && Object.values(provider).map(pro=><button type='button' onClick={()=>signIn(pro.id)} key={pro.name} className='border  rounded-3xl p-2 px-4 border-black font-semibold text-sm hover:bg-black  hover:text-white'>SignIn</button>)}
        </>}
      </div>
  </nav>
  )
}

export default Nav