import React from 'react'
import dog from "../img/dog1.png";

export default function DefaultScreen() {
  return (
    <>
    <div className='h-full flex flex-col items-center justify-center'>
        <img src={dog} alt="" className='h-[400px]' />
        <span>Create or Select a Note to View here</span>
    </div>
    </>
  )
}
