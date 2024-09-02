import React, { useEffect, useState } from 'react'
import axios from "axios";
import NoteCard from './NoteCard';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, toggleNewNoteWin, updateCurrentNote } from '../features/NotesSlice';
import noteService from '../NotesService/NoteService';

export default function NotesPanel() {
  const [search, setSearch] = useState("");
  const notes = useSelector(state => state.notes);
  const currentNote = useSelector(state => state.currentNote);
  const dispatch = useDispatch();
  const handleAddNote = async () => {
    dispatch(updateCurrentNote(null));
    dispatch(toggleNewNoteWin(true));
  }
  useEffect(() => {
    console.log("update: ", notes);
  }, [notes])
  useEffect(() => {
    console.log("current note: ", currentNote);
  }, [currentNote])
  return (
    <div className='bg-[#f6f7fb] w-full h-full flex flex-col'>
      <span className='font-bold text-[20px] mt-4 inline-block'>Notes App</span>
      <span className='mt-4'>{notes?.length} Notes</span>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <input value={search} onChange={(event) => setSearch(event.target.value)} type="text" className='w-5/6 h-[40px]' />
        <button onClick={handleAddNote} className='w-5/6 mt-4 h-[40px] bg-[#3f7afe] text-white rounded-lg'>+ Add Note</button>
      </div>
      <div className='mt-8'>
        {
          search?.length > 0 ?
            notes?.map(note => {
              if (note?.title.includes(search))
                return <NoteCard key={note._id} _id={note._id}
                  title={note.title} noteContent={note.noteContent} bookmark={note.bookmark} />
            })
            :
            notes?.map(note => <NoteCard key={note._id} _id={note._id}
              title={note.title} noteContent={note.noteContent} bookmark={note.bookmark}
            />)
        }
        <hr className='h-[2px] bg-[#e5e7eb]' />
      </div>
    </div>
  )
}
