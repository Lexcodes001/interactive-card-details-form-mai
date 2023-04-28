import React, {Component} from 'react';
import { motion, AnimatePresence } from "framer-motion"
import iconTick from '../assets/images/icon-complete.svg';

export default class Inputs extends Component{
  state = {
    name: '',
    rawName: '',
    number: '',
    rawNum: '',
    month: '',
    year: '',
    cvv: '',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    classone: '',
    classtwo: '',
    classthree: '',
    classfour: '',
    classfive: '',
    buttonState: 'disabled'
  }
  
  handleChange = (e) => {
    let {name, value, maxLength, id} = e.target;
    let msg, modName, modNum, first, second, third, fourth, letterValid, valArr, letters = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    if (name === 'number') {
      if (value.length === maxLength) {
        this.setState({rawNum : value});
        first = value.slice(0, 4);
        second = value.slice(4, 8);
        third = value.slice(8, 12);
        fourth = value.slice(12);
        modNum = `${first} ${second} ${third} ${fourth}`;
        this.setState({[name] : modNum});
      } else {
        this.setState({rawNum : value});
      }
    } else {
      this.setState({[name] : value});
    }
    
    if (value.length > maxLength) {
      msg = `Cannot be more than ${maxLength} characters`;
      this.setState({[id]: msg});
      this.setState({ [`class${id}`] : 'error' });
      this.setState({ buttonState : 'disabled' });
    } else if (value === 0 || value === '') {
      name === 'name' ? this.setState({rawName : ''}) : this.setState({[name] : value});
      msg = `Can't be blank`;
      this.setState({[id]: msg});
      this.setState({ [`class${id}`] : 'error' });
      this.setState({ buttonState : 'disabled' });
    } else if (name === 'name') {
      
      valArr = value.split('');
      letterValid = valArr.every(r=> letters.indexOf(r) >= 0);
      
      if (letterValid === false) {
        msg = `Can't contain numbers or special characters`;
        this.setState({one : msg});
        this.setState({classone : 'error'});
        this.setState({buttonState : 'disabled'});
      } else {
        this.setState({one : ''});
        this.setState({classone : 'active'});
        this.setState({buttonState : ''});
        modName = value.toUpperCase().trim();
        this.setState({[name] : modName});
      }
      this.setState({rawName : value});
      
    } else {
      this.setState({[id] : ''});
      this.setState({ [`class${id}`] : 'active' });
      this.setState({ buttonState : '' });
    }
  }
  
  onFocus = (e) => {
    let {id, className} = e.target;
    if (className === 'error') {
      this.setState({ [`class${id}`] : 'error' });
      this.setState({ buttonState : 'disabled' });
    } else {
      this.setState({ [`class${id}`] : 'active' });
    }
  }
  
  onBlur = (e) => {
    let {id, className} = e.target;
    if (className === 'error') {
      this.setState({ [`class${id}`] : 'error' });
      this.setState({ buttonState : 'disabled' });
    } else {
      this.setState({ [`class${id}`] : '' });
    }
  }
  
  render () {
    const {rawName, name, rawNum, number, month, year, cvv, one, two, three, four, five, classone,
    classtwo,
    classthree, classfour, classfive, buttonState} = this.state;
    return (
      <motion.div 
      className="inputs"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", duration: 2 }}>
        <div className="input-box">
          <label>CARDHOLDER NAME</label>
          <input type='text' id='one' name='name' className={classone} placeholder="e.g. Jason
          Statham" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} maxLength={30} value={rawName}/>
          <p className="err">{one}</p>
        </div>
        
        <div className="input-box">
          <label>CARD NUMBER</label>
          <input type='number' maxLength={16} id='two' name='number'
          className={classtwo} placeholder="e.g. 1234
          5678 9012 3456" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.handleChange} value={rawNum}/>
          <p className="err">{two}</p>
        </div>
        
        <div className="other-input-box">
          <div className="input-lil-box">
            <label>EXP. DATE (MM/YY)</label>
            <div className="date-inputs">
              <input type='number' maxLength={2} id='three' name='month'
              className={classthree}
              placeholder="MM" onBlur={this.onBlur} onFocus={this.onFocus} 
              onChange={this.handleChange} value={month}/>
              <input type='number' maxLength={2} id='four' name='year'
              className={classfour}
              placeholder="YY" onBlur={this.onBlur} onFocus={this.onFocus} 
              onChange={this.handleChange} value={year}/>
            </div>
            <p className="err">{three !== '' ? three : four}</p>
          </div>
          
          <div className="input-lil-box">
            <label>CVV</label>
            <input type='number' maxLength={3} id='five' name='cvv'
            className={classfive}
            placeholder="e.g. 123" onBlur={this.onBlur} onFocus={this.onFocus} 
            onChange={this.handleChange} value={cvv}/>
            <p className="err">{five}</p>
          </div>
        </div>
        <button className={buttonState} onClick={() => {this.props.uploadData(this.state)}}>Submit</button>
      </motion.div>
    );
  }
}

export const VerifiedDisp = (props) => {
  return (
    <motion.div
      className="tick-box"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", duration: 2 }}>
      <img className='icon-tick' src={iconTick} alt='.' />
      <div className='msg-box'>
        <p>THANK YOU!</p>
        <p>We've added your card details</p>
      </div>
      <button onClick={props.clearData}>Continue</button>
    </motion.div>
  );
}