import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, toggleLoading, toggleNewNoteWin } from '../features/NotesSlice';
import noteService from '../NotesService/NoteService';
import LoadingSection from './LoadingSection';

export default function NewNoteWindow() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const handleCancel = async () => {
        dispatch(toggleNewNoteWin(false));
    }
    const handleAdd = async () => {
        dispatch(toggleLoading(true));
        await noteService.addNote({
            title: title,
            noteContent: content,
            bookmark: false,
        })
        .then((data) => {
            dispatch(addNote(data.data));
            dispatch(toggleNewNoteWin(false));
        })
        .finally(() => {
            dispatch(toggleLoading(false));
        });
    }
    if (loading)
        return <LoadingSection/>
    return (
        <>
            <div className=' m-2 flex flex-col h-[96%]'>
                <div className='border-b-4  mt-10 h-10'>
                    <input type="text" name="" id="" placeholder='Enter title'
                    value={title} onChange={event => setTitle(event.target.value)}
                        className='w-full h-full bg-slate500 text-[1.8rem] outline-none ' />
                </div>
                <div className='mt-10 w-full h-full'>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Enter content'
                    value={content} onChange={event => setContent(event.target.value)}
                        className='w-full h-[94%]' />
                    <div className='flex gap-x-4'>
                        <button onClick={handleCancel} className='cancelButton'>Cancel</button>
                        <button onClick={handleAdd} className='addUpdateButton'>Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}
