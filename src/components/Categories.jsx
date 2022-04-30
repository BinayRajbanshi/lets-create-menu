import React from 'react'
import '../css/categories.css'
import { useGlobalContext } from '../context'

const Categories = () => {
  const {filterMenuItems , state:{category} } = useGlobalContext()
  return (
    // setting up filter buttons dynamically
      <div className="btn-container">
        {category.map((category , index)=>{
          return <button key={index} onClick={()=>filterMenuItems(category)}>{category}</button>
        })}
      </div>
   
  )
}

export default Categories
