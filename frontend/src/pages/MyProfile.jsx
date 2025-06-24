import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData,setUserData] =useState({
    name: 'Akshat Singh',
    image:assets.profile_pic,
    email:'singhakshat@gmail.com',
    phone:'+91 9382356626',
    address:{
      line1:'57th Cross, Sector-5',
      line2:'New Delhi, India'
    },
    gender: 'Male',
    dob:'2000-01-20'
  })

  const [isEdit,setIsEdit] =useState(false)
  return (
    <div>
        <img src={userData.image} alt="" />
        {
          isEdit
          ? <input type="text" />
          : <p>{userData.name}</p>
        }
    </div>
  )
}

export default MyProfile