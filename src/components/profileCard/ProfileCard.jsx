import React from 'react'
import './profileCard.css'
import profile from '../../img/profile.jpg'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const ProfileCard = ({page}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const posts = useSelector((state)=>state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='profileCard'>
        <div className="profileImages">
            <img src={user.coverPicture ? serverPublic+user.coverPicture : serverPublic+"defaultCover.jpg"} alt="" />
            <img src={user.profilePicture ? serverPublic+user.profilePicture : serverPublic+"defaultProfile.png"} alt="" />
        </div>
        <div className="profileName">
            <span>{user.firstName} {user.lastName}</span>
            <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
        </div>
        <div className="profileFollowStatus">
            <hr/>
            <div>
                <div className="follow">
                    <span>{user.following.length}</span>
                    <span>Following </span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
                {
                    page == 'profile' && 
                    <>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{posts?.filter((post)=>post.userId === user._id).length}</span>
                        <span>Posts</span>
                    </div>
                    </>
                }
            </div>
            <hr/>
        </div>
        {
        page == 'home' &&
       <span>
            <Link style={{textDecoration:'none',color:'inherit'}} to={`/profile/${user._id}`}> My Profile </Link>
        </span>
        }
    </div>
  )
}

export default ProfileCard
