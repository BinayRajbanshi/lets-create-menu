import React from 'react'
import { useGlobalContext } from '../context'

const Alert = () => {
    const {state:{alert}} = useGlobalContext()
    const {message , style} = alert

  return (
      <p className={`alert ${style}`}>{message}</p>
  )
}

export default Alert
