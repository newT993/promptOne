import React from 'react'

const Form = ({post, subbmiting, type, setPost, handleSubmit}) => {
  return (
    <form className=' w-full container mx-auto h-screen ' onSubmit={handleSubmit}>   
        <h2 className='heading font-bold text-blue-500'>{type} Post</h2>
        <div className='bg-gray-100 w-[60%] shadow-xl rounded-xl p-4'>
            <div className='space-y-4'>
            <h1 className='font-bold '>Enter AI Prompt</h1>
            <textarea className='w-full resize-none min-h-[250px] outline-none p-4'  value={post.prompt} required onChange={e=>setPost({...post, prompt:e.target.value})} placeholder="Write your text here"></textarea>
            <h1 className='font-bold '>Field of Prompt</h1>
            <textarea className='w-full resize-none outline-none p-3 rounded-lg'  value={post.tag} required onChange={e=>setPost({...post, tag:e.target.value})} placeholder="Write your prompt here"></textarea>
            </div>
            <div className='flex justify-end space-x-4 mt-4'>
            <button className='rounded-3xl border border-yellow-400 border-2 px-4 p-1'>Cancel</button>
            <button className='bg-orange-500 rounded-3xl text-white px-4 p-1' type='submit'
            disabled={subbmiting}>
                {subbmiting ? `${type}ing` : type}
            </button>
            </div>
        </div>
    </form>
  )
}

export default Form