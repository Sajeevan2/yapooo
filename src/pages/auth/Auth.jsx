import React from 'react'
import './auth.css'
import Logo from '../../img/yapooo_logo.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
  const dispatch = useDispatch()

  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignup,setIsSignup] = useState(false)
  const [confirmPw,setConfirmPw] = useState(true)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    password:"",
    confirm_password:"",
    username:""
  })

  const handleChange = (e)=>{
     setData({...data,[e.target.name]:e.target.value})
  }

  const resetForm =()=>{
    setConfirmPw(true);
    setData({
        firstName:"",
        lastName:"",
        password:"",
        confirm_password:"",
        username:""
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(isSignup){
        data.password === data.confirm_password 
        ? dispatch(signUp(data)) 
        : setConfirmPw(false)
    }else{
        dispatch(logIn(data))
    }
  }

  return (
    <div className='auth'>
        <div className="aLeft">
            <img src={Logo} alt="" />
            <div className="appName">
                <h1>Yapooo</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>
       {/* Right side */}
       <div className="aRight">
            <form className='infoForm authForm' onSubmit={handleSubmit}>
                <h3>{isSignup ? "Sign up" : "Login"}</h3>
                {
                    isSignup && 
                    <div>
                        <input type="text" placeholder='First Name' 
                        className='infoInput' name='firstName' value={data.firstName} onChange={handleChange}/>

                        <input type="text" placeholder='Last Name' 
                        className='infoInput' name='lastName' value={data.lastName} onChange={handleChange}/>
                    </div>
                }

                <div>
                    <input type="text" placeholder='User Name' 
                    className='infoInput' name='username' value={data.username} onChange={handleChange}/>
                </div>

                <div>
                    <input type="password" placeholder='Password' 
                    className='infoInput' name='password' value={data.password} onChange={handleChange}/>
                    {
                        isSignup && 
                        <input type="password" placeholder='Confirm Password' 
                        className='infoInput' name='confirm_password' value={data.confirm_password} onChange={handleChange}/>
                    }
                </div>
                <span style={{display: confirmPw ? 'none' : 'block',color:'red',fontSize:'12px', alignSelf:'flex-end'}}>* Confirm Password is not same</span>
                {
                    isSignup ?
                    <>
                        <div>
                            <span style={{fontSize:'12px'}} >Already have an account ? <b style={{cursor:'pointer'}} onClick={()=>{setIsSignup(false); resetForm()}}>Login</b></span>
                        </div>
                        <button className='button infoButton' type='submit' disabled={loading}>
                            {loading ? "Loading..." : "Sign up"}
                        </button>
                    </>
                    :
                    <>
                        <div>
                            <span style={{fontSize:'12px'}} >Don't you have an account ? <b style={{cursor:'pointer'}} onClick={()=>{setIsSignup(true); resetForm()}}>Sign up</b></span>
                        </div>
                        <button className='button infoButton' type='submit' disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                        </button>
                    </>
                }
            </form>
        </div>
    </div>
  )
}


export default Auth
