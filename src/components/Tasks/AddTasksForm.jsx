import react, { useState } from 'react'
import axios from 'axios'
import addSvg from '../../assets/img/add.svg'

const AddTasksForm = ({ list, onAddTask }) => {
    const [formVisible, setFormVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleFormVisible = () => {
        setFormVisible(!formVisible)
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios.post('http://localhost:3000/tasks', obj).then(({ data }) => {
            onAddTask(list.id, data)
            toggleFormVisible()
            setInputValue('')
        }).catch(() => alert('Error'))
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <div className='tasks__form'>
            {!formVisible ? <div className='tasks__form-new'
                onClick={toggleFormVisible} >
                <img src={addSvg} alt='Add' />
                <span>New Task</span>
            </div> :
                <div className='tasks__form-block'>

                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className='field'
                        type='text'
                        placeholder='Enter new task name'
                    />

                    <button className='button'
                        onClick={addTask}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Add Task'}
                    </button>

                    <button className='button button--grey'
                        onClick={toggleFormVisible}
                    >
                        Exit
                </button>
                </div>}

        </div>
    )
}

export default AddTasksForm