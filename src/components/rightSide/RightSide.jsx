import React, { useState } from 'react'
import './rightSide.css'

import Home from '../../img/home.png'
import Notification from '../../img/noti.png'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'

import TrendCard from '../trendCard/TrendCard'
import ShareModal from '../shareModal/ShareModal'
import {Link} from 'react-router-dom'

const RightSide = () => {
  const [modalOpen,setModalOpen]= useState(false)
  return (
    <div className='rightSide'>
        <div className="navIcons">
            <Link to='../home'>
              <img src={Home} alt="" />
            </Link>
            <UilSetting/>
            <img src={Notification} alt="" />
            <img src={Comment} alt="" />
        </div>
        <TrendCard/>
        <button className='button rBtn' onClick={()=>setModalOpen(true)}>
          Share
        </button>
        <ShareModal modalOpen = {modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default RightSide