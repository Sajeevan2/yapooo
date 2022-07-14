import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import './profile.css'

const Profile = () => {
  return (
    <div className='profileSide'>
        <LogoSearch/>
        <ProfileCard page="home"/>
        <FollowersCard/>
    </div>
  )
}

export default Profile