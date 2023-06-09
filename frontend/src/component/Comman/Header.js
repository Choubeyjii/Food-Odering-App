import React from 'react'
import '../../styles/header.css'
import Modal from 'react-modal'
import { useState } from 'react'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)'
  }
}

export default function Header() {

  const [isLoginModalOpen, setLoginModal] = useState(false)
  const [isSignupModalOpen, setSignupModal] = useState(false)


  // const [isCreateModalopen, setCreateModal] = useState(false)

  const [isHelpModalopen, setHelpModal] = useState(false)

  const responseFacebook = (response) => (
    console.log(response)
  )

  const [user, setuser] = useState({
    name: '',
    email: "",
    phoneno: '',
    password: "",
    confirm: ""

  })



  const handlechange = (e) => {
    const { name, value } = e.target
    setuser({
      ...user,
      [name]: value
    })

  }



  const register = (e) => {
    e.preventDefault();
    console.log('register function')
    const { name, email, phoneno, password, confirm } = user
    if (name && email && phoneno && password && (password === confirm)) {
      axios({
        url: 'http://localhost:8521/signUp',
        method: 'post',
        headers: { 'Content-Type': 'Application/json' },
        data: user
      }).then(response => console.log(response)).catch(err => console.log(err))

    } else {
      alert("invalid")
    }


  }

  const [login, setlogin] = useState({
    email: '',
    password: ''
  })




  const handlelogin = (e) => {
    // e.preventDefault()
    const { name, value } = e.target;
    //console.log(e.target)
    setlogin({
      ...login,
      [name]: value
    })

  }


  const LOGIN = (e) => {
    // const{email,password} = user
    e.preventDefault()
    console.log(login)
    axios({
      url: 'http://localhost:8521/login',
      method: 'post',
      headers: { 'Content-Type': 'Application/json' },
      data: login
    }).then(response => alert(response.data.message)).catch(err => console.log(err))
    setLoginModal(false)

  }

  const handleemail = (e) => {
    <div>
      <p data-uia="email-description">We will send you an email with instructions on how to reset your password.</p>
      <div class="contact-input-wrapper">
        <label class="contact-method-input ui-label ui-input-label" id="lbl-forgot_password_input" placeholder="forgot_password_input">
          <span class="ui-label-text"></span>
          <input type="email" data-uia="forgot_password_input" class="ui-text-input" name="forgot_password_input" id="forgot_password_input" value="" placeholder="name@example.com" tabindex="0" /></label>
      </div></div>
  }





  const handletext = (e) => {
    <div>
      <p data-uia="tel-description">We will text you a verification code to reset your password. Message and data rates may apply.</p>
      <div class="contact-input-wrapper">
        <div data-uia="phone-country-selector+container" class="ui-select-wrapper country-select">
          <a data-uia="phone-country-selector+target" href="#" class="ui-select-wrapper-link">
            <div class="ui-select-current" placeholder="{&quot;current_selected_country&quot;:&quot;IN&quot;}">
              <span class="country-select-flag nf-flag nf-flag-in"></span>
              <span class="country-select-code">+91</span></div></a>
          <button class="btn btn-primary" type="button" autocomplete="off" tabindex="0" data-uia="action_forgot_password">Text Me</button>
        </div>
      </div>
    </div>

  }


  return (
    <div className="header">
      <div className="s-logo">
        <p>F$</p>
      </div>
      <div className="btn-group login-block">
        <span className="login" onClick={() => setLoginModal(true)}>Log in</span>
        <span className="signUp" onClick={() => setSignupModal(true)}>Create an account</span>
      </div>
      <Modal
        isOpen={isLoginModalOpen}
        style={customStyle}
      >
        <h2 style={{ textAlign: 'center' }}>Login Modal
          <button onClick={() => setLoginModal(false)} className="btn btn-danger float-end">X</button>
        </h2><br />


        <form>
          {console.log("login", login)}
          <input placeholder='enter email' type='text' name='email' onChange={(e) => handlelogin(e)}></input><br />
          <input placeholder='enter password' type='password' name='password' onChange={(e) => handlelogin(e)}></input><br />
          <button onClick={LOGIN}>Login</button>
          <a class="login-help-link link float-end" target="_self" data-uia="login-help-link" onClick={() => setHelpModal(true)}>Need help?</a>

          <div class="login-signup-now" data-uia="login-signup-now">New User? <a class="" target="_self" onClick={() => {
            setSignupModal(true);
            setLoginModal(false);
          }}>Create an account now</a>.</div>



          <Modal isOpen={isHelpModalopen}>
            <button onClick={() => setHelpModal(false)} className='btn btn-danger float-end' >x</button>
            <div class="login-content">
              <div data-uia="password-reset-wrapper">
                <h1 data-uia="password-reset-header">Forgot Email/Password</h1>
                <p data-uia="password-reset-subheader">How would you like to reset your password?</p>
                <div class="reset-choice-container" data-uia="reset-choice-container">
                  <div class="ui-binary-input">
                    <input type="radio" class="reset-password-choice" name="resetPasswordChoice" id="bxid_resetPasswordChoice_email" value="email" tabindex="0" data-uia="email" checked onClick={handleemail()} />

                    <label for="bxid_resetPasswordChoice_email" data-uia="label+email">Email</label>
                    <div class="helper"></div></div><div class="ui-binary-input">
                    <input type="radio" class="reset-password-choice" name="resetPasswordChoice" id="bxid_resetPasswordChoice_text" value="text" tabindex="0" data-uia="text" onClick={handletext()} />
                    <label for="bxid_resetPasswordChoice_text" data-uia="label+text" >Text Message (SMS)</label>
                    <div class="helper"></div></div></div><div>
                </div>
              </div>
            </div>
          </Modal>
        </form>

        <br />
        <hr />

        <FacebookLogin
          appId="466457061923158"
          fields="name,email,picture"
          icon="fa-facebook"
          callback={() => responseFacebook}
        /><br />
        <GoogleLogin
          clientId="444308486354-18kjnt9brv0qhg8didbsscedn3hmb9jj.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Modal>

      <Modal
        isOpen={isSignupModalOpen}
        style={customStyle}
      >

        <h2>Signup Modal
          <button onClick={() => setSignupModal(false)} className="btn btn-danger float-end">X</button>
        </h2>

        <form>
          <div>
            {console.log("user", user)}
            NAME:<input placeholder='enter your name' type='text' name='name' value={user.name} onChange={handlechange} ></input><br /><br />
            Email:<input placeholder='enter your Email' type='text' name='email' value={user.email} onChange={handlechange} ></input><br /><br />
            PHONE NO:<input placeholder='enter your phoneno' type='number' name='phoneno' value={user.phoneno} onChange={handlechange}></input><br /><br />
            PASSWORD: < input placeholder='enter your password' type='password' name='password' value={user.password} onChange={handlechange} ></input><br /><br />
            CONFIRM PASSWORD:<input placeholder='please re-enter password' type='password' name='confirm' value={user.confirm} onChange={handlechange} ></input><br /><br />
            <button className='btn btn-danger' onClick={register}>SignUp</button><br />
            <div class="login-signup-now" data-uia="login-signup-now">Existing User? <a class="" target="_self" onClick={() => {
              setSignupModal(false);
              setLoginModal(true);
            }}>Login Now</a>.</div>
          </div>
        </form>




        <hr />
        <hr />

        <FacebookLogin
          appId="466457061923158"
          fields="name,email,picture"
          icon="fa-facebook"
          callback={() => responseFacebook}
        /><br />
        <GoogleLogin
          clientId="444308486354-18kjnt9brv0qhg8didbsscedn3hmb9jj.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Modal>
    </div>
  )
}
