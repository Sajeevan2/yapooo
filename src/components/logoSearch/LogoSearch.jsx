import React from 'react'
import './logoSearch.css'
import logo from '../../img/yapooo_logo.png';
import {UilSearch} from '@iconscout/react-unicons'

const LogoSearch = () => {
  return (
    <div className='logoSearch'>
        <img src={logo} alt="" />
        <div className='search'>
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
            <UilSearch/>
          </div>
        </div>
    </div>
  )
}

export default LogoSearch