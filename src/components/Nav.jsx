import '../css/nav.css'
import React from 'react'
import Alert from './Alert'
import { useGlobalContext } from '../context'

const Nav = () => {
  const {openOrder,
    state:{quantity}
  } = useGlobalContext()
  return (
    <div className='nav'>
        <div className="wrapper">
            <div className="logo">Dope Eatery</div>
            <div className="nav-links">
                <button onClick={()=> openOrder()}>
                    My Orders
                    <span className='badge'>{quantity}</span>
                </button>
            </div>
        </div>
        <Alert/>
    </div>
  )
}

export default Nav
