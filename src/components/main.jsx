import React, {Component} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CardsDisplay } from './cards-display';
import Inputs from './inputs';
import { VerifiedDisp } from './inputs';
import './main.css';

export default class Main extends Component{
  state = {
    hasSubmitted: false,
    cardData: {
      name: '',
      number: '',
      month: '',
      year: '',
      cvv: ''
    },
    defaultData: {
      name: 'JANE APPLESEED',
      number: '1234 5678 9012 3456',
      month: '09',
      year: '04',
      cvv: '123'
    }
  }
  
  uploadData = (data) => {
    let {hasSubmitted} = this.state;
    this.setState({cardData: data});
    this.setState({hasSubmitted: !hasSubmitted});
  }
  
  clearData = () => {
    let {hasSubmitted, defaultData} = this.state;
    this.setState({cardData: defaultData});
    this.setState({hasSubmitted: !hasSubmitted});
  }
  
  render () {
    const {hasSubmitted, cardData} = this.state;
    return (
      <div className="main">
        <AnimatePresence initial={true} >
          <CardsDisplay data={this.state}/>
        </AnimatePresence>
        <div className="form">
        <AnimatePresence initial={true} mode="popLayout">
          { !hasSubmitted ? <Inputs uploadData={this.uploadData}/> :
          <VerifiedDisp clearData={()=>{this.clearData()}}/> }
        </AnimatePresence>
        </div>
      </div>
    );
  }
}