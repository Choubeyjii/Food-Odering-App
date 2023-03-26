import React from 'react'
import {Link} from 'react-router-dom'

export default function Mealtype(props) {

    const{name,content,image}=props.item

    return ( 
        <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="tileContainer">
            <div className="tileComponent1">
                <img src={require('../../' + image)} height="150" width="140" alt=''
                />
            </div>
            <div className="tileComponent2">
                <Link to={`/filter`} style={{ textDecoration: 'none' }}><div className="componentHeading">
                    {name} 
                </div></Link>
                <div className="componentSubHeading">
                    {content} 
                </div>
            </div>
        </div>
    </div>
       
    )
}
