import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBoards } from '../redux/features/boardSlice.js'
import { useNavigate } from 'react-router-dom'
import boardApi from '../api/boardApi.js'
import { useState } from 'react'


const Home = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);

  const createBoard=async()=>{
    setLoading(true)
    try{
      const res=await boardApi.create();
      dispatch(setBoards([res]));//here []
      navigate(`/boards/${res.id}`)
    }catch(err){
      alert(err);
    }finally{
      setLoading(false);
    }
  }
  return (
    <Box sx={{
      height:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
      <LoadingButton
        variant='outlined'
        color='success'
        onClick={createBoard}
        loading={loading}
      >
        Click here to create your first Board
      </LoadingButton>
        
    </Box>
  )
}

export default Home
