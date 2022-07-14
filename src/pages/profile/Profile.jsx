import React from 'react'
import ProfileLeft from '../../components/profileleft/ProfileLeft'
import './profile.css'
import ProfileCard from '../../components/profileCard/ProfileCard'
import PostSide from '../../components/postSide/PostSide'
import RightSide from '../../components/rightSide/RightSide'

const Profile = () => {
  return (
    <div className='profile'>
        <ProfileLeft/>
        <div className="profileCenter">
            <ProfileCard page="profile"/>
            <PostSide/>
        </div>
        <RightSide/>
    </div>
  )
}

export default Profile