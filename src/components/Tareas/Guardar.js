import React from 'react';
import {connect} from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import {Redirect} from 'react-router-dom';

class Guardar extends React.Component{


    componentDidMount(){
        const  {
            match:{params:{usu_id,tar_id}},
            tareas,
            cambioUsuarioId,
            cambioTitulo,
            limpiarForma
        }=this.props;

        if(usu_id && tar_id){
            const tarea = tareas[usu_id][tar_id]
            cambioUsuarioId(tarea.userId);
            cambioTitulo(tarea.title);
        }else{
            limpiarForma();
        }
    }

    cambioUsuarioId=(event)=>{
        this.props.cambioUsuarioId(event.target.value);
    }

    cambioTitulo=(event)=>{
        this.props.cambioTitulo(event.target.value);
    }


    guardar=()=>{
        const {
            match:{params:{usu_id,tar_id}},
            tareas,
            usuario_id,
             titulo,
             agregar,
             editar
         }= this.props;

         const nueva_tarea= {
            userId:usuario_id,
            title:titulo,
            completed:false
        };

         if(usu_id && tar_id){
             const tarea = tareas[usu_id][tar_id];
             const tarea_editada= {
                 ...nueva_tarea,
                 completed: tarea.completed,
                 id:tarea.id

             }
             editar(tarea_editada);
         }else{
            agregar(nueva_tarea)

         }
    }

    deshabilitar=()=>{
        const {usuario_id,titulo,cargando}=this.props;

        if(cargando){
            return true;
        }
        if(!usuario_id || !titulo){
            return true;
        }
        return false;
    }


    mostrarAccion=()=>{
        const {error,cargando}=this.props;
        if(cargando){
            return <Spinner/>;
        }

        if(error){
            return <Fatal mensaje={error}/>;
        }
    }

    render(){
        return(
            <div className='main_container'>
                <div className='guardar_container'>
                {
                    (this.props.regresar)? <Redirect to='/tareas'/> : ''
                }
                <h1 className='titulo_guardar_tarea'>
                    Guardar Tarea
                </h1>
                <div className='guardar_usua'>
                    <p className='usuaid'> Usuario id:</p>
                  
                    <input className='input_guardar_usuaid'
                    type='number'
                    value={this.props.usuario_id}
                    onChange={this.cambioUsuarioId}
                />
                </div>
               
               
                
                <div className='guardar_titulo'>
                    <p className='titulo_guardar'> Titulo:</p>
                    <input className='input_guardarTitulo'
                        value={this.props.titulo}
                        onChange={this.cambioTitulo}

                    />
                </div>
               
               
                
                <button className='btn_guardar'
                onClick={this.guardar}
                disabled={this.deshabilitar()}
                >
                    Guardar
                </button>
                {this.mostrarAccion()}
                </div>
                
               
            </div>
        );
    }
}

 const mapStateToProps=({tareasReducer})=>{
    return tareasReducer;
}
export default connect(mapStateToProps,tareasActions)(Guardar);