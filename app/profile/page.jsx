'use client'

import Profile from '@components/Profile'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import React, { useEffect, useState } from 'react'


// creator: 
//     email: "teddytp330@gmail.com"
//     image: "https://lh3.googleusercontent.com/a/ACg8ocIK10LRpqWftXSUrJO9brlfSCOUNn5o7nHwpRXye2wJsOZaASQ=s96-c"
//     username: "teddytp"
//     __v: 0
//     _id: "67701c7bd4a94f122b27eeae"
// [[Prototype]]: Object
//     prompt: "one"
//     tag: "oneTag"
//     __v: 0
//     _id: "67720d4d422a363f5bd4256f"

const MyProfile = () => {
    const [ posts, setPosts ] = useState([])
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(()=>{
        const fetchData = async() =>{
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        if(session?.user.id) fetchData()
        }, [])

    const handleEdit= (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete= async (post) => {
      console.log(post)
      const sure = confirm('Are you sure you want to delete')
      if(sure){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE'
          })
          const filterData = posts.filter(po=>po._id !== post._id)
          setPosts(filterData)
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <>
        <Profile name="My" desc="Welcome to your personal profile page" data={posts}
            handleEdit={handleEdit} handleDelete={handleDelete}/>
    </>
  )
}

export default MyProfile