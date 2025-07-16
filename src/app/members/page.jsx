import Members from '@/components/Members'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <Members />
    </ProtectedRoute>
  )
}

export default page