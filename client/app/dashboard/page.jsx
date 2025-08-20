 'use client'
import React from 'react'
import { logoutApi } from '../services/apis/auth'

const Page = () => {
  const handleLogout = () => {
    logoutApi()
    // window.location.reload() // Reload the page to reflect the logout state
    // Clear the token cookie
 
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <button onClick={handleLogout}  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
        Logout
      </button>
    </div>
  )
}

export default Page