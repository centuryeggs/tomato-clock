import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tomatoes.scss'
import TomatoAction from './TomatoAction'
import TomatoList from './TomatoList'
import { addTomato, initTomatoes, updateTomato } from 'redux/actions/tomatoes';
import axios from '../../config/axios'
import _ from 'lodash' 
import { format } from "date-fns";

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {
  addTomato,
  updateTomato,
  initTomatoes
}

interface Props {
  tomatoes: any[]
  addTomato: (payload: any) => any
  initTomatoes: (payload: any[]) => any
  updateTomato: (payload: any) => any
}

class Tomatoes extends Component<Props> {

  componentDidMount(){
    this.getTomatoes()
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
  }

  get finishedTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
    const obj = _.groupBy(finishedTomatoes, (tomato)=>{ //lodasha
      return format(tomato.started_at, 'YYYY-MM-D')
    })
    console.log(obj);
    
    return obj  //返回一个以日期为keys，当天完成的tomatoes（数组）为values的对象
  }

  getTomatoes = async ()=> {
    try{
      const response = await axios.get('tomatoes')
      this.props.initTomatoes(response.data.resources)

    }catch(e){
      throw new Error(e)
    }
  }

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', { duration: 10 * 1000 })
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

export default connect(
  mapStateToProps, mapDispatchToProps
)(Tomatoes);