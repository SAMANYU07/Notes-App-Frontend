import React, { useEffect, useState } from 'react'
import axios from "axios";
import NoteCard from './NoteCard';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, toggleNewNoteWin, updateCurrentNote } from '../features/NotesSlice';
import noteService from '../NotesService/NoteService';
import { useTransition, animated, useTrail } from 'react-spring';

export default function NotesPanel() {
  const [search, setSearch] = useState("");
  const notes = useSelector(state => state.notes);
  const currentNote = useSelector(state => state.currentNote);
  const dispatch = useDispatch();
  const handleAddNote = async () => {
    dispatch(updateCurrentNote(null));
    dispatch(toggleNewNoteWin(true));
  }
  const panelTransition = useTransition(null, {
    from: {opacity: 0, transform: "scale(90%)"},
    enter: {opacity: 1, transform: "scale(100%)"},
    leave: {opacity: 0, transform: "scale(90%)"},
  });
  const cardsTrail = useTrail(notes?.length, {
    from: {opacity: 0},
    to: {opacity: 1},
  });
  useEffect(() => {
    console.log("update: ", notes);
  }, [notes])
  useEffect(() => {
    console.log("current note: ", currentNote);
  }, [currentNote])
  return (
    <>
    {panelTransition((style, show) =>
    <animated.div style={style} className='bg-[#f6f7fb] w-full h-full flex flex-col'>
      <span className='font-bold text-[20px] mt-4 inline-block'>Notes App</span>
      <span className='mt-4'>{notes?.length} Notes</span>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <input placeholder='Search' value={search} onChange={(event) => setSearch(event.target.value)} type="text" className='w-5/6 h-[40px] outline-none' />
        <button onClick={handleAddNote} className='w-5/6 mt-4 bg-[#3f7afe] text-white rounded-lg addUpdateButton megaButton'>+ Add Note</button>
      </div>
      <div className='mt-8'>
        {
          search?.length > 0 ?
          notes?.map(note => {
            if (note?.title.toLowerCase().includes(search))
            return <NoteCard key={note._id} _id={note._id}
            title={note.title} noteContent={note.noteContent} bookmark={note.bookmark} />
          })
          :
          cardsTrail?.map((style, index) =>
          <animated.div style={style}>
            <NoteCard
            key={notes[index]?._id} _id={notes[index]?._id}
            title={notes[index]?.title} noteContent={notes[index]?.noteContent} bookmark={notes[index]?.bookmark}
            />
          </animated.div>
          )
          // notes?.map(note => <NoteCard key={note._id} _id={note._id}
          //   title={note.title} noteContent={note.noteContent} bookmark={note.bookmark}
            // />)
          }
        <hr className='h-[2px] bg-[#e5e7eb]' />
      </div>
    </animated.div>
      )}
      </>
  )
}
