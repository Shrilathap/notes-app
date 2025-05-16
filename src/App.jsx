import React from 'react';
import { useState } from 'react'
import './App.css';
import Modal from './components/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import close from './assets/close.svg'

function App() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [list, setList] = useState([])
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({ name: '', body: '' });


    const validate = () => {
    let valid = true;
    const newErrors = { name: '', body: '' };

    if (!name.trim()) {
      newErrors.name = 'Title is required';
      valid = false;
    }
    if (!body.trim()) {
      newErrors.body = 'Note is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleReset = ()=>{
        setBody('')
        setName('')
        setEditId(null)
        setErrors({ name: '', body: '' })
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return;

    const formData = {
      id: editId ? editId : uuidv4(),
      name: name,
      body: body
    }
    if(editId) {
      console.log(formData, editId)
      const result = list.map((ele)=>{
        if(ele.id === editId){
          return {...ele, ...formData}
        }
        else {
          return {...ele}
        }
      })
      setList(result)
    }
    else {
      setList([formData, ...list])
    }
    setName('');
    setBody('');
    setEditId(null);
    setErrors({ name: '', body: '' });
    setShowModal(false);
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
    setErrors((prev) => ({ ...prev, name: '' }));
  }
  const handleBodyChange = (e) => {
    setBody(e.target.value)
    setErrors((prev) => ({ ...prev, body: '' }));
  }

  const handleAdd = () => {
    setShowModal(true)
  }

  const handleEdit = (ele)=>{
    setShowModal(true)
    setName(ele.name)
    setBody(ele.body)
    setEditId(ele.id)
  }

  const handleDelete = (ele) => {
    const result = list.filter((element) => {
      return ele.id !== element.id
    })
    setList(result)
  }

  return (
    <>
      <div className='container'>
        <div className='headerWrapper'>
          <h1>Note App</h1>
          <button type='button' className='btn-ripple' onClick={handleAdd}>Add Note</button>
        </div>
        <div>
          <ul className='cardContainer'>
          {
            list.map((ele)=>{
              return(
                <li className='cardList' key={ele.id}>
                  <div onClick={()=>handleEdit(ele)}>
                  <h3>{ele.name}</h3>
                  <p>{ele.body}</p>
                  </div>
                  <button type='button' className='listDelete' onClick={()=>handleDelete(ele)}>
                    <img src={close} alt='close'/>
                  </button>
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
      <Modal isOpen={showModal} 
      onClose={() => {
        setShowModal(false);
        handleReset();
      }}
      >
        <div className='modalContent'>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder=" "
                id="title"
              />
              <label htmlFor="title">Title</label>
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="form-group">
              <textarea
                value={body}
                onChange={handleBodyChange}
                placeholder=" "
                id="note"
              />
              <label htmlFor="note">Note</label>
               {errors.body && <p className="error-text">{errors.body}</p>}
            </div>
            <button type="submit" className="saveButton">Save</button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default App
