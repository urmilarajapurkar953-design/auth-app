import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const { userData, backendURL, setUserData, setIsLoggedIn, isLoggedIn } = useContext(AppContext)

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )

      if (data.success) {
        setIsLoggedIn(false)
        setUserData(null)
        toast.success(data.message)
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="w-full flex items-center justify-between px-6 sm:px-20 py-3 fixed top-0 bg-white shadow-sm z-50">

      <img
        src="icon.webp"
        className='w-28 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {isLoggedIn ? (

        <div className="relative">

          {/* Profile Circle */}
          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold cursor-pointer"
          >
            {userData?.name ? userData.name[0].toUpperCase() : "U"}
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      ) : (

        <button
          onClick={() => navigate('/login')}
          className="border px-5 py-2 rounded-full hover:bg-gray-100"
        >
          Login
        </button>

      )}

    </div>
  )
}

export default Navbar