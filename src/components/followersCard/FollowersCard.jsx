import React, { useState } from 'react'
import './followersCard.css'
import { Followers } from '../../data/FollowersData'
import User from '../user/User'
import { useEffect } from 'react'
import { getAllUser } from '../../api/UserRequest'
import {useSelector} from 'react-redux'

const FollowersCard = () => {
  const [persons,setPersons] = useState([])
  const {user} = useSelector((state)=>state.authReducer.authData)

  useEffect(()=>{
    const fetchPersons = async() =>{
        const {data} = await getAllUser()
        setPersons(data)
    }
    fetchPersons()
  },[])

  return (
    <div className='followersCard'>
        <h3>People you may know</h3>
        {persons.map((person,id)=>{
          if(person._id !== user._id){
            return <User person={person} key={id} />
          }
        })}
    </div>
  )
}

export default FollowersCard