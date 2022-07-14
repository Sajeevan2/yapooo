import React from 'react'
import { TrendData } from '../../data/TrendData'
import './trendCard.css'

const TrendCard = () => {
  return (
    <div className='trendCard'>
      <h3>Trends for you</h3>
      {
        TrendData.map((trend,id)=>{
         return ( <div className="trend" key={id}>
            <span>#{trend.name}</span>
            <span>{trend.shares}k</span>
          </div>)
        })
      }
    </div>
  )
}

export default TrendCard