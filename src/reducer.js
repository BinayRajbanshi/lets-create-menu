const getLocalStorage = () =>{
    let orders = localStorage.getItem('orders')
    if(orders){
        return JSON.parse(localStorage.getItem('orders'))
    }
    else{
        return []
    }
}

export const reducer = (state , action) => {

    // function to prevent setting alert repeatedly
    const setAlert  = (message = '', alertState = false , style = '' ) => {
        return {message , alertState , style}
    }
    // place order
    if(action.type==='PLACE_ORDER'){
        let changeOrder = [...state.order ,{...action.payload}]
        return {...state , order:changeOrder , alert:setAlert(`Order Placed. Open "My Orders" to confirm. ` , true , 'success')}
    }
    // remove alert
    if(action.type==='REMOVE_ALERT'){
        return {...state , alert:setAlert('' , false , '')}
    }
    // remove order
    if(action.type==='REMOVE_ORDER'){
        let changeOrder = state.order.filter((orderedItem)=>orderedItem.id !== action.payload)
        return {...state , order: changeOrder , alert:setAlert('Order Cancelled' , true , 'danger') }
    }
    // increase quantity
    if(action.type==='INCREASE'){
        let changeOrder = state.order.map((orderedItem)=>{
            console.log('clicked')
            if(orderedItem.id === action.payload){
                return {...orderedItem , amount : orderedItem.amount + 1}
            }
            return orderedItem
        })
        return{...state , order:changeOrder}
    }
    // decrease quantity
    if(action.type==='DECREASE'){
        let changeOrder = state.order.map((orderedItem)=>{
            if(orderedItem.id === action.payload){
                return {...orderedItem , amount: orderedItem.amount - 1}
            }
            return orderedItem
        }).filter((item)=>item.amount !== 0)

        return {...state, order:changeOrder }
    }
    // calculate total
   if(action.type==='GET_TOTAL'){
       const {getQuantity , allTotal} = state.order.reduce((total , order)=>{
            const {price , amount} = order
            total.getQuantity += amount
            total.allTotal += (price * amount)
            return total
       } , {
           getQuantity: 0 ,
           allTotal: 0
       })
       return {...state , quantity:getQuantity , allTotal:allTotal}
   }
    // clearing bill after payment
   if(action.type === 'TOKEN'){
     return {...state , alert:setAlert('Payment Sucessful. Orders will be placed ASAP' , true , 'success') , order:[]}
   }
//    setting up local storage
   if(action.type==='ADD_LOCAL_STORAGE'){
       localStorage.setItem('orders' , JSON.stringify(state.order))
    }
    // setting up order history
    if(action.type === 'ADD_HISTORY'){
        localStorage.setItem('orderHistory' , JSON.stringify(getLocalStorage())) 
   }

  // setting up function to filter menuItems 
    if(action.type === 'FILTER_MENU_ITEMS'){
        const filterMenu = () =>{
            if(action.payload === 'all') {
                return action.allData
            }
            return action.allData.filter((item) => item.category === action.payload)
        }
        return {...state, menuItems:filterMenu()}
    }
    return state
}