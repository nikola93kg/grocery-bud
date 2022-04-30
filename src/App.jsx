import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import {uid} from './uid';
import grocery from './grocery.svg';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' });

  const uniqueId = uid();

  console.log(uniqueId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      showAlert(true, 'please enter value', 'danger');
      setName('');
    } else if (name && isEditing) {
      setList(list.map(item=> {
        if(item.id === editID) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'value changed', 'success')
    } else {
      showAlert(true, 'item added to the list', 'success')
      const newItem = {id: uniqueId, title: name}
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false, msg='', type='') => {
    setAlert({show, msg, type});
  }

  const clearList = () => {
    showAlert(true, 'empty list', 'danger');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'item removed', 'danger');
    setList(list.filter(item=> item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find(item=> item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  }

  useEffect(()=> {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

 
  return (
    <>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />} 
      <section className="section-center">
      <img src={grocery} alt="shopping cart" className='grocery-img' />
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='insert items' value={name} onChange={(e)=>{setName(e.target.value)}} />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      
      {list.length > 0 && 
        <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      }
        
    </section>
    </>
    
  )
}

export default App