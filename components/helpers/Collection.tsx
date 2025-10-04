import Image from 'next/image'
import React from 'react'

const Collection = () => {
  return (
        <div className="absolute -bottom-16 -right-4 w-62 h-54 z-[2000]">
          <div className="relative w-full h-full">
            <Image
              fill
              src="/collection.svg"
              alt="loading..."
              style={{ objectFit: "cover" }}
            />
            <p className="absolute inset-0 flex items-center justify-center text-white font-bold">
              View Collection
            </p>
          </div>
        </div>
  )
}

export default Collection