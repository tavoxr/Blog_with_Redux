import axios from 'axios';
import {TRAER_TODOS} from '../types/usuariosTypes';

export const traerTodos =  () => async (dispatch) =>{

    try{  
    const respuesta= await axios.get('https://jsonplaceholder.typicode.com/users');
    //   console.log('respuesta:',respuesta.data);



    dispatch({
        type: TRAER_TODOS,
        payload: respuesta.data
    });
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}