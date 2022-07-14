import { Modal, useMantineTheme } from '@mantine/core';

const ProfileModal = ({modalOpen,setModalOpen})=> {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpen}
      onClose = {()=>setModalOpen(false)}
    >
      <form action="" className="infoForm">
        <h3>Your Info </h3>
        <div>
            <input type="text" placeholder='First Name' 
            className='infoInput' name='firstName'/>

            <input type="text" placeholder='Last Name' 
            className='infoInput' name='lastName'/>
        </div>
        <div>
            <input type="text" placeholder='Works at' 
            className='infoInput' name='worksAt'/>
        </div>
        <div>
            <input type="text" placeholder='Lives in' 
            className='infoInput' name='livesIn'/>

            <input type="text" placeholder='Country' 
            className='infoInput' name='country'/>
        </div>
        <div>
            <input type="text" placeholder='Relationship Status' 
            className='infoInput' name='status'/>
        </div>
        <div>
            Profile Image
            <input type="file" name="profImg"/>
            Cover Image
            <input type="file" name="coverImg"/>
        </div>
        <button className="button infoBtn">
            Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;