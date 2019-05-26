import React, { Component } from 'react';
import './CountDown.scss'

interface Props {
  timer: number;
  duration: number;
  onFinish: () => void
}
interface State {
  countDown: number
  
}
let timeId:NodeJS.Timeout

class CountDown extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state ={
      countDown : this.props.timer
    }
  }
  
  componentDidMount(){
    timeId = setInterval(()=>{
      const time = this.state.countDown
      this.setState({countDown :time - 1000})
      document.title = `${this.countDown} 番茄钟`
      if(time < 1000){
        document.title = `番茄钟`
        this.props.onFinish() //告诉父组件 完成倒计时
        clearInterval(timeId)
      }
    }, 1000)
  }

  get countDown(){
    const min = Math.floor(this.state.countDown / 1000 / 60)
    const sec = Math.floor(this.state.countDown/ 1000 % 60) 
    return (min > 9 ? min : '0' + min) + ' : ' + (sec > 9 ? sec : '0' + sec)
  }

  componentWillUnmount(){
    clearInterval(timeId)
  }

  render() {
    const percent = 1 - this.state.countDown/this.props.duration
    return (
      <div className="CountDown" id="CountDown">
        <span>{this.countDown}</span>
        <div className="process" style={{width: `${percent*100}%`}}/>
        
      </div>
    );
  }
}

export default CountDown;