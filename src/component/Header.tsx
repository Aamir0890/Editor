
import { faInfoCircle,faHourglass2 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/App.css'
function Header() {
  return (

    <div className="card-info-container">
    <div className="card-info">
      <h3 className="card-title">
        A card for GroupGreeting
        <FontAwesomeIcon icon={faInfoCircle} className="info-icon"  style={{marginLeft:'10px'}}/>
      </h3>
      <h3 className="card-timer">
        <FontAwesomeIcon icon={faHourglass2} className="timer-icon" />
        12 days 17 hrs 54 minutes 14 seconds
      </h3>
    </div>
  </div>
  )
}

export default Header
// font-family: Nunito, sans-serif;
// font-size: 1rem;
// font-weight: 400;
// line-height: 1.7;
// color: #8492a6;

// font-family: Nunito, sans-serif;
//     font-size: 1rem;
//     font-weight: 400;
//     line-height: 1.7;
//     color: #8492a6;
//     text-align: left;