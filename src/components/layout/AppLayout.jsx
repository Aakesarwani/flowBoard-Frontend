import {useState,useEffect} from 'react'
import {useNavigate,Outlet} from 'react-router-dom'
import authUtils from '../../utils/authUtils.js';
import { useDispatch } from 'react-redux';
import Loading from "../common/Loading.jsx"
import { Box } from '@mui/material';
import Sidebar from "../common/Sidebar.jsx"
import { setUser } from '../../redux/features/userSlice.js';

const AppLayout = () => {

  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const checkAuth=async()=>{
      const user = await authUtils.isAuthenticated()
      if(!user){
        navigate('/login')
      }else{
        dispatch(setUser(user))
        setLoading(false)
      }
    }
    checkAuth();
  },[navigate]);

  return (
    loading?(
      <Loading fullHeight/>
    ):(
      <Box sx={{
        display:'flex'
      }}>
        <Sidebar/>
        <Box sx={{
          flexGrow:1,
          p:1,
          width:'max-content'
        }}>
          <Outlet/>
        </Box>
      </Box>
    )
  )
}

export default AppLayout
