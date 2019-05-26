import * as React from 'react';
import { connect } from 'react-redux'
import './Todos.scss'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

class Todos extends React.Component<any>{

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
        <div className="todoLists" >
          {
            this.noCompletedTodos.map((t) =>
              <TodoItem key={t.id} {...t}//把t的所有属性传给TodoItem
              />)
          }
          <Collapse defaultActiveKey={[]} className="showCompleted">
            <Panel header="最近完成的任务" key="1">
              {
                this.CompletedTodos.map((t) =>
                  <TodoItem key={t.id} {...t}
                  />)
              }
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ //state是store里的reducer里的state
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Todos);