import React, { Component } from 'react'
import Mealtype from './Mealtype'

export default class Quicksearch extends Component {

    constructor() {
        super()
        this.state = {
            mealtype: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:8521/mealtype', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ mealtype: data.data }))
    }

    render() {
        let quickSearchList = this.state.mealtype.length && this.state.mealtype.map((item) => <Mealtype item={item} key={item.name} ></Mealtype>)
        return (
            <div >
                <div className="quicksearch" >
                    <p className="quicksearchHeading">
                        Quick Searches
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by type of meal
                    </p>

                    <div className="container-fluid">

                        <div className="row">
                            {quickSearchList}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
