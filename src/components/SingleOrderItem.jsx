import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { useGlobalContext } from '../context'


const SingleOrderItem = ({title , image , price , amount ,id}) => {
    const {removeOrder ,
      increase,
      decrease,
    } = useGlobalContext()
  return (<>
  {/* order */}
    <tr>
      <td className='table-img'>
        <img src={image} alt={title} />
      </td>
      <td className="product">
          {title}
      </td>
      <td className='price'>
          Rs. {price}
      </td>
      <td>
      <button className='change-btn'
        onClick={()=>decrease(id)}
      >-</button>
        {amount}
        <button className='change-btn'
        onClick={()=>increase(id)}
        >+</button>
      </td>
      <td>
      <button className='remove-btn' onClick={()=>removeOrder(id)}>
          <AiFillDelete/>
      </button>
    </td>
    </tr>

    </>
  )
}

export default SingleOrderItem

