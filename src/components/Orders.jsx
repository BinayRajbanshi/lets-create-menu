import React from 'react'
import '../css/orders.css'
import SingleOrderItem from './SingleOrderItem'
import { useGlobalContext } from '../context'
import {AiFillCloseCircle} from 'react-icons/ai'
import Alert from './Alert'
import StripeCheckout from 'react-stripe-checkout'

const Orders = () => {
    const{state:{order , allTotal} , closeOrder , isOrderOpen
  ,handleToken} = useGlobalContext()
    if(order.length === 0){
      return <section className={isOrderOpen? 'orders active': 'orders'}>
        <Alert/>
        <div className="cart-page">
        <div className="close-orders">
               <button onClick={()=>closeOrder()}>
                   <AiFillCloseCircle/>
               </button>
           </div>
          <header>
            <h2>Your Orders</h2>
          </header>
          <p className='order-text'>Your Orders Appear Here. Order Our Delicious Food : )</p>
        </div>
       
      </section>
    }
    else{
  return (
    <section className={isOrderOpen? 'orders active': 'orders'}>
         <Alert/>
         <div className="cart-page">
         <div className="close-orders">
               <button onClick={()=>closeOrder()}>
                   <AiFillCloseCircle/>
               </button>
           </div>
             <header>
               <h2>Your Orders</h2>
             </header>
             {/* Orders Begins */}
             <table className='table'>
               <tr className='header'>
                   <th></th>
                 <th>Food Item</th>
                 <th>PRICE</th>
                 <th>QUANTITY</th>
                 <th></th>
               </tr>
               {order.map((item) => {
                 return <SingleOrderItem key={item.id} {...item} />;
               })}
             </table>

             <footer>
               <hr />
               <div className="cart-total">
                 <h4>Total</h4>
                 <h4>Rs {allTotal}</h4>
               </div>
             </footer>
             <div className="checkout"
           
             >
               <StripeCheckout
               stripeKey="pk_test_51KtE8jCvHjo4Ml4pGaN19gX0g8FBZt5OkypUvg7dPEj0hJhZcpAXup4fK0mgUf7CfcA8IXOdKQRIfnXMNCxLZOJq00bEbn5akT"
               token={handleToken}
              //  converting nrs to usd
               amount = {allTotal / 122}
               />
             </div>
           </div>
        
    </section>
  )
              
}
}
export default Orders
