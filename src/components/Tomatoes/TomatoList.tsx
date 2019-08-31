import React, { Component } from 'react';
import { format } from "date-fns";
import "./TomatoList.scss";

interface Props {
  finishedTomatoes: any
}

const TomatoItem = function (props) {
  let ended_at = new Date(new Date(props.started_at).getTime() + 25 * 60 * 1000)
  return (
    <div className="TomatoItem">
      <span className="timeRange">{format(props.started_at, 'HH : mm')} - {format(ended_at, 'HH : mm')}</span>
      <span className="description">{props.description}</span>
    </div>
  )
}

class TomatoList extends Component<Props> {

  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes)
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3)
  }

  render() {
    const list = this.dates.map(d => {
      const tomatoes = this.props.finishedTomatoes[d]
      return (
        <div key={d} className="dailyTomatoes">
          <div className="title">
            <span className="dateTime">{format(d, 'M月DD日')}</span>
            <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
          </div>
          {
            tomatoes.map(t => <TomatoItem key={t.id} {...t} />)
          }
        </div>
      )
    })

    return (
      <div className="TomatoList" id="TomatoList">
        {list}
      </div>
    );
  }
}

export default TomatoList;