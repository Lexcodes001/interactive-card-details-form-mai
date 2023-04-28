import { motion, AnimatePresence } from "framer-motion";
import frontDisp from '../assets/images/bg-card-front.png';
import backDisp from '../assets/images/bg-card-back.png';
import cardLogo from '../assets/images/card-logo.svg';

export const CardsDisplay = ({data}) => {
  let carData;
  data.hasSubmitted === false ? carData = data.defaultData : carData = data.cardData;
  return (
    <div className='cards-component'>
      <motion.div 
      className="front-disp"
      key={data.hasSubmitted ? "animating" : "not-animating"}
      initial={{ scale: 0.8, opacity: 0, x: -200 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0.8, opacity: 0, x: -200 }}
      transition={{ type: "spring", duration: 2, ease: "easeOut", bounce: 0.5 }}>
        <div className='rel-box'>
          <img className='front-bg' src={frontDisp} alt='.'/>
          <img className='item logo' src={cardLogo} alt='.'/>
          <p className='item card-number'>{carData.number}</p>
          <p className='item name'>{carData.name}</p>
          <p className='item exp-date'>{carData.month}/{carData.year}</p>
        </div>
      </motion.div>
      
      <motion.div 
      className="back-disp"
      key={data.hasSubmitted ? "animating" : "not-animating"}
      initial={{ scale: 0.8, opacity: 0, x: 200 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0.8, opacity: 0, x: 200}}
      transition={{ type: "spring", duration: 2, ease: "easeOut", bounce: 0.3 }}>
        <div className='rel-box'>
          <img className='back-bg' src={backDisp} alt='.'/>
          <div className='item back'>
            <p className='cvv'>{carData.cvv}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}