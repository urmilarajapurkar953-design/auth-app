import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  const { backendURL, setIsLoggedIn, getUserData, isLoggedIn} = useContext(AppContext)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(
          `${backendURL}/api/auth/register`,
          { name, email, password },
          { withCredentials: true }
        )

        if (data.success) {
          toast.success(data.message || "Account created successfully")
          localStorage.removeItem('userData')
          setIsLoggedIn(true)
          await getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(
          `${backendURL}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        )

        if (data.success) {
          toast.success(data.message || "Login successful")
          localStorage.removeItem('userData')
          setIsLoggedIn(true)
          await getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">

        <h2 className="text-2xl font-semibold text-center mb-6">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded-md outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {state === 'Login' && (
            <p
              onClick={() => navigate('/reset-password')}
              className="text-sm text-right text-indigo-500 cursor-pointer"
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition"
          >
            {state}
          </button>

        </form>

        <p className="text-sm text-center mt-4">

          {state === 'Sign Up'
            ? 'Already have an account?'
            : "Don't have an account?"}

          <span
            onClick={() =>
              setState(state === 'Sign Up' ? 'Login' : 'Sign Up')
            }
            className="text-indigo-500 cursor-pointer ml-1"
          >
            {state === 'Sign Up' ? 'Login here' : 'Sign up'}
          </span>

        </p>

      </div>

    </div>

  )
}

export default Login