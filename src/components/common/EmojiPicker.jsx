/*
import {useState,useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const EmojiPicker = (props) => {
  const [selectedEmoji,setSelectedEmoji]=useState('')
  const [isShowPicker,setIsShowPicker]=useState(false);

  useEffect(()=>{
    setSelectedEmoji(props.icon);
  },[props.icon]);

  const selectEmoji=(e)=>{
    const sym =e.unified.split('-');
    let codesArray=[];
    sym.forEach(el=>codesArray.push('0x' +el))
    const emoji =String.fromCodePoint(...codesArray)
    setIsShowPicker(false)
    props.onChange(emoji)
  }
  const showPicker=()=>setIsShowPicker(!showPicker);
  return (
    <Box sx={{position:'relative', width:'max-content'}}>
      <Typography
        variant='h3'
        fontWeight='700'
        sx={{cursor:'pointer'}}
        onClick={showPicker}
      >
        {selectEmoji}
      </Typography>
      <Box sx={{
        display:isShowPicker?'block':'none',
        position:'absolute',
        top:'100%',
        zIndex:'9999'
      }}>
        <Picker theme='dark' onSelect={selectEmoji} showPreview={false}/>
      </Box>

    </Box>
  )
}

export default EmojiPicker*/
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e) => {
    const sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  const togglePicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  const emojiList = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋',
    '😛', '😜', '😝', '🤑', '🤗', '🤓', '😎', '🤡', '🥳', '🥺', '😏', '😶', '😐', '😑', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤',
    '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🥺', '🤩', '😢', '😭', '😤', '😠',
    '😡', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽',
    '🙀', '😿', '😾'
  ];

  return (
    <Box sx={{ position: 'relative', width: 'max-content' }}>
      <Typography
        variant='h3'
        fontWeight='700'
        sx={{ cursor: 'pointer' }}
        onClick={togglePicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          zIndex: '9999',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '10px'
        }}
      >
        {emojiList.map((emoji, index) => (
          <span
            key={index}
            style={{ fontSize: '20px', cursor: 'pointer', margin: '5px' }}
            onClick={() => {
              setSelectedEmoji(emoji);
              setIsShowPicker(false);
              props.onChange(emoji);
            }}
          >
            {emoji}
          </span>
        ))}
      </Box>
    </Box>
  );
};

export default EmojiPicker;

