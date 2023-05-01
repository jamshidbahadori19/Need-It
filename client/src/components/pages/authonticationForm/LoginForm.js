
import { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Paper,Box,Grid,Typography,createTheme, ThemeProvider} from "@mui/material"
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function LoginForm() {
    const [username,setUserName] = useState("") 
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    
    async function login(e){
        try {
            e.preventDefault()
            let user = {username,password}
            let response = await axios.post("http://localhost:3000/user/login",user);
            if(response.data.msg==="welcome"){
                alert("welcome")
                navigate("/home");
                localStorage.setItem("token", response.data);
                
            }else{
                alert("")
            }
        } catch (error) {
            console.log(error)
        }
  };
  function handleSavingData(){
    return "you saved it"
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" /* noValidate */ onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e)=> setUserName(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=> setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me" onClick={handleSavingData}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/user/signUp'>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginForm;
