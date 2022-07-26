import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';

const ProfileModal = ({modalOpen,setModalOpen,data})=> {
  const theme = useMantineTheme();

  const {password, ...other } = data
  const [formData,setFormData] = useState(other)
  const [profileImg,setProfileImg] = useState(null)
  const [coverImg,setCoverImg] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)

  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    let userData = formData
    if(profileImg){
      const data = new FormData()
      const fileName = Date.now() + profileImg.name
      data.append("name",fileName)
      data.append("file",profileImg)
      userData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    if(coverImg){
      const data = new FormData()
      const fileName = Date.now() + coverImg.name
      data.append("name",fileName)
      data.append("file",coverImg)
      userData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id,userData))
    setModalOpen(false)
  }

  const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0]
      e.target.name === "profilePicture" 
      ? setProfileImg(img)
      : setCoverImg(img)
    }
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpen}
      onClose = {()=>setModalOpen(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info </h3>
        <div>
            <input type="text" placeholder='First Name' 
            className='infoInput' name='firstName' 
            onChange={handleChange}
            value={formData.firstName}
            />

            <input type="text" placeholder='Last Name' 
            className='infoInput' name='lastName' onChange={handleChange}
            value={formData.lastName}
            />
        </div>
        <div>
            <input type="text" placeholder='Works at' 
            className='infoInput' name='worksAt' onChange={handleChange}
            value={formData.worksAt}
            />
        </div>
        <div>
            <input type="text" placeholder='Lives in' 
            className='infoInput' name='livesIn' onChange={handleChange}
            value={formData.livesIn}
            />

            <input type="text" placeholder='Country' 
            className='infoInput' name='country' onChange={handleChange}
            value={formData.country}
            />
        </div>
        <div>
            <input type="text" placeholder='Relationship Status' 
            className='infoInput' name='relationship' onChange={handleChange}
            value={formData.relationship}
            />
        </div>
        <div>
            Profile Image
            <input type="file" name="profilePicture" onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverPicture" onChange={onImageChange}/>
        </div>
        <button className="button infoBtn" type="submit">
            Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;