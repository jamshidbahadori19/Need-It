

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Paper,Box,Grid,Typography,createTheme, ThemeProvider} from "@mui/material"
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
/* import PasswordStrengthBar from 'react-password-strength-bar'; */
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import PostRegisterData from "./PostRegisterData";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function AuthenticationForm() {
  const emailPattern= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    reset({
      email: "",
      password: "",
    });
    await PostRegisterData(userData,emailPattern);
   /*    navigate("/user/login") */
    
  };

  
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
            backgroundImage: 'url(https://img.freepik.com/free-photo/sensual-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-blue-studio-background-holding-trendy-handbag_285396-2929.jpg?w=2000)',
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
            <Avatar sx={{ m: 1, bgcolor: '#f6dcd9' }}>
              <LockOutlinedIcon sx={{ m: 1, color: '#0186b9' }} />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>

              < TextField
                margin="normal"
                required
                fullWidth
                type='email'
                name='email'
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: emailPattern,
                    message: "Please enter a valid email.",
                  },
            })}
              />
              {errors.email && <p className='errorMsg' style={{color:"red"}}>{errors.email.message}</p>}
              <TextField 
              margin="normal"
              required
              fullWidth
              type='password'
              name='password'
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 5 characters.",
              },
            })}
            />
            {errors.password && (
            <p className='errorMsg' style={{color:"red"}}>{errors.password.message}</p>
            )}
              {/* <PasswordStrengthBar password={password} /> */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                endIcon ={<HowToRegTwoToneIcon/>}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/user/login'>
                    You already have an account? Login
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

export default AuthenticationForm;
