import React from 'react'
import { useEffect, useState } from 'react'
import NotesPanel from './NotesPanel'
import NoteWindow from './NoteWindow'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, toggleLoading } from '../features/NotesSlice';
import noteService from '../NotesService/NoteService';

export default function Home() {

  return (
    <>
      <div className="flex h-screen">
        <div className='w-[300px] overflow-y-auto ml-[50px]'>
          <NotesPanel />
        </div>
        <div className='w-full overflow-y-auto'>
          <NoteWindow />
        </div>
      </div>
    </>
  )
}
