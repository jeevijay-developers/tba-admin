import Gallery from '@/components/Gallery';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react'

export const metadata = {
  title: 'Gallery - Tax Bar Association',
  description: 'Gallery for Tax Bar Association',
};

const page = () => {
  return (
    <ProtectedRoute>
      <Gallery />
    </ProtectedRoute>
  )
}

export default page