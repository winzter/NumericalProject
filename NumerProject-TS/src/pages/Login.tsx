import React , { useState } from 'react'
import axios from 'axios'
import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Container,
    Button,
  } from '@mantine/core';

function Login() {
    const [loginData , setLoginData] = useState({
      username:"",
      password:""
    })

    const setUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setLoginData((prevState)=>{
        return{
          ...prevState,
          username:e.target.value
        }
      })
    }

    const setPassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setLoginData((prevState)=>{
        return{
          ...prevState,
          password:e.target.value
        }
      })
      
    }

    const submitData = async(e:React.FormEvent<HTMLElement>)=>{
        e.preventDefault()
        await axios.post("http://localhost:5000/login",loginData,{withCredentials: true})
          .then((res)=>{
            console.log(res.data);
            console.log(document.cookie);
            
          })
          .catch((err)=>{
            console.log(err.message);
          })
        console.log("OK");
    }
  return (
    <Container size={420} my={40}>
      <form onSubmit={submitData}>
        <Title align="center">Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Username" placeholder="Doraemon007" required onChange={setUsername}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={setPassword}/>
          {/* <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group> */}
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}

export default Login