import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistics.scss'
import Polygon from './Polygon'
import TodoHistory from './TodoHistory/TodoHistory'
import _ from 'lodash'
import { format } from 'date-fns';

interface Props {
  todos: any[],
  tomatoes: any[]
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

  get finishedTomatoes() {
    return this.props.tomatoes.filter(t => !t.aborted && t.ended_at)
  }

  get dailyTomatoes() {
    return _.groupBy(this.finishedTomatoes, (tomato) => {
      let ended_at = new Date(new Date(tomato.started_at).getTime() + 25 * 60 * 1000)
      return format(ended_at, 'YYYY-MM-D')
    })
  }

  render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>
            <Polygon data={this.dailyTomatoes} title={"近期番茄完成概况"}/>

          </li>
          <li>
            <Polygon data={this.dailyTodos} title={"近期任务完成概况"}/>
          </li>
        </ul>
        <TodoHistory />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  tomatoes: state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics);