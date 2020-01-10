import React from 'react';
import {connect} from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';


class Usuarios extends React.Component {

  
 
  componentDidMount(){
     if(!this.props.usuarios.length){

        this.props.traerTodos();

     }
   
   }

   ponerContenido = ()=>{
    if(this.props.cargando){
      return <Spinner/>;
    }

    if(this.props.error){
      return <Fatal mensaje={this.props.error}/>;
    }

     return <Tabla  />;
   }








  render(){
console.log(this.props.cargando);
console.log(this.props.error);


    return(
      <div className='main_container'>
        <div className='usua_container'>
          <h1 className='usua_titulo'> Usuarios <span className='usua_span'>obtenidos de <a href='https://jsonplaceholder.typicode.com/' target='_blank'>https://jsonplaceholder.typicode.com/</a></span>  </h1>
          <div className='usua_contenido'>
           {this.ponerContenido()}
          </div>
         

        </div>
      
      </div>
    );
  }




}


const mapStateToProps = (reducers)=>{
return reducers.usuariosReducer;
}

export default connect(mapStateToProps,usuariosActions)(Usuarios);