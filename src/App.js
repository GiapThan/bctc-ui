import logo from './logo.svg';
import './App.css';
import emailjs from 'emailjs-com'; 
import { useState } from 'react'
import nodemailer from 'nodemailer'

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
       })
     .catch()
    
} 
function Sub() {
   const transporter = nodemailer.createTransport({ 
           service: "Gmail",
           port: 465,
           auth: { 
                user: "cucuxom@gmail.com", 
                pass: "cucuxom123123",
            },
         })
   const option = {
              from: "giapthan0604@gmail.com",
              to: "cucuxom@gmail.com",
              subject: "demo nef",
              text: "hello guy",
         }
   transporter.sendMail(option, (e,i) => {
      alert("err  ", e)
      alert("info  ", i)
   })
  transporter.close()
}
  return ( 
       <div className="App"> 
           <form onSubmit={Sub}> 
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
