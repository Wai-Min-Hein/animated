import Collection from '@/components/helpers/Collection'
import SectionOne from '@/components/pages/sectionOne'
import React from 'react'

const Home = () => {
  return (
    <main className=' overflow-hidden relative'>
      <SectionOne/>
        <Collection />

        <div className="h-screen bg-teal-50"></div>

    </main>
  )
}

export default Home