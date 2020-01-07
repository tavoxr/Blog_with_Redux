import React from 'react';
import {connect} from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '../General/Spinner';
class Usuarios extends React.Component {

  
 
  componentDidMount(){
     
    this.props.traerTodos();
   }

   ponerContenido = ()=>{
    if(this.props.cargando){
      return <Spinner/>;
    }

     return(
      <table className='tabla'>
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          {this.ponerFilas()}
        </tbody>
       </table>
     )
   }


   ponerFilas=()=>(
     this.props.usuarios.map((usuario)=>{
              
       return( 
          <tr key={ usuario.id}>
            <td>
              {usuario.name}
            </td>
            <td>
              {usuario.email}
            </td>
            <td>
              {usuario.website}
            </td>
          </tr>
          
          ) })
   )






  render(){
console.log(this.props.cargando);
console.log(this.props.error);


    return(
      <div className='margen'>
        {this.ponerContenido()}
      </div>
    );
  }




}


const mapStateToProps = (reducers)=>{
return reducers.usuariosReducer;
}

export default connect(mapStateToProps,usuariosActions)(Usuarios);