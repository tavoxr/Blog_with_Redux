import React from 'react';
import {connect} from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal'
import Comentarios from './Comentarios';


const {traerTodos: usuariosTraerTodos}=usuariosActions;
const {
        traerPorUsuario: publicacionesTraerPorUsuario, 
        abrirCerrar,
        traerComentarios
      }= publicacionesActions;

class Publicaciones extends React.Component{


   async componentDidMount(){


        const {
                usuariosTraerTodos,
                publicacionesTraerPorUsuario,
                match:{ params:{ key } }
                } = this.props;

        if(!this.props.usuariosReducer.usuarios.length){
            
          await  usuariosTraerTodos();
        }


        if(this.props.usuariosReducer.error){
            return;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){

            publicacionesTraerPorUsuario(key);

        }

    }


    ponerUsuario=()=>{
        const {
            usuariosReducer,
            match:{ params:{ key } }
        }= this.props;

        if(usuariosReducer.error){
            return <Fatal mensaje={usuariosReducer.error} />;
        }

        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner/>;
        }


        const nombre = usuariosReducer.usuarios[key].name;

        return(
            <h1>
                Publicaciones de {nombre}
            </h1>
        );

    }
    

    ponerPublicaciones=()=>{
        const {
            usuariosReducer,
            usuariosReducer:{usuarios},
            publicacionesReducer,
            publicacionesReducer:{publicaciones},
            match: {params: {key}}
        }= this.props;

        if(!usuarios.length){
            return;
        }

        if(usuariosReducer.error){
            return;
        }

        if(publicacionesReducer.cargando){
            return <Spinner/>;
        }

        if(publicacionesReducer.error){
            return <Fatal mensaje={publicacionesReducer.error} />
        }

        if(!publicaciones.length)return;

        if(!('publicaciones_key' in usuarios[key])) return;

        const {publicaciones_key}= usuarios[key];
        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );

    };


    mostrarInfo=(publicaciones,pub_key)=>(
        publicaciones.map((publicacion,com_key)=>{
            return( 
            <div 
                 className='pub_header'
                 key={publicacion.id}
                 onClick={()=> this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}
                 >
                 <h2 className='pub_title'>
                     {publicacion.title}
                 </h2>
                 <h3 className='pub_body'>
                     {publicacion.body}
                 </h3>
                 <div className='coments_cerrado'>
                 {
                     (publicacion.abierto)? <Comentarios comentarios={publicacion.comentarios}/> : 'Ver comentarios'
                 }
                 </div>
                
             </div>
             )
         })
    );


    mostrarComentarios=(pub_key, com_key, comentarios)=>{
        // console.log('comentarios', comentarios);
        this.props.abrirCerrar(pub_key, com_key);
        if(!comentarios.length){

            this.props.traerComentarios(pub_key,com_key);
        }
       
    }

    render(){
        console.log(this.props);
        return(
            <div className='main_container'>
               <div className='publi_container'>
                 
                 <div className='publi_usua_name'>
                     {this.ponerUsuario()}
                 </div>

                <div className='publis_usua'>
                     {this.ponerPublicaciones()}
                </div>
                

               </div>
              
            </div>

        )
    }


}


const mapStateToProps= ({usuariosReducer,publicacionesReducer})=>{
    return {
            usuariosReducer,
            publicacionesReducer
    };
}

const mapDispatchToProps={
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios


}

export default connect(mapStateToProps,mapDispatchToProps)(Publicaciones);