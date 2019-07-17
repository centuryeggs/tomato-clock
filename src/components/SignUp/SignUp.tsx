import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon, Button } from 'antd';
import axios from '../../config/axios'
import './SignUp.scss'

interface axios { }
const initialState = {
  account: '',
  password: '',
  passwordConfirmation: ''
}
type State = Readonly<typeof initialState>
class SignUp extends React.Component<any, State>{

  readonly state: State = initialState;

  onChange = (key: keyof State, value: string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  submit = async () => {
    const { account, password, passwordConfirmation } = this.state
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      })
      console.log('成功！');
      this.props.history.push('/')// 没用constructor(props)，为什么能调用到history
    } catch (e) {
      console.log(e.response.data.errors)
      if(e.response.data.errors.account){
        alert('该账号已存在')
      }else if(e.response.data.errors.password_confirmation){
        alert('两次密码不一致')
      }
    }
  }

  public render() {
    const { account, password, passwordConfirmation } = this.state
    return (
      <div className="SignUp" id="SignUp">
        <h1>番茄土豆注册</h1>
        <br />
        <Input
          placeholder="请输入您的用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={account}
          onChange={(e) => this.onChange('account', e.target.value)}
        />
        <Input.Password
          value={password}
          placeholder="请输入您的密码"
          onChange={(e) => this.onChange('password', e.target.value)} />
        <Input.Password
          value={passwordConfirmation}
          placeholder="请再次输入您的密码"
          onChange={(e) => this.onChange('passwordConfirmation', e.target.value)} />
        <Button type="primary" className="signUpButton" onClick={this.submit}>注册</Button>
        <p>如果你有账号，请立即<Link to="/login">登录</Link></p>
      </div>
    )
  }
}

export default SignUp;