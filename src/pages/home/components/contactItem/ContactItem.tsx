import { Button, MenuItem } from '@mui/material'
import React from 'react'
import { ContactItemContainer } from '../ContactItem.style'
import {AiOutlineEdit} from "react-icons/ai"
import {MdDelete} from 'react-icons/md'
// @ts-ignore
import img from '../../../../assets/images/user.jpg'
import { useDispatch } from 'react-redux'
import { changeStatusFunc } from '../../../../layout/header/components/HeaderSlice'
const ContactItem = () => {

  const dispatch = useDispatch()
  return (
    <ContactItemContainer>
      <div className='contact-info'>
        <img src={img} alt="user-images" />
        <div>
        <h3>Shaxzod Muradov</h3>
        <h4>+998901020440</h4>
        </div>

      </div>

      <div className='contact-item-actions'>
        <MenuItem onClick={() => dispatch(changeStatusFunc())} sx={{color: "#999", justifyContent:"center"}}>
          <AiOutlineEdit style={{fontSize: "28px"}} />
        </MenuItem>
        <MenuItem sx={{color: "darkRed", justifyContent:"center"}}>
          <MdDelete style={{fontSize: "28px"}} />
        </MenuItem>
      </div>

      <div className='relationship'>
        friend
      </div>
    </ContactItemContainer>
  )
}

export default ContactItem