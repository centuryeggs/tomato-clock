import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tomatoes.scss'
import TomatoAction from './TomatoAction'
import TomatoList from './TomatoList'
import { addTomato, updateTomato } from 'redux/actions/tomatoes';
import axios from '../../config/axios'
import _ from 'lodash'
import { format } from "date-fns";

interface Props {
  tomatoes: any[]
  addTomato: (payload: any) => any
  updateTomato: (payload: any) => any
}

class Tomatoes extends Component<Props> {

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
  }

  get finishedTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
    const obj = _.groupBy(finishedTomatoes, (tomato) => { //lodasha
      return format(tomato.started_at, 'YYYY-MM-D')
    })
    return obj  //返回一个以日期为keys，当天完成的tomatoes（数组）为values的对象
  }

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', { duration: 25 * 60 * 1000 })
      this.props.addTomato(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction
          startTomato={this.startTomato}
          unfinishedTomato={this.unfinishedTomato}
          updateTomato={this.props.updateTomato}
        />
        <TomatoList finishedTomatoes={this.finishedTomatoes} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {
  addTomato,
  updateTomato
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Tomatoes);