import React, { Component } from 'react';
import { Button, Input, Icon, Modal } from 'antd'
import axios from 'config/axios'
import CountDown from './CountDown'
import './TomatoAction.scss'

interface Props {
  startTomato: () => void;
  unfinishedTomato: any
  updateTomato: (payload: any) => any
}

interface State {
  description: string
}

const confirm = Modal.confirm;

class TomatoAction extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      description: ''
    }
  }

  onKeyUp(e) {
    if (e.key === 'Enter' && this.state.description !== '') {
      this.updateTomato({
        description: this.state.description, 
        ended_at: new Date()
      })
        this.setState({ description: '' })
    }
  }


  onFinish = () => {
    this.forceUpdate()
  }

  abortTomato = async () => {
    this.updateTomato({aborted: true})
    document.title = '番茄钟'
  }

  updateTomato = async (params:any) => {
    try {
      const response = await axios.put(
        `tomatoes/${this.props.unfinishedTomato.id}`, params)
      this.props.updateTomato(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  showConfirm = () =>{
    confirm({
      title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
      onOk : ()=>{
        this.abortTomato()
      },
      okText: '确定',
      cancelText: '取消'
    });
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
        html = <div className="countDownWrapper">
          <Input
            value={this.state.description}
            placeholder="请输入你刚刚完成的任务"
            onChange={e => this.setState({ description: e.target.value })}
            onKeyUp={e => this.onKeyUp(e)}
          />
          <Icon className="abort" type="close-circle" onClick={this.showConfirm}/>
        </div>

      } else if (timeNow - started_at < duration) {
        const timer = duration - (timeNow - started_at)
        html = (
          <div className="countDownWrapper">
            <CountDown timer={timer} onFinish={this.onFinish} duration={duration}/>
            <Icon className="abort" type="close-circle" onClick={this.showConfirm}/>
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