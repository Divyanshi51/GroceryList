import React, { useEffect, useState } from 'react'
import "./TODO.css"
import List from './List';
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  }
  else {
    return [];
  }
}

export default function Todo() {
  const [name, setname] = useState('')
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setisEditing] = useState(false)
  const [editID, seteditID] = useState(null);
  const [alert, setalert] = useState({ show: false, msg: "", type: "" })
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter some value')
    }
    else if (name && isEditing) {
      showAlert(true, "success", "Item Edited")
      setList(list.map(item => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item;
      }))
      setname("");
      seteditID(null)
      setisEditing(false);
    }
    else {
      showAlert(true, "success", "Item added to the list")
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]); setname("")
    }
  }
  const showAlert = (show = false, type = "", msg = '') => {
    setalert({ show, type, msg })
  }
  const clearList = () => {
    showAlert(true, "danger", "Empty list");
    setList([]);
  }
  const removeItem = (id) => {
    showAlert(true, "danger", "Item Deleted");
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setisEditing(true)
    seteditID(id)
    setname(specificItem.title);
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Your list</h3>
        <div className='form-control'>
          <input type="text" className='grocery' placeholder='e.g. eggs' value={name} onChange={(e) => setname(e.target.value)} />
          <button type='submit' className='submit-btn'>{isEditing ? "edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={() => clearList()}>clear items</button>
        </div>
      )}
    </section>
  )
}
