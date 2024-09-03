import React from 'react'

export default function LoadingSection() {
  return (
    <>
    <div className='flex gap-x-4 w-full h-full items-center justify-center'>
        <div className='bg-[#3f7afe] h-10 w-10 rounded-full loadingAnim'></div>
        <div className='bg-[#3f7afe] h-10 w-10 rounded-full loadingAnim ball2'></div>
        <div className='bg-[#3f7afe] h-10 w-10 rounded-full loadingAnim ball3'></div>
    </div>
    </>
  )
}
