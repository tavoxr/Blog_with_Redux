import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
// import '../css/index.css';
import Publicaciones from './Publicaciones';


const Tareas = (props)=>{
  return(<div className='margen'>
          Tareas
        </div>

  );
} 





const App = ()=>{
  return(
    <BrowserRouter>
      <Menu/>
      <Switch>
        
        <Route exact path='/' component={Usuarios} />
        <Route exact path='/tareas' component={Tareas} />
        <Route exact path='/publicaciones/:key' component={Publicaciones} />
        
      </Switch>
    </BrowserRouter>
    

  );
}




export default App;