import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon, Button } from 'antd';
import axios from '../../config/axios'
import './Login.scss'

interface axios { }
const initialState = {
  account: '',
  password: ''
}
type State = Readonly<typeof initialState>;

class Login extends React.Component<any, State>{
  constructor(props: any) {
    super(props)
  }
  readonly state: State = initialState;

  onChange = (key: keyof State, value: string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }
  
  submit = async () => {
    const { account, password } = this.state
    try {
      await axios.post('sign_in/user', {
        account,
        password
      })
      console.log('成功！');
      this.props.history.push('/')
    } catch (e) {
      console.log(e.response.data.errors)
    }
  }

  public render() {
    const { account, password } = this.state
    return (
      <div className="Login" id="Login">
        <h1>番茄钟登录</h1>
        <br />
        <Input
          placeholder="请输入您的用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={account}
          onChange={(e) => { this.onChange('account', e.target.value) }}
        />
        <Input.Password value={password} placeholder="请输入您的密码" onChange={(e) => { this.onChange('password', e.target.value) }} />
        <Button type="primary" className="loginButton" onClick={this.submit}>登录</Button>
        <p>如果你没有账号，请立即<Link to="/signUp">注册</Link></p>
      </div>
    )
  }
}

export default Login;