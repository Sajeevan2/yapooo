import React, { useState } from 'react'
import './infoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../profileModal/ProfileModal'

const InfoCard = () => {
    const [modalOpen,setModalOpen]= useState(false)
  return (
    <div className='infoCard'>
        <div className="infoHead">
            <h3>Your Info</h3>
            <div>
                <UilPen width='2rem' height='1.2rem' onClick={()=>setModalOpen(true)}/>
                <ProfileModal modalOpen = {modalOpen} setModalOpen={setModalOpen}/>
            </div>
        </div>
        <div className="info">
            <span>
                <b>Status </b>
            </span>
            <span> Single </span>
        </div>
        <div className="info">
            <span>
                <b>Lives in </b>
            </span>
            <span> Turkey </span>
        </div>
        <div className="info">
            <span>
                <b>Works at </b>
            </span>
            <span> ZainkeepsCode Insitute </span>
        </div>
        <button className='button logoutBtn'>
            Logout
        </button>
    </div>
  )
}

export default InfoCard