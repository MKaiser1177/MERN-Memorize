import React from 'react'
import { Link } from 'react-router-dom'
import { NotebookIcon } from 'lucide-react'
const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
        <div className='bg-primary/10 text-primary rounded-full p-4'>
            <NotebookIcon className='size-10 text-primary'/>
        </div>
        <h3 className='text-2xl font-bold'>No notes yet!</h3> 
        <p className='text-base-content/70'>
            Ready to organize your thoughts with efficient AI?<br/> Create your first note to get your journey started.
        </p>      
        <Link to ={'/create'} className='btn btn-primary'>
            Create your first note
        </Link>
    </div>
  )
}

export default NotesNotFound
