
import { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Paper,Box,Grid,Typography,createTheme, ThemeProvider} from "@mui/material"
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'This is your site '}{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function LoginForm() {
    const [email,setEmail] = useState("") 
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    
    async function login(e){
        try {
            e.preventDefault()
            let user = {email,password}
            let response = await axios.post("http://localhost:3000/user/login",
            user,
            {
              headers: {
                Authorization:`Bearer ${token}`,
              },
            }
          );
            if(response.data.msg==="welcome"){
              localStorage.setItem("token", response.data.token);
                alert("welcome")
                navigate("/");
                
            }else{
               alert(response.data.msg)
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
      <Grid container component="main" sx={{ height: '100vh' }} padding={4}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-jeans-clothes-fashion-man_158538-5030.jpg?w=2000)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ":hover":{
              transform:"scale(.9)",
              transitionDuration: "0.5s",
            }
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
              ":hover":{
                boxShadow:"10px 10px 10px 10px #ccc",
            },
            }}
            padding={4}
            borderRadius={5}
            boxShadow={"5px 5px 5px 5px #ccc"}
          >
            <Avatar sx={{ m: 1, bgcolor: '#fdf3f2' }}>
              <LockOutlinedIcon  sx={{ m: 1, color: '#0797b4' }}/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e)=> setEmail(e.target.value)}
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
                endIcon={<LoginIcon/>} 
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
