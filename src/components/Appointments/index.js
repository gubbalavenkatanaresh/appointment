// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isSelected: false}

  onClickStarButton = () => {
    const {appointmentList} = this.state
    const filteredAppointmentList = appointmentList.filter(
      eachAppointment => eachAppointment.isSelected === true,
    )
    this.setState({appointmentList: filteredAppointmentList})
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date, isSelected} = this.state
    const newAppointment = {
      id: v4(),
      title,
      date,
      isSelected,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsSelected = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isSelected: !eachAppointment.isSelected}
        }
        return eachAppointment
      }),
    }))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    const dateOrder = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({date: dateOrder})
  }

  render() {
    const {appointmentList, title, date} = this.state
    return (
      <div className="container">
        <div className="card">
          <div className="top">
            <div>
              <h1>Add Appointment</h1>
              <form
                className="form-container"
                onSubmit={this.onSubmitAppointment}
              >
                <label htmlFor="title" className="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.onTitleChange}
                  value={title}
                />
                <label htmlFor="date" className="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onDateChange}
                  value={date}
                />
                <button type="submit" className="add-button" data-testid="star">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="
https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="bottom-heading">
            <h1>Appointments</h1>
            <button
              type="button"
              className="start-button"
              onClick={this.onClickStarButton}
              data-testid="star"
            >
              starred
            </button>
          </div>
          <ul className="list-container">
            {appointmentList.map(eachAppointment => (
              <AppointmentItem
                appointment={eachAppointment}
                key={eachAppointment.id}
                toggleIsSelected={this.toggleIsSelected}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
