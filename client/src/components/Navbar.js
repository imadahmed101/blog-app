import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <Link to='/' className='mr-4'>Home</Link>
        <Link to='/add' className='mr-4'>Add</Link>
        <Link to='/dashboard'>Dashboard</Link>
    </header>
  )
}

export default Navbar