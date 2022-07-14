import React from 'react'
import './profileCard.css'
import cover from '../../img/cover.jpg'
import profile from '../../img/profile.jpg'

const ProfileCard = ({page}) => {
  return (
    <div className='profileCard'>
        <div className="profileImages">
            <img src={cover} alt="" />
            <img src={profile} alt="" />
        </div>
        <div className="profileName">
            <span>Zain Sham</span>
            <span>Senior Software Engineer</span>
        </div>
        <div className="profileFollowStatus">
            <hr/>
            <div>
                <div className="follow">
                    <span>6,456</span>
                    <span>Followings</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>100</span>
                    <span>Followers</span>
                </div>
                {
                    page == 'profile' && 
                    <>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>4</span>
                        <span>Posts</span>
                    </div>
                    </>
                }
            </div>
            <hr/>
        </div>
        {
        page == 'home' && <span>My Profile</span>
        }
    </div>
  )
}

export default ProfileCard
