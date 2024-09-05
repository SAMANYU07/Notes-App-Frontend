import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { MdOutlinePermIdentity, MdOutlineBookmark } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useTransition, animated } from 'react-spring';

export default function Navbar() {
  const [onHome, setOnHome] = useState(false);
  const [onBookmark, setOnBookmark] = useState(false);
  const navbarTransition = useTransition(null, {
    from: {opacity: 0, transform: "scale(90%)"},
    enter: {opacity: 1, transform: "scale(100%)"},
    leave: {opacity: 0, transform: "scale(90%)"},
  });
  const homeLabelTransition = useTransition(onHome, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: {duration: 200},
  });
  const bookmarkLabelTransition = useTransition(onBookmark, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: {duration: 200},
  });
  return (
    <>
    {navbarTransition((style, show) =>
      <animated.div style={style} className='h-screen w-[50px] absolute z-10 bg-black pt-4 flex flex-col gap-y-6 items-center justify-center'>
        <div className='w-[50px] h-[50px]'>
          <MdOutlinePermIdentity className='fill-white w-full h-full'/>
        </div>
        <nav className='flex flex-col w-full h-full gap-y-6'>
          <NavLink to={`/`} className={({isActive}) => `flex items-center justify-center`}
          onMouseEnter={() => setOnHome(true)} onMouseLeave={() => setOnHome(false)}>
            {({isActive}) => (
              <>
              <FaHome className={`w-[36px] h-[36px] hover:scale-105 active:scale-90 transition-[0.2s] ${isActive ? `bg-[#f6f7fb] rounded-l-lg ml-4` : `bg-black fill-white`}`}/>
              {homeLabelTransition((style, show) =>
              show ?
              <animated.span style={style} className='absolute ml-28 border-2 rounded-lg bg-white pl-1 pr-1 shadow-md'>Home</animated.span>
              : null
              )}
              </>
            )}
          </NavLink>
          <NavLink to={`/bookmarks`} className={({isActive}) => `flex items-center justify-center`}
          onMouseEnter={() => setOnBookmark(true)} onMouseLeave={() => setOnBookmark(false)}>
            {({isActive}) => (
              <>
              <MdOutlineBookmark className={`w-[36px] h-[36px] hover:scale-105 active:scale-90 transition-[0.2s] ${isActive ? `bg-[#f6f7fb] rounded-l-lg ml-4` : `bg-black fill-white`}`}/>
              {bookmarkLabelTransition((style, show) =>
              show?
              <animated.span style={style} className='absolute ml-36 border-2 rounded-lg bg-white pl-1 pr-1 shadow-md'>Bookmarks</animated.span>
              : null
              )}
              </>
            )}
          </NavLink>
        </nav>
      </animated.div>
    )}
    </>
  )
}
