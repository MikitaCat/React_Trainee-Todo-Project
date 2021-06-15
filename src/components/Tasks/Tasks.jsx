import React from 'react'
import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'

import axios from 'axios'
import AddTasksForm from './AddTasksForm'
import Task from './Task'

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompletedTask }) => {

    const editTitle = () => {
        const newTitle = window.prompt('Enter new title', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)

            axios.patch('http://localhost:3000/lists/' + list.id, {
                name: newTitle
            })
                .catch(() => { alert('Error with update list title') })
        }
    }

    return (
        <div className='tasks'>
            <h2 className='tasks__title'
                style={{ color: list.color.hex }}
            >
                {list.name}
                <img src={editSvg} alt='edit'
                    onClick={editTitle} />
            </h2>

            <div className='tasks__items'>
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>There are not any tasks</h2>}
                {list.tasks &&
                    list.tasks.map((task) => (
                        <Task {...task}
                            onRemove={onRemoveTask}
                            list={list}
                            onEdit={onEditTask}
                            onCompleted={onCompletedTask}
                        />
                    ))
                }
                <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}

export default Tasks