import React, { Component } from 'react';

interface Props{
  data: any
  totalFinishedCount: any
}

interface State{
  points: string
}

class Polygon extends Component<Props, State> {

  points = ()=>{
    const dates = Object.keys(this.props.data).sort(
      (a,b)=>{return Date.parse(a)-Date.parse(b)})
      console.log(dates);
      
    const firstDay = dates[0]
    if(firstDay){
      const lastDay = dates[dates.length - 1]
      const range = Date.parse(lastDay) - Date.parse(firstDay)
      let finishedCount = 0
      const pointArr = dates.map(date => {
        if(range){
          const x = (Date.parse(date) - Date.parse(firstDay))/range *240
          finishedCount += this.props.data[date].length
          const y = (1 - finishedCount / this.props.totalFinishedCount) * 60
          return `${x},${y}`
        }else{
          return '240,0'
        }
        
      })
      return ['0,60', ...pointArr, '240,60'].join(' ')
    }else{
      return  "0,60 240,60"
    }

  }

  render() {
    return (
      <div className="Polygon" id="Polygon">
        <svg>
          <polygon
            fill="rgb(64, 169, 255, 0.2)"
            stroke="rgb(64, 169, 255, 0.8)"
            strokeWidth="1"
            points={this.points()}
          />
        </svg>
      </div>
    );
  }
}

export default Polygon;