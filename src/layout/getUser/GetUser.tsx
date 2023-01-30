import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useApi } from '../../hooks'
import { setUserFunc } from '../../pages/login/LoginSlice'

const GetUser = () => {
const dispatch = useDispatch()
    const {data,isSuccess} = useApi("user")

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserFunc(data?.data))
        }
    }, [isSuccess])
  return (
    <div></div>
  )
}

export default GetUser