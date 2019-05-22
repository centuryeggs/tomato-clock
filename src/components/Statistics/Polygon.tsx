import React, { Component } from 'react';
import './Polygon.scss'

interface Props {
  data: any
  totalFinishedCount: any
}

interface State {
  points: string
}

class Polygon extends Component<Props, State> {

  points = () => {
    const dates = Object.keys(this.props.data).sort(
      (a, b) => { return Date.parse(a) - Date.parse(b) })

    const firstDay = dates[0]
    if (firstDay) {
      const range = new Date().getTime() - Date.parse(firstDay)
      let finishedCount = 0
      let lastY
      const pointArr = dates.map(date => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * 299
        finishedCount += this.props.data[date].length
        const y = (1 - finishedCount / this.props.totalFinishedCount) * 100
        lastY = y
        return `${x},${y}`
      })
      return ['0,100', ...pointArr, `299,${lastY}`, '299,100'].join(' ')
    } else {
      return "0,60 240,60"
    }

  }

  render() {
    return (
      <div className="Polygon" id="Polygon">
        <svg>
          <polygon
            fill="rgba(233, 82, 87, 0.2)"
            stroke="rgba(233, 82, 87, 0.8)"
            strokeWidth="1"
            points={this.points()}
          />
        </svg>
      </div>
    );
  }
}

export default Polygon;