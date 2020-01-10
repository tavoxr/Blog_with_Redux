import React from 'react';
import {connect} from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import {Link} from 'react-router-dom';


class Tareas extends React.Component{

    componentDidMount(){
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodas();

        }
    }

    componentDidUpdate(){
        const {tareas,cargando,traerTodas}=this.props;

        if(!Object.keys(tareas).length && !cargando){
            traerTodas();
            
        }
    }

    mostrarContenido= ()=>{
        const {tareas, cargando, error}= this.props
       
        if(cargando){
            return <Spinner/>
        }

        if(error){
            return <Fatal mensaje={error}/>
        }

        return Object.keys(tareas).map((usu_id)=>(
            <div key={usu_id}>
                <h2 className='user_id'>
                    Usuario {usu_id}
                </h2>
                <div className='contenedor_tareas'>
                    {this.pornerTareas(usu_id)}
                </div>
            </div>
        ))
    }


    pornerTareas= (usu_id)=>{
        const {tareas, cambioCheck,eliminar}= this.props
        const por_usuario={
            ...tareas[usu_id]
        };

        return Object.keys(por_usuario).map((tar_id)=>(
           <div key={tar_id} className='tarea_container'>
                <input className='checkbox_tarea'
                    type='checkbox' 
                    defaultChecked={por_usuario[tar_id].completed}
                    onChange={()=>cambioCheck(usu_id,tar_id)}
                    
                    />
                    <h4 className='tarea_username'>
                    {por_usuario[tar_id].title}
                    </h4>
                
                <div className='btn_edit_cont'>
                <button className='btn_edit'>
                    <Link to={`/tareas/guardar/${usu_id}/${tar_id}`} className='link_editar'>
                    Editar
                    </Link>
                   
                </button>
                </div>
                <div className='btn_delete_cont'>
                <button className='btn_delete' onClick={()=>eliminar(tar_id)}>
                    Eliminar
                </button>
                </div>
               
                
           </div>
        ))

        }

render(){
       return(
        <div className='main_container'>
            <div className='tareas_container'>
           
                <Link to='/tareas/guardar' className='link_agregar'>
                <button className="btn_agregar">
                    AGREGAR NUEVA TAREA
                    </button>
                </Link>
           
            <div className='tareas_contenido'>
            {this.mostrarContenido()}
            </div>
          


            </div>
            
          
        </div>
    );
}




}


    const mapStateToProps=({tareasReducer})=>{

        return tareasReducer
    }


  

    


export default connect(mapStateToProps,tareasActions)(Tareas);