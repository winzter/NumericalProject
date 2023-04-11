import React from 'react'
import { Group,
    Box,
    Title,
    Center,
    } from '@mantine/core';


interface HeaderText {
    text:String;
}

function Header({text} : HeaderText) {
  return (
    <Box sx={(theme)=>({
        padding: theme.spacing.xl,
    })}>
       <Group position='center'>
           <Center>
               <Title order={1} variant="gradient" color='blue'>{text}</Title>
           </Center>
       </Group>
   </Box>
  )
}

export default Header