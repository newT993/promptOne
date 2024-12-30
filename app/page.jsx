import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='mt-12'>
        <h1 className="headText font-satoshi text-center font-extrabold">Crying for Rain</h1>
        <p className='text-yellow-400 text-center font-semibold'>Ai Power Prompt</p>
        <p className='text-center w-[80%] mx-auto text-gray-500 font-semibold'>Next.js recently became the official React framework as outlined in React docs. In this course, you'll learn the most important Next.js concepts and how they fit into the React ecosystem. Finally, you'll put your skills to the test by building a modern full-stack Next 14 application.</p>
        <Feed/>
    </section>
  )
}

export default Home