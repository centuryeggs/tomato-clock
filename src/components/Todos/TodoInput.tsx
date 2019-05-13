import * as React from 'react';
import {Input, Icon} from 'antd'

const initialState = {
  description: ''
}
type State = Readonly<typeof initialState>
class TodoInput extends React.Component <any,State>{
  readonly state : State = initialState

  addTodo = ()=>{
    this.props.addTodo({description: this.state.description})
  }
  onKeyUp = (e)=>{
    if(e.key === 'Enter' && this.state.description !== ''){
      this.addTodo()
      this.setState({description: ""})
    }
  }
  render() {
    const {description} = this.state
    const suffix = description ? <Icon type="enter" onClick={this.addTodo} /> : <span/>//预设一个<span/>防止失去焦点
    return (
      <div className="TodoInput" id="TodoInput">
        <Input 
        placeholder="添加新任务" 
        suffix={suffix}
        onChange={(e)=>this.setState({description: e.target.value})} 
        onKeyUp={this.onKeyUp}
        value={description}
        />

      </div>
    )
  }
}

export default TodoInput;