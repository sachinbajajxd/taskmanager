"use client"
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateContent = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [completed, setCompleted] = useState(false)
    const [important, setImportant] = useState(false)

    const handleChange = (name: string) => (e: any) => {
        switch(name){
            case "title":
                setTitle(e.target.value)
                break;
            case "description":
                setDescription(e.target.value)
                break;
            case "date":
                setDate(e.target.value)
                break;
            case "completed":
                setCompleted(e.target.checked)
                break;
            case "important":
                setImportant(e.target.checked)
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const task = {
            title,
            description,
            date,
            completed,
            important
        }

        try{

            console.log(task);

            const res = await axios.post('/api/tasks', task);

            if(res.data.err){
                toast.error("Error creating task");
            }else{
                toast.success("task created successfully");
            }


        } catch(error){
            toast.error("Something went wrong")
            console.log(error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <h1>Create a task</h1>
        <div className='input-control'>
            <label htmlFor='title'>Title</label>
            <input
                type="text"
                onChange={handleChange("title")}
                value={title}
                name="title"
                id="title"
                placeholder='Enter title'
            />
        </div>
        <div className='input-control'>
            <label htmlFor='description'>Description</label>
            <textarea
                rows={4}
                onChange={handleChange("description")}
                value={description}
                name="description"
                id="description"
                placeholder='Enter desc'
            ></textarea>
        </div>
        <div className='input-control'>
            <label htmlFor='date'>Date</label>
            <input
                type="date"
                onChange={handleChange("date")}
                value={date}
                name="date"
                id="date"
                placeholder='Enter date'
            />
        </div>
        <div className='input-control'>
            <label htmlFor='completed'>Completed ?</label>
            <input
                type="checkbox"
                onChange={handleChange("completed")}
                value={completed.toString()}
                name="completed"
                id="completed"
                placeholder='Enter date'
            />
        </div>
        <div className='input-control'>
            <label htmlFor='important'>Important ?</label>
            <input
                type="checkbox"
                onChange={handleChange("important")}
                value={important.toString()}
                name="important"
                id="important"
                placeholder='Enter date'
            />
        </div>

        <div className="submit-btn">
            <button type="submit">
                <span>Submit</span>
            </button>
        </div>
    </form>
  )
}

export default CreateContent