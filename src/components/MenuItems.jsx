import React from 'react'
import '../css/menuItems.css'
import Categories from './Categories'
import { useGlobalContext } from '../context'
import History from './History'

const MenuItems = () => {
  const {state, placeOrder ,removeOrder} = useGlobalContext()

  return (
    <section className='menu-items'>
      <div className="max-width">
        <div className="header">Select What you want to eat</div>
        <Categories/>
        <div className="content" >
          {/* cards */}
          {state.menuItems.map((item)=>{
            const {title , price , image, id } = item
            return <div className="card" key={id}>
            <div className="box">
              <div className="img">
                <img src={image} alt={title} />
                </div>
                <div className="title">{title}</div>
                <div className="price">Rs. {price}</div>
                {state.order.some((item)=>item.id === id) ? (
                  <button 
                  onClick={()=>removeOrder(id)}>
                    Remove Order
                  </button>
                ):(
                  <button
                  onClick={()=> {
                    placeOrder(item)
                  }}
                  >Place Order</button>
                )}
               
            </div>
          </div>
          })}
        </div>
      </div>
      <hr/>
      <History/>
    </section>
  )
}

export default MenuItems
