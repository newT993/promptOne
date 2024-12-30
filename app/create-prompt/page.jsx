'use client'
import Form from '@components/Form'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import React, { useState } from 'react'

const CreatePrompt = () => {
  const [ subbmiting, setSubbmiting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e ) =>{
    e.preventDefault()
    setSubbmiting(true)

    try {
      const res = await fetch('/api/prompt/new',{
        method:'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          id: session?.user.id
        })
      })

      if(res.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally{
      setSubbmiting(false)
    }
  }
  return (
    <>
      <Form post={post} setPost={setPost} type={'Create'} subbmiting={subbmiting} handleSubmit={handleSubmit}/>
    </>
  )
}

export default CreatePrompt