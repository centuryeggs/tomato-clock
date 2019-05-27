import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateTodos } from 'redux/actions/todos';
import axios from '../../config/axios'
import './TodoItemInput.scss'

interface Props {
  id: number
  editText: string
  updateTodos: (payload: any) => any
}

interface State {
  editText: string,
}

class TodoItemInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editText: this.props.editText,
    }
  }

  private myRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.myRef.current) {
      this.myRef.current.focus()
    }
  }

  onKeyUp = (e) => {
    if (e.key === 'Enter' && this.state.editText !== '') {
      this.updateTodos({ description: this.state.editText })
    }
  }

  onBlur = () => {
    this.updateTodos({ description: this.state.editText })
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

  render() {
    return (
      <div className="TodoItemInput" id="TodoItemInput">
        <input
          type="text"
          ref={this.myRef}
          value={this.state.editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
          onBlur={this.onBlur}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemInput);
