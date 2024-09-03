import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentNote } from '../features/NotesSlice';

export default function NoteCard({
    title,
    noteContent,
    bookmark,
    _id
}) {
  const currentNote = useSelector(state => state.currentNote);
  const dispatch = useDispatch();
  const handleOnClick = async () => {
    dispatch(updateCurrentNote({title: title, noteContent: noteContent, bookmark: bookmark, _id: _id}))
  }
  return (
    <>
    <div className={`h-[60px] flex flex-col border-t-2 cursor-pointer ${_id === currentNote?._id ? "bg-[#ecedf0]" : ""}`} onClick={handleOnClick}>
        <span className='font-bold'>{title?.length > 24 ? (title?.slice(0, 24) + "...") : title}</span>
        {noteContent?.length > 20 ?
        <p>{noteContent?.slice(0,24)}...</p>
        :
        <p>{noteContent}</p>
        }
    </div>
    </>
  )
}
