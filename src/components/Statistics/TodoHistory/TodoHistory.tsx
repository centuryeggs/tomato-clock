import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Tabs } from 'antd'
import _ from 'lodash'
import TodoHistoyTodoItem from './TodoHistoyTodoItem'
import './TodoHistory.scss'

const TabPane = Tabs.TabPane;

interface Props {
  todos: any[]
}

class TodoHistory extends Component<Props> {

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted)
  }

  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo) => format(todo.updated_at, 'YYYY-MM-D'))
  }

  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
  }

  get deletedTodos() {
    return this.props.todos.filter(t => t.deleted)
  }

  render() {
    const todoList = this.finishedDates.map(date => {
      return (
        <div key={date} className="dailyHistory">
          <div className="title">
            <span className="dateTime">{date}</span>
            <span className="weeklyDate">周五</span>
            <span className="count">完成了{this.dailyFinishedTodos[date].length}个任务</span>
          </div>
          <div className="items">
            {
              this.dailyFinishedTodos[date].map(todo =>
                <TodoHistoyTodoItem key={todo.id} {...todo} itemType="finished" />)
            }
          </div>
        </div>)
    })
    const deletedList = this.deletedTodos.map(todo => {
      return <TodoHistoyTodoItem key={todo.id} {...todo} itemType="deleted" />
    })
    return (
      <div className="TodoHistory" id="TodoHistory">
        <Tabs defaultActiveKey="1">
          <TabPane tab="已完成的任务" key="1">
            {todoList}
          </TabPane>
          <TabPane tab="已删除的任务" key="2">
            {deletedList}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps)=> ({
    todos: state.todos,
    ...ownProps
})

export default connect(
  mapStateToProps,
)(TodoHistory);