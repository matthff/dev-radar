import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'
import DevDelete from './components/DevDelete/index'

// Componente: Bloco isolado de HTML, CSS, JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: Imutabilidade)


function App() {
  const [devs, setDevs] = useState([]);
  

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddDev(data){

    const response = await api.post('/devs', data)

    

    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev(data){
    console.log(data.github_username);
    const response = await api.delete(`/devs/${data.github_username}`);

    //Dynamically show the devs being deleted
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}   
        </ul>
      </main>
      <aside className= "delete-aside">
        <strong>Deletar</strong>
        <DevDelete onSubmit={handleDeleteDev}/>
      </aside>
    </div>
  );
}

export default App;
