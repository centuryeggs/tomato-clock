import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import { connect } from 'react-redux'
import '../Todos/TodoItem.scss'
import classNames from 'classnames'
import { editTodos, updateTodos } from 'redux/actions/todos'
import axios from '../../config/axios'
import TodoItemInput from './TodoItemInput';

interface Props {
  id: number,
  description: string,
  completed: boolean,
  editing: boolean,
  updateTodos: (payload: any) => any,
  editTodos: (payload: number) => any
}
interface State {
  editText: string,
  id: number
}

class TodoItem extends Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      editText: this.props.description,
      id: this.props.id
    }
  }

  updateTodos = async (params: any) => {
    if (params.completed) {
      params.completed_at = new Date()
    }
    try {
      const response = await axios.put(`todos/${this.props.id}`, params)
      this.props.updateTodos(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  onDoubleClick = () => {
    this.props.editTodos(this.props.id)
  }
  render() {
    const Editing = (
      <div className="editing">
        <TodoItemInput editText={this.props.description} id={this.state.id}/>
        <Icon className="icon" type="enter" onClick={() =>
          this.updateTodos({ description: this.state.editText })
        } />
        <Icon className="icon" type="delete" theme="filled" onClick={
          e => this.updateTodos({ deleted: true })
        } />
      </div>
    )

    const Displaying = (
      <div className="displaying">
        <div className="text"
          onDoubleClick={this.onDoubleClick}>
          {this.props.description}
        </div>
        <Icon className="icon" type="delete" theme="filled" onClick={
          e => this.updateTodos({ deleted: true })
        } />
      </div>
    )

    const toItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })


    return (
      
      <div className={toItemClass} id="TodoItem">
        <Checkbox
          onChange={e => this.updateTodos(
            { completed: e.target.checked })}
          checked={this.props.completed} />
        {
          this.props.editing ? Editing : Displaying
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

const mapDispatchToProps = {
  editTodos,
  updateTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
