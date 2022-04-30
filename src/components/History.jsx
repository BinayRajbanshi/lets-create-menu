import React from 'react'
import { useGlobalContext } from '../context'
import '../css/history.css'

const History = () => {
    const {state } = useGlobalContext()
    if(!state.orderHistory){
        return <div className="history">
            <p>You don't have any purchase history.</p>
        </div>
    }
  return (
    <div className='history'>
        <header>Confused What to order? Checkout your last order.</header>
        <ul>
            {state.orderHistory.map((item)=> {
                const {title , price , id , image , amount} = item
                return <li key={id}>
                    <div className='content'>
                        <img src={image} alt={title} />
                        <div className="text-1">{title}</div>
                        <div className="text-2">Rs.{price} x {amount}</div>
                    </div>
                </li>
            })}
        </ul>
    </div>
  )
}

export default History
