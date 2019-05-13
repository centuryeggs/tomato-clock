import * as React from 'react';
import './Todos.scss'
import TodoInput from './TodoInput';
import axios from '../../config/axios'

class Todos extends React.Component{


  addTodo = async (params:any)=>{
    try{

      const response = await axios.post('todos', params)
      console.log(response.data);
      
    }catch(e){

    }
  }
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={(params)=>this.addTodo(params)}/>

      </div>
    )
  }
}

export default Todos;