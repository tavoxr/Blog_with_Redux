import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



const Tabla  = (props)=>{

    const ponerFilas=()=>(
        props.usuarios.map((usuario,key)=>{
                
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
              <td className='ver_usuarios'>
                  <Link to={`/publicaciones/${key}`}>
                    <div className="eye icon"></div>
                  </Link>
                 
              </td>
            </tr>
            
            ) })
     )
 



  return ( 
  <div>
        <table className='usua_tabla'>
        <thead className='titulo_tabla'>
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
            <th className='ver_usuarios_titulo'>
              Ver
            </th>
          </tr>
        </thead>
        <tbody>
          {ponerFilas()}
        </tbody>
    </table>


    </div>
  )
      }


      const mapStateToProps= (reducers)=>{
          return reducers.usuariosReducer;
      }

export default connect(mapStateToProps)(Tabla);
