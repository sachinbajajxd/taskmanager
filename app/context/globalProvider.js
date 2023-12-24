"use client"
import { createContext, useContext, useEffect, useState } from "react"
import themes from "./themes"
import axios from "axios"
import toast from "react-hot-toast"
import { useUser } from "@clerk/nextjs"

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()
export const GlobalProvider = ({children}) => {

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
  
    const {user} = useUser();
    const theme = themes[selectedTheme];

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

    const allTasks = async () => {
        setIsLoading(true)
        try{
            const res = await axios.get('/api/tasks');
            // console.log(res.data);
            setTasks(res.data);
            setIsLoading(false);
        } catch(error){
            toast.error("Something went wrong.");
            console.log(error);
            setIsLoading(false);
        }
    }

    const deleteTask = async (id) => {
    
        try{
            const res = await axios.delete(`/api/tasks/${id}`)

            toast.success("Task deleted");
            allTasks();
        }catch(error){
            toast.error("something went wrong");
            console.log(error);
        }
    }

    const updateTask = async (task) => {
    
        try{
            const res = await axios.put(`/api/tasks`, task)

            toast.success("Task updated");
            allTasks();
        }catch(error){
            toast.error("something went wrong");
            console.log(error);
        }
    }

    const completedTasks = tasks.filter((task) => task.isCompleted===true);
    const importantTasks = tasks.filter((task) => task.isImportant===true);
    const incompleteTasks = tasks.filter((task) => task.isCompleted===false);

    // console.log(completedTask.length)

    useEffect(() => {
        if(user){
            allTasks()
        }
    }, [user])

    return (
        <GlobalContext.Provider
            value={{
                theme,
                tasks,
                deleteTask,
                updateTask,
                isLoading,
                completedTasks,
                importantTasks,
                incompleteTasks,
                modal,
                openModal,
                closeModal,
                allTasks,
                collapsed,
                collapseMenu,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}


export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)