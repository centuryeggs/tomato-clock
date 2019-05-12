import * as React from 'react';
import { Button } from 'antd'
import axios from '../../config/axios'

const initialState = {
  user: {'account':""}
}
type State = Readonly<typeof initialState>
class Index extends React.Component<any, State>{
  constructor(props: any) {
    super(props)
  }
  readonly state: State = initialState

  async componentWillMount() {
    await this.getMe()
  }

  getMe = async () => {
    try {
      const response = await axios.get('me')
      this.setState({ user: response.data })
      
    } catch (e) {
      // if(e.response.status === 401){  //与后端约定登录验证失败返回状态码401
      //   this.props.history.push('/login')
      // }
    }
  }

  logout = () => {
    localStorage.setItem('x-token', '')
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="Index">
        <p>欢迎，{this.state.user.account}</p>
        <Button onClick={this.logout}>登出</Button>
      </div>
    )
  }
}

export default Index;