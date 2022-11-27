import React from 'react'

export default function List({ items, removeItem, editItem }) {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className="grocery-item">
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn' onClick={() => editItem(id)} >edit</button>
              <button type='button' className='delete-btn'
                onClick={() => { removeItem(id) }}>delete</button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
