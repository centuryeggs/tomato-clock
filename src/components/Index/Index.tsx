import * as React from 'react';
import { Button } from 'antd'
import axios from '../../config/axios'

const initialState = {
  user: { 'account': "" }
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
    const response = await axios.get('me')
    this.setState({ user: response.data })
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