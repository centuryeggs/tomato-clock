import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tomatoes.scss'
import TomatoAction from './TomatoAction'
import { addTomato, initTomatoes, updateTomato } from 'redux/actions/tomatoes';
import axios from '../../config/axios'

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
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at)[0]
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
      const response = await axios.post('tomatoes', { duration: 20 * 1000 })
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Tomatoes);