import { useTheme } from '@emotion/react';
import { Typography, Card, CardHeader, CardContent, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useSignupMutation from '../hooks/useSignupMutation';

const SignupContainer = () => {

  const theme = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUsername = (e: React.ChangeEvent<HTMLTextAreaElement>) => setUsername(e.target.value);
  
  const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPassword(e.target.value);

  const signupMutation = useSignupMutation({navigate});

  return (
      <Box sx={{maxWidth: "100%", width: "100%" }}>
        <Box sx={{paddingTop: "10px", textAlign:"center"}}>
          <Typography variant="h4">Signup</Typography>
        </Box>
        <Card sx={{ width: {xs:"85%", sm:"60%", md:"30%", lg:"30%", xl:"20%"}, margin: "auto", marginTop: "100px" }}>
          <Box sx={{display: "flex", justifyContent: "center", backgroundColor: { xs: "red", sm: "orange", md: "green", lg: "blue", xl: "pink" }, }}>
            <CardHeader title="Signup Page"/>
          </Box> 
            <CardContent>
              <form action="">
                <Box sx={{display:"flex", flexDirection:"column"}}>
                  <TextField label="Username" variant="outlined" sx={{paddingBottom: "10px"}} name="username" onChange={onChangeUsername} value={username}/>
                  <TextField label="Password" variant="outlined" sx={{paddingBottom: "10px"}} name="password" onChange={onChangePassword} value={password}/>
                  <Button variant="outlined" sx={{margin: "auto", marginBottom: "10px", marginTop: "10px"}} 
                  onClick={() => { signupMutation.mutate({ username: username, password: password }) } }>Signup</Button> 
                </Box>  
              </form> 
            </CardContent>
        </Card>
      </Box>
  )
}

export default SignupContainer
