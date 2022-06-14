import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all"| "active"| "completed"

function App() {

   const [tasks, setTasks] = useState<Array<TaskType>>([
       { id: v1(), title: "HTML&CSS", isDone: true },
       { id: v1(), title: "JS", isDone:true },
       { id: v1(), title: "ReactJS", isDone: false }
   ])


    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
       const newTask:TaskType={
           id: v1(),
           title: title,
           isDone: false
       }
       setTasks([newTask, ...tasks])
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")



    // if(filter === "active"){
    //     taskForRender = tasks.filter(t=> t.isDone === false)
    // }
    // if(filter === "completed"){
    //     taskForRender = tasks.filter(t=> t.isDone === true)
    // }
    let taskForRender;
    switch(filter){
        case "active":
            taskForRender = tasks.filter(t=>!t.isDone)
            break
        case "completed":
            taskForRender = tasks.filter(t=>t.isDone)
            break
        default:
            taskForRender = tasks
    }

    const changeTodoListFilter =(filter:FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title={"What to do"}
                      tasks={taskForRender}
                      addTask={addTask}
                      removeTask ={removeTask}
                      changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;
