import React, { Component } from 'react';
import './Polygon.scss'
import { format } from 'date-fns';

import ReactEcharts from "echarts-for-react";

interface Props {
  data: any,
  title: String,
}

class Polygon extends Component<Props> {

  lastWeekDate() {
    let today = new Date().getTime()
    let dateArr: any[] = []
    for (let i = 0; i < 7; i++) {
      let peviousDate = today - 24 * 60 * 60 * 1000 * (6 - i)
      dateArr[i] = format(new Date(peviousDate), 'YYYY-MM-D')
    }
    return dateArr
  }
  finishedNum() {
    let numArr: Number[] = []
    for (let i = 0; i < 7; i++) {
      let finishedDayIndex = this.props.data.hasOwnProperty(this.lastWeekDate()[i])
      if (finishedDayIndex) {
        numArr[i] = this.props.data[this.lastWeekDate()[i]].length
      } else {
        numArr[i] = 0

      }
    }
    return numArr
  }
  getOption() {
    return {
      tooltip: {

      },
      title: {
        text: this.props.title,
        textStyle: {
          color: "#666",
          fontWeight: "normal",
          lineHeight: 40,
        }
      },
      xAxis: {
        show: true,
        data: this.lastWeekDate()
      },
      yAxis: {
        show: true,
        max: 10,
      },
      grid: {
        bottom: 30,
        left: 30,
        right: 10,
      },
      series: [{
        name: '完成数量',
        type: 'bar',
        barMinHeight: 1,
        data: this.finishedNum(),
        itemStyle: {
          color: 'rgba(165, 42 ,42, 0.4)'
        },
        emphasis: {
          itemStyle: {
            color: '#ed7579'
          }
        }
      }]
    }
  }

  render() {
    return (
      <div className="Polygon" id="Polygon">
        <ReactEcharts
          className="echart"
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      </div>
    );
  }
}

export default Polygon;