import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/homepage'
import CreatePage from './Pages/createpage'
import NoteDetailPage from './Pages/notedetailpage'
import toast, {Toaster} from 'react-hot-toast'
import{Link} from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import Navbar from './components/Navbar'
import RateLimitedUI from './components/RateLimitedUI'
import axios from 'axios'
import { useState } from 'react'

const App = () => {
  return (
    <div className="relative h-full w-full" > 
        <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#020617,_#7c3aed40)]' />
      <Routes>
        <Route path="/" element= {<HomePage/>}/>
        <Route path="/create" element= {<CreatePage/>}/>
        <Route path="/note/:id" element= {<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default  App


