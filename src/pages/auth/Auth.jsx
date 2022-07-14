import React from 'react'
import './auth.css'
import Logo from '../../img/yapooo_logo.png'

const Auth = () => {
  return (
    <div className='auth'>
        <div className="aLeft">
            <img src={Logo} alt="" />
            <div className="appName">
                <h1>Yapooo</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>
        {/* <Signup/> */}
        <Login/>
    </div>
  )
}

const Signup = ()=>{
    return(
        <div className="aRight">
            <form action="" className='infoForm authForm'>
                <h3>Sign up</h3>
                <div>
                    <input type="text" placeholder='First Name' 
                    className='infoInput' name='firstName'/>

                    <input type="text" placeholder='Last Name' 
                    className='infoInput' name='lastName'/>
                </div>

                <div>
                    <input type="text" placeholder='User Name' 
                    className='infoInput' name='userName'/>
                </div>

                <div>
                    <input type="password" placeholder='Password' 
                    className='infoInput' name='password'/>

                    <input type="password" placeholder='Confirm Password' 
                    className='infoInput' name='confirm_password'/>
                </div>

                <div>
                    <span style={{fontSize:'12px'}}>Already have an account ? Login</span>
                </div>
                <button className='button infoButton' type='submit'>
                    Sign up
                </button>
            </form>
        </div>
    )
}

const Login = ()=>{
    return(
        <div className="aRight">
            <form action="" className='infoForm authForm'>
                <h3>Login</h3>

                <div>
                    <input type="text" placeholder='User Name' 
                    className='infoInput' name='userName'/>
                </div>

                <div>
                    <input type="password" placeholder='Password' 
                    className='infoInput' name='password'/>
                </div>

                <div>
                    <span style={{fontSize:'12px'}}>Don't you have an account ? Sign up</span>
                </div>
                <button className='button infoButton' type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Auth
