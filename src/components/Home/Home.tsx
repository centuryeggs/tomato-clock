import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Menu } from 'antd'
import { initTodos } from 'redux/actions/todos'
import { initTomatoes } from 'redux/actions/tomatoes';
import Todos from '../Todos/Todos'
import Tomatoes from '../Tomatoes/Tomatoes'
import Statistics from '../Statistics/Statistics'
import axios from '../../config/axios'
import history from '../../config/history'
import './Home.scss'

const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}
const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
    <Menu.Item key="2" onClick={logout}><Icon type="user" />登出</Menu.Item>
  </Menu>
);

const initialState = {
  user: { 'account': "" }
}

type State = Readonly<typeof initialState>

class Home extends React.Component<any, State>{
  readonly state: State = initialState

  async componentWillMount() {
    await this.getMe()
    await this.getTodos()
    await this.getTomatoes()
  }

  getMe = async () => {
    const response = await axios.get('me')
    this.setState({ user: response.data })
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos')
      const todos = response.data.resources.map(t => Object.assign({}, t, {editing: false}))
      this.props.initTodos(todos)
    } catch (e) {
      throw new Error(e)
    }
  }

  getTomatoes = async ()=> {
    try{
      const response = await axios.get('tomatoes')
      this.props.initTomatoes(response.data.resources)

    }catch(e){
      throw new Error(e)
    }
  }
  
  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">Logo</span>
          <Dropdown overlay={menu}>
            <span>{this.state.user.account}<Icon type="down" style={{ marginLeft: 8 }} /></span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes />
          <Todos />
        </main>
        <Statistics/>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ 
  todos: state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  initTodos,
  initTomatoes
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);