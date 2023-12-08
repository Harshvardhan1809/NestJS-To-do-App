/* eslint-disable */
import React, {Fragment, useState, useEffect} from 'react'
import { Typography, Card, CardHeader, CardContent, CardActions, Box, TextField, Button, CssBaseline } from '@mui/material';
import {useTheme} from '@mui/material';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from '../utils/queryClient';
import useLoginMutation from "./../hooks/useLoginMutation"
import useCheckSessionQuery from '../hooks/useCheckSessionQuery';

interface LoginFormDataType {
    username: string,
    password: string,
}

const LoginContainer = React.memo(() => {

    const theme = useTheme();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onChangeUsername = (e: React.ChangeEvent<HTMLTextAreaElement>) => setUsername(e.target.value);
    const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPassword(e.target.value);
  
    const loginMutation = useLoginMutation({navigate});

    const checkSessionQuery = useCheckSessionQuery();
    if (checkSessionQuery.isSuccess) return <Navigate to="/"/>

    return (
        <Box sx={{maxWidth: "100%", width: "100%" }}>
          <Box sx={{paddingTop: "10px", textAlign:"center"}}>
            <Typography variant="h4">To-do App Login</Typography>
          </Box>
          <Card sx={{ width: {xs:"85%", sm:"60%", md:"30%", lg:"30%", xl:"20%"}, margin: "auto", marginTop: "100px" }}>
            <Box sx={{display: "flex", justifyContent: "center", backgroundColor: { xs: "red", sm: "orange", md: "green", lg: "blue", xl: "pink" }, }}>
              <CardHeader title="Login Page"/>
            </Box> 
              <CardContent>
                <form action="">
                  <Box sx={{display:"flex", flexDirection:"column"}}>
                    <TextField label="Username" variant="outlined" sx={{paddingBottom: "10px"}} name="username" onChange={onChangeUsername} value={username}/>
                    <TextField label="Password" variant="outlined" sx={{paddingBottom: "10px"}} name="password" onChange={onChangePassword} value={password}/>
                    <Button variant="outlined" sx={{margin: "auto", marginBottom: "10px", marginTop: "10px"}} 
                    onClick={() => { loginMutation.mutate({ username: username, password: password }) } }>Login</Button> 
                  </Box>  
                </form> 
              </CardContent>
          </Card>
        </Box>
    )
})

export default LoginContainer;
