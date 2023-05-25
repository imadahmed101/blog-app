import { useEffect, useState } from 'react'
import Axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`http://localhost:5000/`)

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        return
      }

      const blogs = await response.json()
      setBlogs(blogs)
    }
    getBlogs()
  }, [blogs.length])

  return (
    <div>
      <h1 className='text-center font-semibold text-xl mb-4'>Blogs</h1>
      <div className='flex justify-center'>

        {blogs.map((blog, index) => {
          return (
            <div key={index} className='bg-gray-300 max-w-xs p-2 m-2 rounded-md'>
              <p className='text-lg font-medium mb-2'>{blog.name}</p>
              <p className='mb-2 text-gray-700'>asdfka;'lfdasdjf lkasjdfsajdf lk dla sj;flk jsad jkasjd;fklaj sdf</p>
              <button className='bg-red-500 text-white rounded-md p-1'>Read more...</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home