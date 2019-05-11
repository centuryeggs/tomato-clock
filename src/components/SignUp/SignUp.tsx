import * as React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon, Button } from 'antd';
import axios from '../../config/axios'
import './SignUp.scss'

interface axios {}
interface SignUpState {
  account: string,
  password: string,
  passwordConfirmation: string
}
class SignUp extends React.Component<any, SignUpState>{
  constructor(props:any) {
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  onChangeAccount = (e:any) => {
    this.setState({account: e.target.value })
  }
  onChangePassword = (e:any) => {
    this.setState({password: e.target.value })
  }
  onChangePasswordConfirmation = (e:any) => {
    this.setState({passwordConfirmation: e.target.value })
  }

  submit = async()=>{
    const { account, password, passwordConfirmation} = this.state
    try{
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation : passwordConfirmation
      })
      console.log('成功！');
      this.props.history.push('/')
    }catch(e){
      console.log(e.response.data.errors)
    }
  }

  public render() {
    const { account, password, passwordConfirmation} = this.state
    return (
      <div className="SignUp" id="SignUp">
        <h1>番茄钟注册</h1>
        <br />
        <Input
          placeholder="请输入您的用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password} placeholder="请输入您的密码" onChange={this.onChangePassword} />
        <Input.Password value={passwordConfirmation} placeholder="请再次输入您的密码" onChange={this.onChangePasswordConfirmation} />
        <Button type="primary" className="signUpButton" onClick={this.submit}>注册</Button>
        <p>如果你有账号，请立即<Link to="/login">登录</Link></p>
      </div>
    )
  }
}

export default SignUp;