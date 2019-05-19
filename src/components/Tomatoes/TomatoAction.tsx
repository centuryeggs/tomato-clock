import React, { Component } from 'react';
import { Button, Input, Icon } from 'antd'
import axios from 'config/axios'
import CountDown from './CountDown'

interface Props {
  startTomato: () => void;
  unfinishedTomato: any
  updateTomato: (payload: any) => any
}

interface State {
  description: string
}

class TomatoAction extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      description: ''
    }
  }

  onKeyUp(e) {
    if (e.key === 'Enter' && this.state.description !== '') {
      this.addDescription()

    }
  }

  addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
        { description: this.state.description, ended_at: new Date() })
      this.props.updateTomato(response.data.resorce)
      this.setState({ description: '' })
    } catch (e) {
      throw new Error(e)
    }
  }

  onFinish = () => {
    this.render()
  }

  render() {
    let html

    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="startTomatoButton"
        onClick={this.props.startTomato}
      >开始番茄</Button>
    } else {
      const started_at = Date.parse(this.props.unfinishedTomato.started_at)
      const duration = this.props.unfinishedTomato.duration
      const timeNow = new Date().getTime()
      if (timeNow - started_at > duration) {
        html = <div>
          <Input
            value={this.state.description}
            placeholder="请输入你刚刚完成的任务"
            onChange={e => this.setState({ description: e.target.value })}
            onKeyUp={e => this.onKeyUp(e)}
          />
          <Icon type="close-circle" />
        </div>

      } else if (timeNow - started_at < duration) {
        const timer = duration - (timeNow - started_at)
        html = (
          <div className="countDownWrapper">
            <CountDown timer={timer} onFinish={this.onFinish} />//倒计时
            <Icon type="close-circle" />
          </div>
        )
      }
    }

    return (
      <div className="TomatoAction" id="TomatoAction">
        {html}
      </div>
    );
  }
}

export default TomatoAction;