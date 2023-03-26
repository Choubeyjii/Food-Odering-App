import React from 'react'
import '../../styles/filter.css'
import { useState, useEffect } from 'react'
import Header from '../Comman/Header'
import { Link } from 'react-router-dom'



export default function Filter() {

    const [filter, setFilter] = useState({
        city_id: "",
        cuisine: [],
        lcost: "",
        hcost: "",
        sort: 1
    })
    const [locations, setlocations] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPageNo, setCurrentPageNo] = useState(1)


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)
    }


    useEffect(() => {
        //   fetch
        fetch(`http://localhost:8521/restaurant/filter/${currentPageNo}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setRestaurant(data.data);
                setPageCount(data.totalRecords / 2);
            })
    }, [filter, currentPageNo])


    useEffect(() => {
        fetch('http://localhost:8521/location', { method: 'GET' })
            .then(response => response.json())
            .then(data => setlocations(data.data))
    }, [])




    const handleCuisineChange = (event) => {
        if (event.target.checked)
            filter.cuisine.push(event.target.name)
        else {
            let index = filter.cuisine.indexOf(event.target.name)
            if (index > -1)
                filter.cuisine.splice(index, 1)
        }
        setFilter({ ...filter })

    }


    const handleCostChange = (lcost, hcost) => {
        filter.lcost = lcost;
        filter.hcost = hcost;
        setFilter({ ...filter })
    }

    const handleSort = (s) => {
        filter.sort = s;
        setFilter({ ...filter })
    }

    const paginationItems = [];
    for (let i = 1; i <= pageCount; i++) {
        paginationItems[i] = <a href='#' key={i} onClick={() => setCurrentPageNo(i)} >{i} </a>
    }
    const dec = () => {
        if (currentPageNo > 1)
            setCurrentPageNo(currentPageNo - 1)
        else
            setCurrentPageNo(currentPageNo === 1)
    }

    const inc = () => {
        if (currentPageNo < 5)
            setCurrentPageNo(currentPageNo + 1)
        else
            setCurrentPageNo(currentPageNo === 6)
    }



    const handleLocation = (event) => {
        console.log(event.target.value)
        filter.city_id = (event.target.value)
        setFilter({ ...filter })




    }

    let locationList = locations.length && locations.map((item) => <option key={item.name} value={item.city_id}>{item.name}</option>)


    return (
        <div>
            <Header></Header>
            <div id="myId" className="heading-filter">Breakfast Places in Delhi</div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <div className="filter-options">
                            <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                                data-target="#demo"></span>
                            <div id="demo" className="collapse show">


                                <div className="filter-heading">Filters</div>
                                <div className="Select-Location">Select Location</div>
                                <select id="selectl" onChange={(e) => handleLocation(e)} >
                                    <option >Select location</option>
                                    {locationList}
                                </select>
                                {/* 
                                <div className="filter-heading"><h4>Filter</h4> </div>
                                <span id="sl">Select Location</span>
                                <span>
                                    <select id="selectl" onChange={(e) => handleLocation(e)} >
                                        <option >Select location</option>
                                        {locationList}
                                    </select>
                                </span> */}
                                <hr></hr>
                                <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" name="North Indian" onChange={(e) => handleCuisineChange(e)} />
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="South Indian" onChange={(e) => handleCuisineChange(e)} />
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="Chinese" onChange={(e) => handleCuisineChange(e)} />
                                    <span className="checkbox-items">Chinese</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="Fast Food" onChange={(e) => handleCuisineChange(e)} />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="Street Food" onChange={(e) => handleCuisineChange(e)} />
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleCostChange(1, 500)} />
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleCostChange(500, 1000)} />
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleCostChange(1000, 1500)} />
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleCostChange(1500, 2000)} />
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleCostChange(2000, 10000)} />
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleCostChange(1, 10000)} />
                                    <span className="checkbox-items">All</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" checked={filter.sort === 1} onChange={() => handleSort(1)} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" checked={filter.sort === -1} onChange={() => handleSort(-1)} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 scroll">
                        {
                            restaurant.length > 0 ? restaurant.map((item) =>
                                <div className="Item" >
                                    <div className="row pl-1">
                                        <div className="col-sm-4 col-md-4 col-lg-4"  >
                                            <img className="img" src={require('../../Assets/breakfast.jpg')} />

                                        </div>
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <div className="rest-name" ><Link to={`/details/${item.name}`} style={{ textDecoration: 'none' }} >{item.name}</Link></div>
                                            <div className="res-location">{item.locality}</div>
                                            <div className="rest-address">{item.city_name}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row padding-left">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="rest-address">CUISINES : {item.Cuisine.length && item.Cuisine.map((item) => item.name + ' ')}</div>
                                            <div className="rest-address">COST FOR TWO : {item.cost} </div>
                                        </div>
                                    </div>
                                </div>

                            ) : <div className="noData"> No Data Found</div>
                        }

                    </div>
                    <div>
                        <div className="pagination">
                            <a href="#"
                                onClick={dec}  >&laquo;</a>
                            {paginationItems}
                            <a href="#"
                                onClick={inc} >&raquo;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
