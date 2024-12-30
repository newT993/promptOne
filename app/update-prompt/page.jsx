'use client'
import Form from '@components/Form'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter, useSearchParams } from '@node_modules/next/navigation'
import React, { useEffect, useState } from 'react'

const EditPrompt = () => {
  const [ subbmiting, setSubbmiting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })
  const router = useRouter()
  const searchPara = useSearchParams()
  const promptId = searchPara.get('id')

  useEffect(()=>{
    const getPromptDetail = async () => {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }
    if(promptId) getPromptDetail()
  },[promptId])

  const handleSubmit = async (e ) =>{
    e.preventDefault()
    setSubbmiting(true)

    try {
      const res = await fetch(`/api/prompt/${promptId}`,{
        method:'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
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
      <Form post={post} setPost={setPost} type={'Edit'} subbmiting={subbmiting} handleSubmit={handleSubmit}/>
    </>
  )
}

export default EditPrompt