"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import themes from "./themes"
import axios from "axios"
import toast from "react-hot-toast"

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({children}) => {
    const[selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];   
    const [isLoading, setIsLoading] = useState(false); 
    const [tasks, setTasks] = useState([]);
    const [model, setModel] = useState(false);

    const openModel = () => {
        setModel(true);
    };

    const closeModel = () => {
        setModel(false);
    };

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");

            setTasks(res.data);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    };

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`/api/tasks/${id}`);
            toast.success("Task deleted!");

            allTasks();
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const updateTask = async(task) => {
        try {
            const res = await axios.put(`/api/tasks`, task);
            toast.success("Task updated");

            allTasks();
        } catch(error){
            console.log (error)
            toast.error("Something went wrong");
    }
}

    const completedTasks = tasks.filter((task) => task.isComplete === true);
    const incompleteTasks = tasks.filter((task) => task.isComplete === false);
    const importantTasks = tasks.filter((task) => task.isImportant === true);

    React.useEffect(() => {
        allTasks();
      }, []);

    return (
        <GlobalContext.Provider 
        value={{
            theme, 
            tasks,
            deleteTask, 
            completedTasks,
            importantTasks,
            incompleteTasks, 
            updateTask,
            model,
            openModel,
            closeModel,
        }}>
            <GlobalUpdateContext.Provider value = {{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext); 

