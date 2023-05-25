import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Dashboard = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function getBlogs() {
            const response = await fetch(`https://blog-app-imadahmed101.azurewebsites.net/`)

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`
                return
            }

            const blogs = await response.json()
            setBlogs(blogs)
        }
        getBlogs()
    }, [blogs.length])

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm('Do you want to delete id: ' + id + '?')

        if (confirmDelete) {
            const response = await Axios.delete(`https://blog-app-imadahmed101.azurewebsites.net/${id}`)

            if (response.status === 400) {
                const message = `An error occured: ${response.data}`
                alert(message)
            }

            if (response.status === 200) {
                alert('Successfully deleted')
                window.location.reload(false)
            }
        }
    }

    const handleUpdate = async (id, name) => {
        const newName = window.prompt("Update name: ")
        if (!newName) {
            return
        }
        if (newName !== '') {
            const response = await Axios.put(`https://blog-app-imadahmed101.azurewebsites.net/${id}`, {id, newName})
            if(response.status === 200) {
                alert('Successfully updated')
                window.location.reload(false)                
            }
            if(response.status === 400) {
                const message = `An error occured: ${response.data}`
                alert(message)
            }
        }
    }

    return (
        <div>
            <h1 className='text-center font-semibold text-xl mb-4'>Dashboard</h1>

            <table className='mx-auto'>
                <thead className='text-left p-2'>
                    <tr>

                        <th>Name</th>
                        <th>Data</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => {
                        return (
                            <tr key={index} className='p-2 border-t-2 hover:bg-blue-200'>
                                <td className='mb-2 pr-2 text-gray-700'>{blog.name}</td>
                                <td className='mb-2 pr-2 text-gray-700'>sample text.</td>
                                <td className='mb-2'>
                                    <button
                                        onClick={() => handleUpdate(blog._id, blog.name)}
                                        className='bg-orange-500 text-white px-2 mx-2 rounded-sm'>
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className='bg-red-500 text-white px-2 mx-2 rounded-sm'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard