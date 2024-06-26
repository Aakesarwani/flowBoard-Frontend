import React from 'react'
import {useState,useEffect} from 'react'
import {useNavigate,Outlet} from 'react-router-dom'
import authUtils from '../../utils/authUtils.js';
import Loading from "../common/Loading.jsx"
import { Container, Box } from '@mui/material';
import Darklogo from "../../assets/images/darklogo.jpeg"


const AuthLayout = () => {

  const navigate = useNavigate();
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const checkAuth=async()=>{
      const isAuth = await authUtils.isAuthenticated()
      if(!isAuth){
        setLoading(false)
      }else{
        navigate('/')
      }
    }
    checkAuth();
  },[navigate]);

  return (
    loading?(
      <Loading fullHeight/>
    ):(
      <Container component='main' maxWidth='xs'>
        <Box sx={{
          marginTop:8,
          display:'flex',
          alignItems:'center',
          flexDirection:'column'
        }}>
          <img src={Darklogo} style={{width:'100px'}} alt='app logo' />
          <Outlet/>
        </Box>
      </Container>
    )
  )
}

export default AuthLayout
