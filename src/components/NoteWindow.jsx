import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteNote, toggleLoading, updateCurrentNote, updateNote, toggleBookmark } from '../features/NotesSlice';
import DefaultScreen from './DefaultScreen';
import noteService from '../NotesService/NoteService';
import NewNoteWindow from './NewNoteWindow';
import DeleteDialog from './DeleteDialog';
import {useTransition, animated} from "react-spring";
import LoadingSection from './LoadingSection';
import { MdOutlineBookmark } from "react-icons/md";

export default function NoteWindow() {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const note = useSelector(state => state.currentNote);
  const currentNote = useSelector(state => state.currentNote);
  const newNoteWin = useSelector(state => state.newNoteWin);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const dialogTransition = useTransition(deleteModal, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0}
  });
  const handleDelete = async () => {
    dispatch(toggleLoading(true));
    await noteService.deleteNote(note._id)
    .then(() => {
      dispatch(deleteNote(note._id));
    })
    .catch(error => {
      console.log("Error deleting note", error.message);
    })
    if (note._id == currentNote._id)
      dispatch(updateCurrentNote(null));
    setDeleteModal(false);
    dispatch(toggleLoading(false));
  }
  const handleToggleBookmark = async () => {
    dispatch(toggleLoading(true));
    await noteService.updateNote(note._id, {
      bookmark: !currentNote.bookmark,
    })
    .then(() => {
      dispatch(toggleBookmark(note._id));
    })
    dispatch(toggleLoading(false));
  }
  const handleUpdate = async () => {
    dispatch(toggleLoading(true));
    await noteService.updateNote(note._id, {
      title: updatedTitle,
      noteContent: updatedContent,
    })
    .then(async () => {
      console.log("start");
      const updatedNote = {
        title: updatedTitle,
        noteContent: updatedContent,
        _id: note._id,
      }
      dispatch(updateCurrentNote(updatedNote));
      await dispatch(updateNote(updatedNote));
      console.log("end");
    })
    .catch(error => {
      console.log("updation error: ", error.message);
    })
    setEditMode(false);
    dispatch(toggleLoading(false));
  }
  const handleEdit = async () => {
    // noteService.updateNote(note._id,)
    setEditMode(true);
  }
  const enableDeleteModal = () => {
    setDeleteModal(true);
  }
  const disableDeleteModal = () => {
    console.log("Close called");
    setDeleteModal(false);
  }
  useEffect(() => {
    setEditMode(false);
  }, [currentNote])
  useEffect(() => {
    setUpdatedContent(note?.noteContent);
    setUpdatedTitle(note?.title);
  }, [editMode])
  if (loading)
    return <LoadingSection/>
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
        <MdOutlineBookmark onClick={handleToggleBookmark} className={`text-2xl cursor-pointer fill-[#afb4c2] hover:fill-black transition-[0.2s] ${note.bookmark ? `fill-green-400` : ``}`}/>
        <MdEdit onClick={handleEdit} className={`${editMode ? "hidden" : ""} text-2xl cursor-pointer fill-[#afb4c2] hover:fill-black transition-[0.2s]`}/>
        <MdDelete onClick={enableDeleteModal} className='text-2xl cursor-pointer fill-[#afb4c2] hover:fill-black transition-[0.2s]'/>
        {dialogTransition((style, show) =>
        show?
        <animated.div style={style}>
          <DeleteDialog open={deleteModal} onClose={disableDeleteModal} onConfirm={handleDelete}/>
        </animated.div>
        :null
        )}
      </div>
      <div className={`  mt-8 p-4 ${editMode ? "h-full" : ""}`}>
        {editMode ?
        <div className='w-full h-full'>
        <textarea name="" id="" cols="30" rows="10"
        value={updatedContent} onChange={(event) => setUpdatedContent(event.target.value)}
        className='w-full h-[90%] outline-none border-2 p-1 rounded-lg'/>
        <div className='flex gap-x-4'>
        <button onClick={() => setEditMode(false)} className='cancelButton'>Cancel</button>
        <button onClick={handleUpdate} className='addUpdateButton'>Update</button>
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
