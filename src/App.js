import logo from './logo.svg';
import './App.css';
import emailjs from '@emailjs/browser'; 

function App() {
emailjs.sendForm('x', 'templateID', 'templateParams', 'publicKey');
  return (
    <div className="App">
      <form>

      </form>
    </div>
  );
}

export default App;
