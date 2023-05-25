import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Add = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    //need to work on this so it wont let you send a blank one .. validation? and error handling
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await Axios.post('https://blog-app-imadahmed101.azurewebsites.net/', {name})

        console.log(response)
        if (response.status === 200) {
            alert('Successfully added')
            navigate('/', { replace: true })
        }

        if (response.status === 400) {
            alert('error, please try again')
        }
    }

    return (
        <div>
            <h1 className='text-center font-semibold text-xl mb-4'>Add Blog</h1>
            <div className='flex justify-center bg-gray-300 rounded-md max-w-md mx-auto p-2'>

                <form className='flex flex-col' onSubmit={handleSubmit}>

                    <label className='mb-2'>Blog Name: </label>

                    <input
                        type='text'
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                        className='rounded-md mb-4 px-2'
                    />

                    <button
                        className='bg-red-500 text-white rounded-md'
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Add