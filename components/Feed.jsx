'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return(<>
    <div className='flex justify-between flex-wrap gap-4'>{data.map(post=><PromptCard
      key={post._id} post={post} handleTagClick={handleTagClick}
    />)}</div>
  </>)
}

// (2) [{…}, {…}]
// 0: {_id:'67720d72422a363f5bd42581', creator: {…}, prompt: 'four', tag: 'twoTag', __v: 0}
// 1: {_id:'677229d8bd5255ff24b9fd5c', creator: {…}, prompt: 'five', tag: 'twoTag', __v: 0}


const Feed = () => {
  const [ searchText, setSearchText] = useState('')
  const [allPost, setAllPost] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setAllPost(data)
    }
    fetchData()
  },[])
  const handleTagClick = () =>{

  }
  const handleSearch = e => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    // If the user types again within 500ms, the process repeats: the previous timeout is cleared, and a new one is set. This ensures that the search only happens 500ms after the user stops typing,  rather than on every keystroke.

    setSearchTimeout(setTimeout(()=>{
      const searchResult = filterData(e.target.value)
      setFilteredData(searchResult)
    },500))
  }


  const filterData = data => {
    const regex = new RegExp(data, 'i')
    return allPost.filter(po=>regex.test(po.creator.username) || regex.test(po.prompt) || regex.test(po.tag))
  }
  return (
    <>
      <div className='flex my-12 justify-center '>
        <input className='w-[70%] shadow-xl py-2 text-gray-900  px-4 placeholder-gray-700 rounded-lg outline-none' placeholder='Search....' value={searchText} onChange={e=>handleSearch(e)}/>
      </div>
      {searchText ? <>
        <PromptCardList data={filteredData} handleTagClick={handleTagClick}/>
      </> : <>
        <PromptCardList data={allPost} handleTagClick={handleTagClick}/>
      </>}
    </>
  )
}

export default Feed