import React from 'react'
import PromptCard from './PromptCard'
import Image from '@node_modules/next/image'
import { useSession } from '@node_modules/next-auth/react'

const Profile = ({name, desc, data, handleEdit, handleDelete, creImg}) => {
    const { data: session } = useSession()
  return (
    <>
        <div className='w-full min-h-screen flex justify-center items-center  '>
            <div className='border rounded-xl pt-12  w-[90%] relative px-2'>
                <div className='w-32 h-32 bg-yellow-100 rounded-full absolute -top-16 left-1/2 -translate-x-[50%] overflow-hidden flex justify-center items-center'>
                    {session?.user &&
                        <Image src={session?.user.image} className='fit-conetent ' alt='img' width={130} height={130}/>
                    }
                </div>
                <h1 className='text-4xl font-extrabold '>{name} Profile</h1>
                <p className='py-2 font-bold'>{desc}</p>
                <div className='flex justify-between pt-12 flex-wrap gap-4'>
                    {data.length > 0 ?<>
                        {data.map(post=><PromptCard
                            key={post._id} post={post} handleEdit={()=>handleEdit&& handleEdit(post)} handleDelete={()=>handleDelete&& handleDelete(post)}
                            />)}
                        </>:<h2 className='text-blue-400 font-satoshi font-semibold'>No prompt found.</h2>
                    }</div>
            </div>
        </div>
    </>
  )
}

export default Profile