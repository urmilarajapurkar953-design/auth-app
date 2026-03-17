import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { AppContext } from '../context/AppContext'

const Home = () => {

  const { userData } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200">

      <Navbar />

      {/* Main Content */}
      <div className="pt-24 px-6 sm:px-20 flex flex-col items-center">

        {/* Hero Section */}
        <div className="text-center max-w-2xl">

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            {userData
              ? `Hey ${userData.name},`
              : "Welcome to the Future"}
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            {userData
              ? "You're all set. Explore everything and make the most out of it."
              : "Login or create an account to get started with amazing features."}
          </p>

        </div>

        {/* Card Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">🚀 Fast</h3>
            <p className="text-gray-600 text-sm">
              Experience lightning fast performance with modern tech.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">🔐 Secure</h3>
            <p className="text-gray-600 text-sm">
              Your data is protected with strong authentication.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">⚡ Simple</h3>
            <p className="text-gray-600 text-sm">
              Clean and simple UI for the best user experience.
            </p>
          </div>

        </div>

        {/* CTA Button */}
        {!userData && (
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-10 px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition shadow-md"
          >
            Get Started
          </button>
        )}

      </div>

    </div>
  )
}

export default Home