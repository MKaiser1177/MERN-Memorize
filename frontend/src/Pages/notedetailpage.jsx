import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon } from 'lucide-react'
import { Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'


const NoteDetailPage = () => {
  const [note, setNote]= useState(null);
  const [loading, setLoading]= useState (true);
  const [saving, setSaving]= useState (false);

  const navigate = useNavigate();

  const {id} = useParams() 

  console.log((id));

  useEffect(() => {
    const fetchNote= async () => {
      try {
        const res= await api.get(`/notes/${id}`);
        setNote(res.data);
    } catch (error) {
      toast.error('Error fetching note details:', error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    }
     fetchNote();
  }, [id]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
       
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    setLoading(true); 
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate('/');
    }
    catch (error) {
      console.log('Error deleting note:', error);
      toast.error("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e, id) => {
    
    if (!note.title.trim() || !note.content.trim()){
          toast.error("Please add a title or some content");
          return;
        }
        setSaving(true)
        try {
          await api.put(`/notes/${id}`, note)
          toast.success("Note updated successfully");
          navigate("/");
        }
        catch (error){
            toast.error("Failed to update note.");
        } finally {
          setSaving(false)
        }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center '>Loading note details...
        <LoaderIcon className='animate-spin size-10' />   
      </div>
    );
  }

  return <div className='min-h-screen bg-base-200'>
          <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
              <div className='flex items-center justify-between mb-6'>
                <Link to ='/' className='btn btn-ghost'>
                  <ArrowLeftIcon className='h-5 w-5' />
                  Back to notes
                </Link>  
                <button onClick={(e) => handleDelete(e, note._id)} className='btn btn-error '>  
                  <Trash2Icon className='h-5 w-5'/> Delete note
                </button> 
              </div>  

              <div className='card bg-base-100 p-6 rounded-lg shadow-md'>
                <div className='card-body'>
                  <div className='form-control mb-4'>
                    <label className='label'>
                      <span className='label-text'> Title:</span>
                    </label>
                    <input 
                      type="text"
                      placeholder= 'Note Title'
                      className='input input-bordered '
                      value={note.title}
                      onChange={(e) => setNote({...note, title: e.target.value})}
                    /> <br/>
                    <textarea
                      className='textarea textarea-bordered min-h-[150px]'
                      placeholder='Note content'
                      value={note.content}
                      onChange={(e) =>
                        setNote({ ...note, content: e.target.value })
                      }
                    />
                  </div>
                  <div className='card-actions justify-end'>
                    <button className='btn btn-primary' disabled={saving} onClick={(e) => handleSave(e, note._id)}>
                      {saving? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>    
}

export default NoteDetailPage