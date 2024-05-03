import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Drawer, IconButton, ListItem, Box,List,Typography, ListItemButton} from '@mui/material'
import assets from '../../assets/asset.js'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined.js'
import boardApi from '../../api/boardApi.js'
import {setBoards} from "../../redux/features/boardSlice.js"
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import FavouriteList from './FavouriteList.jsx'

const Sidebar = () => {

  const user=useSelector((state)=>state.user.value);
  const boards= useSelector((state)=>state.board.value)
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {boardId}=useParams()
  const [activeIndex,setActiveIndex]=useState(0)
  const SidebarWidth=250;


  useEffect(()=>{
    const getBoards=async()=>{
      try{
        const res=await boardApi.getAll();
        dispatch(setBoards(res))
        
      }catch(err){
        alert(err);
      }
    }
    getBoards()
  },[dispatch])

  useEffect(()=>{
    /*
    const activeItem=boards.findIndex(e => e.id===boardId);
    if(boards.length> 0 && boardId==='undefined'){
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
    //updateActive(boards)*/
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`);
    } else {
      const activeItem = boards.findIndex(e => e.id === boardId);
      setActiveIndex(activeItem);
    }
  },[boards,boardId,navigate])

  
  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/login');
  }

  const onDragEnd=async({source,destination})=>{
    const newList=[...boards];
    const [removed]=newList.splice(source.index,1)
    newList.splice(destination.index,0 ,removed)

    const activeItem = newList.findIndex(e => e.id===boardId)
    setActiveIndex(activeItem);
    dispatch(setBoards(newList))

    try{
      await boardApi.updatePosition({boards:newList})
    }catch(err){
      alert(err)
    }
  }

  const addBoard=async()=>{
    try{
      const res=await boardApi.create();
      const newList = [res,...boards]
      dispatch(setBoards(newList))
      navigate(`/boards/${res.id}`)
    }catch(err){
      alert(err)
    }
  }
  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width:SidebarWidth,
        height:'100vh',
        '& > div':{borderRight:'none' }
      }}
    >
      <List
        disablePadding
        sx={{
          width:SidebarWidth,
          height:'100vh',
          backgroundColor:assets.colors.secondary
        }}
      >
        <ListItem>
          <Box sx={{
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Typography variant='body2' fontWeight='700'>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize='small'/>
            </IconButton>
          </Box>
        </ListItem>

        <Box sx={{paddingTop:'10px'}}/>

        <FavouriteList/>

        <Box sx={{paddingTop:'10px'}}/>

        <ListItem>
          <Box sx={{
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Typography variant='body2' fontWeight='700'>
              Private
            </Typography>
            <IconButton onClick={addBoard} >
              <AddBoxOutlinedIcon fontSize='small'/>
            </IconButton>
          </Box>
        </ListItem>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable'} droppableId={'list-board-droppable'}>
            {(provided)=>(
              <div   {...provided.droppableProps} ref={provided.innerRef}>
                {
                  Array.isArray(boards) && boards.map((item,index)=>(
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <ListItemButton
                          selected={index === activeIndex}
                          component={Link}
                          to={`/boards/${item.id}`}
                          sx={{
                            pl: '20px',
                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                          }}
                          >
                            <Typography variant='body2' fontWeight='700' sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.icon} {item.title}
                            </Typography>
                          </ListItemButton>
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </DragDropContext>

      </List>

    </Drawer>
  )
}

export default Sidebar
