import * as React from 'react';
import './Todos.scss'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../config/axios'


interface State {
  todos: any[]
}
class Todos extends React.Component<any, State>{

  constructor(props: any) {
    super(props)
    this.state = {
      todos: []
    }
  }

  addTodo = async (params: string) => {
    const { todos } = this.state
    try {
      const response = await axios.post('todos', params)
      this.setState({ todos: [response.data.resource, ...todos] })
    } catch (e) {
      throw new Error(e)
    }
  }
  componentDidMount() {
    this.getTodos()
  }

  getTodos = async () => {
    
    try {
      const response = await axios.get('todos')
      this.setState({ todos: response.data.resources })
    } catch (e) {
      throw new Error(e)
    }
  }

  updateTodo = async (id: number, params: any) => {
    const { todos } = this.state
    try {
      const response = await axios.put(`todos/${id}`, params)
      const newTodos = todos.map(t => {
        if (id === t.id) {
          return response.data.resource
        } else {
          return t
        }
      })
      this.setState({ todos: newTodos })
    } catch (e) {
      throw new Error(e)
    }
  }
  
  toEditing = (id:number)=>{
    
    const { todos } = this.state
    
    const newState = todos.map((t)=>{
      if(id === t.id){
        return Object.assign({},t, {editing: true})
      }else{
        return Object.assign({},t, {editing: false})
      }
    })
    this.setState({todos: newState})
  }

  get noDeletedTodos(){
    return this.state.todos.filter(t=> !t.deleted)
  }
  get noCompletedTodos(){
    return this.noDeletedTodos.filter(t=> !t.completed)
  }
  get CompletedTodos(){
    return this.noDeletedTodos.filter(t=> t.completed)
  }
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={(params: string) => this.addTodo(params)} />
        <div className="todoLists">
          {
            this.noCompletedTodos.map((t) =>
              <TodoItem key={t.id} {...t}//把t的所有属性传给TodoItem
                update={this.updateTodo} 
                toEditing={this.toEditing}
              />
            )
          }
          {
            this.CompletedTodos.map((t) =>
              <TodoItem key={t.id} {...t}
                update={this.updateTodo} 
                toEditing={this.toEditing}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default Todos;