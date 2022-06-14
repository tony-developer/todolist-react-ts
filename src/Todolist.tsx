import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask:(taskID:string) => void
    changeTodoListFilter:(filter:FilterValuesType) => void
    addTask: (title:string) => void
}

const Todolist = (props: TodoListPropsType) => {
    const[title, setTitle] = useState<string>("")
    const tasksJSX = props.tasks.map(t => {
        const removeTask = () =>props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const getOnCLickHandler = (filter:FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }
    const onCLickHandler = () =>props.changeTodoListFilter("all")
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyDownAddTask = (e:KeyboardEvent<HTMLInputElement>) => e.key ==="Enter"&& addTask()
    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value ={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {tasksJSX}
        </ul>
        <div>
            <button onClick={onCLickHandler}>All</button>
            <button onClick={getOnCLickHandler("active")}>Active</button>
            <button onClick={getOnCLickHandler("completed")}>Completed</button>
        </div>
    </div>
}

export default Todolist