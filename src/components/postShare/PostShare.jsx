import React, { useRef, useState } from 'react'
import './postShare.css'
import profile from '../../img/profile.jpg'
import { UilScenery , UilPlayCircle , UilLocationPoint , UilSchedule, UilTimes } from '@iconscout/react-unicons'

const PostShare = () => {
  const[image,setImage] = useState(null)
  const imageRef = useRef()

  const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
        let img = e.target.files[0]
        setImage({
            img:URL.createObjectURL(img)
        })
    }
  }

  return (
    <div className="postShare">
        <img src={profile} alt="" />
        <div>
            <input type="text" placeholder="What's happening ?"/>
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
                <button className="button psBtn">
                    Share
                </button>
                <div style={{display:'none'}}>
                    <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
                </div>
            </div>
            {image && 
                <div className="previewImg">
                    <UilTimes onClick={()=>setImage(null)}/>
                    <img src={image.img} alt="" />
                </div>
            }
        </div>
    </div>
  )
}

export default PostShare