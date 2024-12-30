'use client'

import Profile from '@components/Profile'
import { useSearchParams } from '@node_modules/next/navigation'
import React, { useEffect } from 'react'

const IdProfile = ({ params}) => {
  const searchP = useSearchParams()
  const name = searchP.get('name')
  const [userPosts, setUserPosts] = useState([])

  useEffect(()=>{
    const fetchData = async() =>{
      const res = await fetch(`/api/users/${params?.id}/posts`)
      const data = await res.json()
      setUserPosts(data)
    }
    if(params?.id)fetchData()
  }, [params.id])
  return (
    <>
      <Profile name={name} data={userPosts} desc={`Prompt created by ${name}`}/>
    </>
  )
}

export default IdProfile