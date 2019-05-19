import React, { useState, useEffect, FunctionComponent } from 'react'


interface Props {
  timer: number
  onFinish: () => void
}

let timeId:NodeJS.Timeout

const CountDownHook: FunctionComponent<Props> = (props) => {
  const [countDown, setCountDown] = useState(props.timer)

  const min = Math.floor(countDown / 1000 / 60)
  const sec = Math.floor(countDown / 1000 % 60)
  const time = min + ' : ' + (sec > 9 ? sec : '0' + sec)

  useEffect(()=>{ //相当于componentDidMount 和componentDidUpdate
    document.title = `${time} - 番茄钟`
    timeId = setInterval(()=>{
      setCountDown(countDown - 1000)
      if(countDown < 0){
        props.onFinish() //告诉父组件 完成倒计时
        document.title = `番茄钟`
        clearInterval(timeId)
      }
    }, 1000)
    return function cleanup(){  //相当于componentWillUnmount
      clearInterval(timeId)
    }
  })

  return (
    <div className="CountDown">
      {time}
    </div>
  );
}

export default CountDownHook