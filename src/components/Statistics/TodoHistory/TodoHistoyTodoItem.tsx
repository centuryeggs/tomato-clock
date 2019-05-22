import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import './TodoHistoryTodoItem.scss'
import { updateTodos } from 'redux/actions/todos'
import axios from 'config/axios'

interface Props {
  id: number
  updated_at: any
  created_at: any
  description: string
  itemType: string
  completed: boolean
  deleted: boolean
  updateTodos: (payload: any) => any
}

class TodoHistoyTodoItem extends Component<Props> {

  updateTodos = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params)
      this.props.updateTodos(response.data.resource)
      console.log(response.data.resource);
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    let formatText, action, time
    if (this.props.itemType === 'finished') {
      time = this.props.updated_at
      formatText = "HH:mm"
      action = (
        <div className="action">
          <span onClick={() => this.updateTodos({ completed: false })}>恢复</span>
          <span onClick={() => this.updateTodos({ deleted: true })}>删除</span>
        </div>
      )
    } else if (this.props.itemType === 'deleted') {
      time = this.props.created_at
      formatText = "YYYY-MM-D"
      action = (
        <div className="action">
          <span onClick={() => this.updateTodos({ deleted: false })}>恢复</span>
        </div>
      )
    }
    return (
      <div className="TodoHistoyTodoItem" id="TodoHistoyTodoItem">
        <span className="timeRange">{format(time, formatText)}</span>
        <span className="description">{this.props.description}</span>
        <div>
          {action}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = {
  updateTodos
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(TodoHistoyTodoItem);
