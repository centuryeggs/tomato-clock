import React, { Component } from 'react';

interface Props {
  timer: number
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
      document.title = `${this.countDown} 番茄钟`
      const time = this.state.countDown
      this.setState({countDown :time - 1000})
      if(time < 1000){
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
    return (
      <div className="CountDown" id="CountDown">
        {this.countDown}
        <div className="process" />
        
      </div>
    );
  }
}

export default CountDown;