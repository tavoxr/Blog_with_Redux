import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';

const Tareas = (props)=>{
  return(<div>
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
          
        
      </Switch>
    </BrowserRouter>
    

  );
}




export default App;