import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNote, toggleNewNoteWin } from '../features/NotesSlice';
import noteService from '../NotesService/NoteService';

export default function NewNoteWindow() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const handleCancel = async () => {
        dispatch(toggleNewNoteWin(false));
    }
    const handleAdd = async () => {
        await noteService.addNote({
            title: title,
            noteContent: content,
            bookmark: false,
        })
        .then((data) => {
            dispatch(addNote(data.data));
            dispatch(toggleNewNoteWin(false));
        });
    }
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
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}
