import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistics.scss'
import Polygon from './Polygon'
import TodoHistory from './TodoHistory/TodoHistory'
import _ from 'lodash'
import { format } from 'date-fns';

interface Props {
  todos: any[]
}

class Statistics extends Component<Props> {

  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted)
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return format(todo.updated_at, 'YYYY-MM-D')
    })
  }

  render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>
            <div className="information">
              <p>统计</p>
              <p>此功能</p>
              <p>施工中</p>
            </div>
            
          </li>
          <li>
            <div className="information">
              <p>番茄历史</p>
              <p>此功能</p>
              <p>施工中</p>
            </div>
            
          </li>
          <li className="active">
            <div className="information">
              <p>任务历史</p>
              <p>累计完成任务</p>
              <p>{this.finishedTodos.length}</p>
            </div>
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length} />
          </li>
        </ul>
        <TodoHistory />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics);