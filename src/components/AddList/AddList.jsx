import React, { useState, useEffect } from 'react'
import Badge from '../Badge/Badge';
import List from '../List/List'
import axios from 'axios'

import './AddList.scss'
import closeSvg from '../../assets/img/close.svg'


const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(3)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            return
        }

        setIsLoading(true)
        axios.post('http://localhost:3000/lists', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0]
            const listObj = { ...data, color, tasks: [] }
            onAdd(listObj)
            onClose()
        }).finally(() => { setIsLoading(false) })
    }

    return (
        <div className='add-list'>
            <List onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: <svg width="11"
                            height="11"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">

                            <path d="M8 1V15"
                                stroke="black" strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round" />

                            <path d="M1 8H15"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>,
                        name: 'Add List'
                    }
                ]}
                isRemovable={false} />

            {visiblePopup && <div className='add-list__popup'>
                <img src={closeSvg}
                    className='add-list__popup-close-btn'
                    onClick={onClose} />
                <input value={inputValue}
                    className='field'
                    type='text'
                    placeholder='Enter directory name'
                    onChange={(e) => setInputValue(e.target.value)} />
                <div className='add-list__popup-colors'>
                    {
                        colors.map((color) => <Badge
                            onClick={() => setSelectedColor(color.id)}
                            color={color.name}
                            key={color.id}
                            className={selectedColor === color.id && 'active'} />)
                    }
                </div>
                <button onClick={addList} className='button'>
                    {isLoading ? 'Adding...' : 'Add Directory'}
                </button>
            </div>}

        </div>
    )
}

export default AddList