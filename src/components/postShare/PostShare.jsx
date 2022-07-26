import React, { useRef, useState } from 'react'
import './postShare.css'
import profile from '../../img/profile.jpg'
import { UilScenery , UilPlayCircle , UilLocationPoint , UilSchedule, UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';

const PostShare = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const loading = useSelector((state)=>state.postReducer.uploading)
  const {user} = useSelector((state)=>state.authReducer.authData)
  const dispatch = useDispatch()

  const[image,setImage] = useState(null)

  const imageRef = useRef()
  const descRef = useRef()

  const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
        let img = e.target.files[0]
        setImage(img)
    }
  }

  const reset = ()=>{
    setImage(null)
    descRef.current.value = ""
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const newPost = {
        userId:user._id,
        desc:descRef.current.value
    }
    if(image){
        const data = new FormData()
        const fileName = Date.now()+image.name
        data.append("name",fileName)
        data.append("file",image)
        newPost.image = fileName
        try {
            dispatch(uploadImage(data))
        } catch (error) {
            console.log(error)
        }
    }
    dispatch(uploadPost(newPost))
    reset()
  }

  return (
    <div className="postShare">
        <img src={user.profilePicture ? serverPublic+user.profilePicture : serverPublic+"defaultProfile.png"} alt="" />
        <div>
            <input 
                ref={descRef}
                required
                type="text" 
                placeholder="What's happening ?"
            />
            <div className="postOptions">
                <div className="option" style={{color:"var(--photo)"}} onClick={()=>imageRef.current.click()}>
                    <UilScenery />
                    Photo
                </div>
                <div className="option" style={{color:"var(--video)"}}>
                    <UilPlayCircle />
                    Video
                </div>
                <div className="option" style={{color:"var(--location)"}}>
                    <UilLocationPoint />
                    Location
                </div>
                <div className="option" style={{color:"var(--schedule)"}}>
                    <UilSchedule />
                    Schedule
                </div>
                <button className="button psBtn" onClick ={handleSubmit} disabled={loading}>
                    {loading ? "Uploading..." :"Share"}
                </button>
                <div style={{display:'none'}}>
                    <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
                </div>
            </div>
            {image && 
                <div className="previewImg">
                    <UilTimes onClick={()=>setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt="" />
                </div>
            }
        </div>
    </div>
  )
}

export default PostShare