"use client"
import React, { useEffect, useRef } from 'react'

export default function DeleteDialog({ open, onClose, onConfirm }) {
    const dialogRef = useRef(null);
    useEffect(() => {
        if (!open)
            dialogRef.current?.close();
    }, [open])
    if (open)
        return (
            <>
                <dialog
                    className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 flex-col h-[200px] w-[400px] justifycenter items-center flex outline-none rounded-lg shadow-xl'>
                    <span className='block text-[30px] mt-4'>Are you sure?</span>
                    <span className='mt-6'>This will permanently delete the seleted note.</span>
                    <div className='mt-4 flex gap-x-4'>
                        <button onClick={onClose} className='cancelButton'>Cancel</button>
                        <button onClick={onConfirm} className='deleteButton'>Delete</button>

                    </div>
                </dialog>
            </>
        )
}
