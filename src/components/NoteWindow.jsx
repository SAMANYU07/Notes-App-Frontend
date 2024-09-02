import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteNote, updateCurrentNote, updateNote } from '../features/NotesSlice';
import DefaultScreen from './DefaultScreen';
import noteService from '../NotesService/NoteService';
import NewNoteWindow from './NewNoteWindow';

export default function NoteWindow() {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const note = useSelector(state => state.currentNote);
  const currentNote = useSelector(state => state.currentNote);
  const newNoteWin = useSelector(state => state.newNoteWin);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await noteService.deleteNote(note._id)
    .then(() => {
      dispatch(deleteNote(note._id));
    })
    .catch(error => {
      console.log("Error deleting note", error.message);
    })
    if (note._id == currentNote._id)
      dispatch(updateCurrentNote(null));
  }
  const handleUpdate = async () => {
    setEditMode(false);
    await noteService.updateNote(note._id, {
      title: updatedTitle,
      noteContent: updatedContent,
    })
    .then(() => {
      const updatedNote = {
        title: updatedTitle,
        noteContent: updatedContent,
        _id: note._id,
      }
      dispatch(updateCurrentNote(updatedNote));
      dispatch(updateNote(updatedNote));
    })
  }
  const handleEdit = async () => {
    // noteService.updateNote(note._id,)
    setEditMode(true);
  }
  useEffect(() => {
    setEditMode(false);
  }, [currentNote])
  useEffect(() => {
    setUpdatedContent(note?.noteContent);
    setUpdatedTitle(note?.title);
  }, [editMode])
  if (currentNote == null) {
    if (newNoteWin)
      return <NewNoteWindow/>
    return <DefaultScreen/>
  }
  return (
    <>
    <div className='wfull h-full bg-[#fdfdfd] flex flex-col ml-2 break-words text-wrap break-all'>
      <div className='mt-4 font-bold text-[30px] break-words text-wrap border-b-2'>
        <span className=''>{note?.title}</span>
      </div>
      <div className=' ml-auto mr-2 mt-2 flex'>
        <MdEdit onClick={handleEdit} className={`${editMode ? "hidden" : ""}`}/>
        <MdDelete onClick={handleDelete}/>
      </div>
      <div className={`  mt-8 p-4 ${editMode ? "h-full" : ""}`}>
        {editMode ?
        <div className='w-full h-full'>
        <textarea name="" id="" cols="30" rows="10"
        value={updatedContent} onChange={(event) => setUpdatedContent(event.target.value)}
        className='w-full h-[90%]'/>
        <div className='flex gap-x-4'>
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button onClick={handleUpdate}>Update</button>
        </div>
        </div>
        :
        note?.noteContent
        }
      </div>
    </div>
    </>
  )
}
