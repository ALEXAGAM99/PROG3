import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [tipo ,setTipo] = useState(0);
  return (
    <div style={{textAlign:'center'}}>
        <h2>ESTO ES REACT Y ELECTRON.JS CON BOOTSTRAP Y TAILWIND CSS</h2>
        <p>Esto es un texto de prueba</p>
        <button onClick={()=>{alert('esto es una alerta')}}>Alerta</button>


        <button popovertarget="ca1" className='btn btn-primary'>Ver mensaje</button>
        <div id='ca1' popover="auto">
          esto es el mensaje
        </div>
        <h3>{tipo}</h3>
        <button onClick={()=>setTipo(1)} className='btn btn-success'>bootstrap</button>
        <button onClick={()=>setTipo(0)} className='btn btn-primary'>TAILWIND</button>
    <br></br>
        <select>
          <option>Campo 1</option>
          <option>Campo 2</option>
          <option>Campo 3</option>
          <option>Campo 4</option>

        </select>
    </div>
  );
}

export default App;
