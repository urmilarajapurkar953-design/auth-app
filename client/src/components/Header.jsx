import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Header = () => {

  const { userData } = useContext(AppContext)

  return (
    <div className='pt-24 flex flex-col items-center text-center'>

      <img src="robert.png" className='w-20 h-20 rounded-full mb-6' />

      <h1 className='text-2xl font-semibold mb-2'>
        {userData ? `Hey ${userData.name} 👋` : "Hey Developer 👋"}
      </h1>

      <h2 className='text-4xl font-bold mb-4'>
        Welcome to your dashboard
      </h2>

      <p className='text-gray-600 max-w-md'>
        JWT Auth system with email verification & reset password.
      </p>

    </div>
  )
}

export default Header