import logo from './logo.svg';
import './App.css';
import emailjs from '@emailjs/browser'; 
import { useState } from 'react'

function App() {
const [name, setName] = useState('')
 const [email, setEmail] = useState('') 
const [subject, setSubject] = useState('')
 const [mess, setMess] = useState('')
 function Submit(e) {
    e.preventDefault()
    emailjs.sendForm('service_zrxtpfm', 'template_hibpgxp', e.target, 'LA1nF3NkRC33V6-yB')
     .then(function(response) { 
         alert( response.status, response.text);
       }
     .catch()
    
} 
  return ( 
       <div className="App"> 
           <form onSubmit={e=>Submit(e)}> 
<input name='name' placeholder='Your Name...' value={name} onChange={e=>setName(e.target.value)} /> 
<input name='email' placeholder='Your Email...' value={email} onChange={e=>setEmail(e.target.value)} /> 
<input name='subject' placeholder='Your Subject...' value={subject} onChange={e=>setSubject(e.target.value)} /> 
<textarea name='mess' placeholder='Your Message...' value={mess} onChange={e=>setMess(e.target.value)} /> 
<input type="submit"/> 
           </form> 
      </div> 
   )

}

export default App;
