import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import '../Todos/TodoItem.scss'
import classNames from 'classnames'

interface Props {
  id: number,
  description: string,
  completed: boolean,
  update: (id: number, params: any) => void,
  editing: boolean,
  toEditing: (id: number) => void
}
interface State { editText: string }
class TodoItem extends Component<Props, State>{
  constructor(props:Props) {
    super(props);
    this.state = {
      editText: this.props.description
    }
  }
  
  onKeyUp = (e:any)=>{
    if(e.key === 'Enter' && this.state.editText !== ''){
      this.props.update(this.props.id,{description: this.state.editText})
    }
  }
  render() {
    const Editing = (
      <div className="editing">
        <input type="text" value={this.state.editText} 
        onChange={e => this.setState({editText : e.target.value})} 
        onKeyUp={this.onKeyUp}
        />
        <Icon className="icon" type="enter"/>
        <Icon className="icon" type="delete" theme="filled" onClick={
          e => this.props.update(this.props.id,
            { deleted: true })
        }/>
      </div>
    )
    const Text =<span onDoubleClick={
      () => this.props.toEditing(this.props.id)} 
      className="text">
      {this.props.description}
      </span>
    const toItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })
    return (
      <div className={toItemClass} id="TodoItem">
        <Checkbox
          onChange={e => this.props.update(this.props.id,
            { completed: e.target.checked })}
          checked={this.props.completed} />
        {
          this.props.editing ? Editing : Text
            
        }
      </div>
    );
  }
}

export default TodoItem;