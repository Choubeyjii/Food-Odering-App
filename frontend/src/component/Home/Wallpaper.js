import React, { Component } from 'react'
import homepage from '../../Assets/homepageimg.png'
import '../../styles/wallpaper.css'
import {Link} from 'react-router-dom'

export default class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      location: [],
      restaurants: []
    }
    // console.log("Wallpaper Constructor method called!!!!!")
  }

  fetchRestaurants = (event) => {
    console.log(event.target.value)
    fetch(`http://localhost:8521/restaurant/${event.target.value}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => this.setState({ restaurants: data.data }))
  }

  static getDerivedStateFromProps(props, state) {

    // console.log("getDerivedStateFromProps Constructor is called")
    return {}
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    // console.log("componentDidMount Constructor called");
    fetch('http://localhost:8521/location', { method: 'GET' })
      .then(response => response.json())
      .then(data => this.setState({ location: data.data }))
  }

  getSnapshotBeforeUpdate(perProps, preState) {
    // console.log(`getSnapshotBeforeUpdate is called!!! with previous props:${perProps} and previous State:${preState.location}`)
    return null;
  }

  componentDidUpdate() {
    // console.log("Wallpaper Component did update is called ")
  }

  render() {


    let locationOptions = this.state.location.length && this.state.location.map((item) => <option key={item.name} value={item.city_id} >{item.name}</option>)
    // console.log("Render Console Log called!!!!!")

    let restaurantList = this.state.restaurants.length && <ul>
      {
        this.state.restaurants.map((item) => 
                                   <li key={item.name}> 
                                           <Link  to={`/details/${item.name}`}>
                                           {item.name}
                                           </Link>
                                   </li>)
      }
    </ul>

    return (
      <div>
        <div>
          <img src={homepage} width='100%' height='450' alt='Img can not be loaded' />
          <div className="logo">
            F$
          </div>
          <div className="headings">
            Find the best restaurants, cafes, bars
          </div>
        </div>
        <div className="locationSelector">
          <select className="locationDropdown" onChange={this.fetchRestaurants}>
            <option value="0">Select</option>
            {locationOptions}
          </select>
          <div id='notebooks'>
            <input className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" />
            {restaurantList}

          </div>
        </div>

      </div>


    )
  }
}
