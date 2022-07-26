import React, { useState,useEffect } from 'react'
import './infoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'
import { logout } from '../../actions/AuthAction'

const InfoCard = () => {
  const [modalOpen,setModalOpen]= useState(false)

  const dispatch = useDispatch()
  const params = useParams()

  const {user} = useSelector((state)=>state.authReducer.authData)
  const profileUserId = params.id

  const[profileUser,setProfileUser] = useState({})

  useEffect(()=>{
    const fetchProfieUser = async()=>{
        if(profileUserId === user._id){
            setProfileUser(user)
        }else{
            const resUser = await UserApi.getUser(profileUserId)
            setProfileUser(resUser)
        }
    }
    fetchProfieUser()
  },[user])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='infoCard'>
        <div className="infoHead">
            <h3>Profile Info</h3>
            {
            user._id === profileUserId &&
            <div>
                <UilPen width='2rem' height='1.2rem' onClick={()=>setModalOpen(true)}/>
                <ProfileModal 
                    modalOpen = {modalOpen} 
                    setModalOpen={setModalOpen}
                    data = {user}
                />
            </div>
            }
        </div>
        <div className="info">
            <span>
                <b>Status </b>
            </span>
            <span> {user.relationship} </span>
        </div>
        <div className="info">
            <span>
                <b>Lives in </b>
            </span>
            <span> {user.livesIn} </span>
        </div>
        <div className="info">
            <span>
                <b>Works at </b>
            </span>
            <span> {user.worksAt} </span>
        </div>
        <button className='button logoutBtn' onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}

export default InfoCard