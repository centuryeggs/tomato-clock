import * as React from 'react';
import { connect } from 'react-redux'
import { initTodos } from 'redux/actions/todos'
import './Todos.scss'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../config/axios'


class Todos extends React.Component<any>{

  componentDidMount() {
    this.getTodos()
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos')
      this.props.initTodos(response.data.resources)
    } catch (e) {
      throw new Error(e)
    }
  }

  get noDeletedTodos() {
    return this.props.todos.filter(t => !t.deleted)
  }
  get noCompletedTodos() {
    return this.noDeletedTodos.filter(t => !t.completed)
  }
  get CompletedTodos() {
    return this.noDeletedTodos.filter(t => t.completed)
  }
  
  public render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput />
        <div className="todoLists">
          {
            this.noCompletedTodos.map((t) =>
              <TodoItem key={t.id} {...t}//把t的所有属性传给TodoItem
              />)
          }
          {
            this.CompletedTodos.map((t) =>
              <TodoItem key={t.id} {...t}
              />)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ //state是store里的reducer里的state
  todos: state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  initTodos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);