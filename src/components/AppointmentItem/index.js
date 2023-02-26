// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, toggleIsSelected} = props
  const {id, title, date, isSelected} = appointment

  const onClickStar = () => {
    toggleIsSelected(id)
  }

  const imgUrl = isSelected
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="item-head">
        <p>{title}</p>
        <button type="button" onClick={onClickStar} data-testid="star">
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
