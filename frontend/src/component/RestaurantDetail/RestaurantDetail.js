import React from 'react'
import Header from '../Comman/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {resolve, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import '../../styles/details.css'
import Modal from 'react-modal';

Modal.setAppElement('#root')

export default function RestaurantDetail() {

  let { rName } = useParams()
  const [restaurant, setRestaurant] = useState({})
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [menu, setMenu] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:8521/restaurant/details/${rName}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => { setRestaurant(data.data) })
  }, [])  // behave like a componentdidmount when second  parameter is a blank array{AND it behave like a componentdidupdate when  second  parameter has some value}

  const fetchMenu = () => {
    fetch(`http://localhost:8521/menu/${rName}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => setMenu(data.data))
  }

  const calTotalPrice = (item) => {
    let price = totalPrice + item.itemPrice;
    setTotalPrice(price);
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script) 
    })
  }

  const openRazorpay = async () => {
    // creating order data in razor pay by calling backend api
    try {
      let orderData;
      orderData = await fetch('http://localhost:8521/pay', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({amount:totalPrice})
          }).then((t) => t.json());

      // console.log(totalPrice)
      //  open razor pay window
      const options = {
        key: "rzp_test_cyfbOB9LBabRxL",
        name:"Zomato food delivery app",
        amount:totalPrice*100,
        currency:orderData.currency,
        order_id:orderData.id,
        prefill:{
          email:'hahiri5791@shbiso.com',
          contact:'202-555-0183'
        },
        handler:function(response){
        // call api that would save transaction into mongodb
        fetch('http://localhost:8521/pay/save', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
              razorpay_order_id:response.razorpay_order_id,
              razorpay_payment_id:response.razorpay_payment_id,
              razorpay_signature:response.razorpay_signature,
              razorpay_amount:orderData.amount
            })
          }).then((resp)=>console.log(resp));
        }

      }
      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open()
    }
    catch (error) {
      console.log(error)
    }
  }

  const { name, thumb, cost, address, Cuisine } = restaurant
  let cuisineList = !(Cuisine === undefined) && Cuisine.length && Cuisine.map((item) =>
    <ul key={item.name}>
      <li>{item.name}</li>
    </ul>)
  return (
    <div>
      <Header></Header>
      <div>
        <img src={thumb} height="500px" width="100%" alt='' />
      </div>
      <div >
        <h2>{name}</h2>
        <button
          className='btn btn-danger'
          style={{ float: 'right' }}
          onClick={() => {
            setIsMenuModalOpen(true)
            fetchMenu()
          }
          }>
          Place Online Order
        </button>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Contact</Tab>
          </TabList>

          <TabPanel>
            <div className='about'>About the place</div>
            <div className='head'>Cuisine</div>
            {cuisineList}
            <div className='head'>Average cost</div>
            <div className='value'>&#8377; {cost}</div>
          </TabPanel>
          <TabPanel>
            <div className='head'>Phone Number</div>
            <div className='value'>+91-123456789</div>
            <div className='head'>{name}</div>
            <div>{address}</div>
          </TabPanel>
        </Tabs>
      </div>
      <div>
        <Modal
          isOpen={isMenuModalOpen}
        >
          <div>
            <div className='row'>
              <div className='col-sm-9'>
                <h2>Menu</h2>
              </div>
              <div className='col-sm-3'>
                <button className='btn btn-danger float-end' onClick={() => setIsMenuModalOpen(false)}>X</button>
              </div>
            </div>
            <ul>
              {
                menu.length &&
                menu.map((item, index) => <li key={index}>
                  <div>
                    {
                      item.isVeg ? <span className='text-success fs-6'>Veg</span> : <span className='text-danger fs-6'>Non-veg</span>
                    }
                  </div>
                  <div>{item.itemName}</div>
                  <div>
                    <button className='btn btn-secondary '
                      style={{ float: 'right' }}
                      onClick={() => calTotalPrice(item)}
                    >Add</button>
                  </div>
                  <div className='cuisines'>&#8377; {item.itemPrice}</div>
                  <div className='cuisines'>{item.itemDescription}</div>

                </li>
                )
              }
            </ul>
            <hr />
            <h3>Total Price:{totalPrice}</h3><button onClick={() => { setIsMenuModalOpen(false); loadScript('https://checkout.razorpay.com/v1/checkout.js'); openRazorpay(); }}>Pay Now</button>


          </div>
        </Modal>
      </div>
    </div>
  )
}
