import * as React from 'react';
import { Dropdown, Icon, Menu } from 'antd'
import Todos from '../Todos/Todos'
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
  }

  getMe = async () => {
    const response = await axios.get('me')
    this.setState({ user: response.data })
  }


  render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">Logo</span>
          <Dropdown overlay={menu}>
          <span>{this.state.user.account}<Icon type="down" style={{marginLeft:8}}/></span>
          </Dropdown>
        </header>
        <main>
          <Todos />
        </main>
      </div>
    )
  }
}

export default Home;