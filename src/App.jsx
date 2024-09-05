import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NotesPanel from './components/NotesPanel'
import NoteWindow from './components/NoteWindow'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, toggleLoading } from './features/NotesSlice';
import noteService from './NotesService/NoteService'
import Home from './components/Home'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
// import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout/>} path='/'>
      <Route element={<Home/>} path=''/>
      <Route element={<Home/>} path='/bookmarks'></Route>
    </Route>
  )
)

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleLoading(true));
    const fetchAllNotes = async () => {
      noteService.getAllNotes()
        .then((data) => {
          console.log(data.data);
          data.data?.map(note => {
            dispatch(addNote(note));
          })
        })
        .catch(error => console.log("feching error: ", error))
        .finally(() => {
          dispatch(toggleLoading(false));
        })
    }
    fetchAllNotes();
  }, [])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
