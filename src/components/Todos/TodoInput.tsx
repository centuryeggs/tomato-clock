import * as React from 'react';
import {Input, Icon} from 'antd'
import {connect} from 'react-redux'
import {addTodo} from 'redux/actions/todos'
import axios from '../../config/axios'

const initialState = {
  description: ''
}
interface Props {
  addTodo: (payload:any) => any;
}
type State = Readonly<typeof initialState>
class TodoInput extends React.Component <Props,State>{
  readonly state : State = initialState

  // addTodo = ()=>{
  //   this.props.addTodo({description: this.state.description})
  //   this.setState({description: ""})
  // }
  postTodo = async () => {
    try {
      const response = await axios.post('todos', {description: this.state.description})
      this.props.addTodo(response.data.resource)
      
    } catch (e) {
      throw new Error(e)
    }
    this.setState({description: ""})
  } 
  onKeyUp = (e)=>{
    if(e.key === 'Enter' && this.state.description !== ''){
      this.postTodo()
    }
  }
  render() {
    
    const {description} = this.state
    const suffix = description ? <Icon type="enter" onClick={this.postTodo} /> : <span/>//预设一个<span/>防止失去焦点
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

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

const mapDispatchToProps ={
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
