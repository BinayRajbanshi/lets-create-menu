import {createContext , useContext , useReducer , useEffect , useState} from 'react'
import allMenuData from './data'
import {reducer} from './reducer'

const AppContext = createContext()

// getting orders from local storage
const getLocalStorage = () =>{
    let orders = localStorage.getItem('orders')
    if(orders){
        return JSON.parse(localStorage.getItem('orders'))
    }
    else{
        return []
    }
}

// getting orders history from local storge
const getOrderHistory = () => {
    let orderHistory = localStorage.getItem('orderHistory')
    if(orderHistory){
        return JSON.parse(localStorage.getItem('orderHistory'))
    }
        else{return null}
}

//getting unique category of food item to setUp filter button dynamically 
    const uniqCategory = ['all' , ...new Set(allMenuData.map((item)=>item.category))]

const AppProvider = ({children}) => {

    const defaultState = {
        menuItems : allMenuData, 
        category:uniqCategory ,
        order : getLocalStorage() ,
        alert:{
            message : '' ,
            alertState : false ,
            style : ''
        },
        loading:false,
        quantity:0 ,
        allTotal: 0,
        orderHistory:getOrderHistory()

    }
    const[state , dispatch] = useReducer(reducer , defaultState)

    // functions 
    const placeOrder = (menuItem) => {
        dispatch({type:'PLACE_ORDER' , payload:menuItem})
    }
    const removeOrder = (id) => {
        dispatch({type:'REMOVE_ORDER' , payload:id})
    }
    const increase = (id) => {
        dispatch({type:'INCREASE', payload:id} )
    }
    const decrease =(id) => {
        dispatch({type:'DECREASE' , payload:id})
    }

        // REMOVING ALERT AFTER 2.4SEC
        useEffect(()=>{
          const timeOut =  setTimeout(()=>{
                dispatch({type:'REMOVE_ALERT'})
            } , 2400)
            return ()=> clearTimeout(timeOut)
        },[state.order])

    // open and close order page
    const[isOrderOpen , setIsOrderOpen] = useState(false)
    const openOrder = () => {
        setIsOrderOpen(true)
    }
    const closeOrder = () =>{
        setIsOrderOpen(false)
    }

    // claculating total amount
    const getTotal = () => {
        dispatch({type:'GET_TOTAL'})
    }
    useEffect(()=>{
        getTotal()
    },[state.order])

    // handling stripe payment dummy
    const handleToken = (token) => {
        if(token){
            dispatch({type:'TOKEN' })
            dispatch({type:'ADD_HISTORY'})
        }
    }
    // Setting up local storage
    useEffect(()=>{
        dispatch({type:'ADD_LOCAL_STORAGE'})
    } , [state.order])

    // adding filter menuItems functionality
    const filterMenuItems = (category) => {
        dispatch({type:'FILTER_MENU_ITEMS', payload:category , allData:allMenuData})   
    }

    return <AppContext.Provider
    value={{state ,
        // functions
        placeOrder,
        removeOrder,
        increase ,
        decrease,
        filterMenuItems,

        // order page toggle functionality
        isOrderOpen,
        openOrder,
        closeOrder,
        handleToken
        
    }}
    >
        {children}
    </AppContext.Provider>
}

// custom hook for using the global context
const useGlobalContext = () => {
    return useContext(AppContext)
}

export {useGlobalContext , AppProvider}