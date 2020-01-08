import React from 'react';
import {connect} from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';



class Tareas extends React.Component{

    componentDidMount(){
        this.props.traerTodas();
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
                <h2>
                    Usuario {usu_id}
                </h2>
                <div className='contenedor_tareas'>
                    {this.pornerTareas(usu_id)}
                </div>
            </div>
        ))
    }


    pornerTareas= (usu_id)=>{
        const {tareas}= this.props
        const por_usuario={
            ...tareas[usu_id]
        };

        return Object.keys(por_usuario).map((tar_id)=>(
           <div key={tar_id}>
                <input type='checkbox' defaultChecked={por_usuario[tar_id].completed} />
                {por_usuario[tar_id].title}
           </div>
        ))

        }

render(){
    console.log(this.props)
    return(
        <div className='margen'>
            {this.mostrarContenido()}
        </div>
    );
}




}


    const mapStateToProps=({tareasReducer})=>{

        return tareasReducer
    }


  

    


export default connect(mapStateToProps,tareasActions)(Tareas);