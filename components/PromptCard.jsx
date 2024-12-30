'use client'

import { useSession } from '@node_modules/next-auth/react'
import Image from '@node_modules/next/image'
import { usePathname, useRouter } from '@node_modules/next/navigation'
import React, { useState } from 'react'

//in post 
// creator: 
//   email: "teddytp330@gmail.com"
//   image: "https://lh3.googleusercontent.com/a/ACg8ocIK10LRpqWftXSUrJO9brlfSCOUNn5o7nHwpRXye2wJsOZaASQ=s96-c"
//   username: "teddytp"
//   __v: 0
//   _id: "67701c7bd4a94f122b27eeae"
// [[Prototype]]: Object
// prompt: "one"
// tag: "tagOne"
// __v: 0
// _id: "67711bb41941c928ba3fc9e5"
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
    const [ copied, setCopied ] = useState('')
    const { data: session} = useSession()
    const pathName = usePathname()
    const router = useRouter()

    const handleCopy = () =>{
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => {
            setCopied('')
        }, 3000);
    }

    const handleProfileClick = () =>{
      if(post.creator._id == session.user.id) return router.push('/profile')
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }

  return (
    <>
        <div className='w-full md:w-[360px] p-4 px-8 border shadow rounded-xl' onClick={handleProfileClick}>
          <div className='flex items-center w-full space-x-3 '>
            <Image src={post.creator.image} alt='crator_image' className='w-8 h-8 rounded-full' width={40} height={40}/>
            <div className='flex justify-between w-full items-center '>
              <div className=''>
                <h1 className='font-satoshi font-semibold '>{post.creator.username}</h1>
                <p className='font-semibold text-sm text-gray-300'>#{post.creator.email}</p>
              </div>
              <button onClick={handleCopy}>
                <Image src={copied===post.prompt?'/assets/icons/tick.svg':'/assets/icons/copy.svg'} width={20} height={20} alt='copy_img'/>
              </button>
            </div>
          </div>
          <p className='text-center font-satoshi text-gray-700 py-4'>{post.prompt}</p>
          <p className='text-center font-inter text-gray-400 text-sm text-blue-300 mb-1 p-0' onClick={handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>
          {session?.user.id === post.creator._id && pathName==='/profile' && (<div className='flex justify-around py-2'>
            <button onClick={handleEdit} className='bg-green-400 rounded-lg p-2 px-4 font-bold'>Edit</button>
            <button className='bg-red-400 rounded-lg p-2 px-4 font-bold' onClick={handleDelete}>Delete</button>
          </div>)}
        </div>
    </>
  )
}

export default PromptCard