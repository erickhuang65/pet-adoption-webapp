import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../static/NavbarStyles.css'

const NavBar = (props) => {

    // add the route to navigate to single profile page when user click on search or input search 

    const navigate = useNavigate()

    const handleHomeClick = () => {
        console.log('clicked')
        navigate('/adoptapet')
    }

    return (
        <div className='container'>
            <div className='left-navbar'>
                <img src="/src/static/logo.jpeg" width={'40px'}  onClick={handleHomeClick} />
            </div>
            <div className='right-navbar'>
                <Link to={"adoptapet/search"}>
                    <button className='navbar-button'>
                        <span>&#x1F50D;</span>
                    </button>
                </Link>
                <input type="text" className='inputStyle' />
            </div>
        </div>
    )
}

export default NavBar