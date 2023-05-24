import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { authApi } from '../../APIS/authApi';

export const LoginPage = () => {

  const [user,setUser]=useState({
    email: "",
    password:"",
  });

  const [error,setError]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');

  const onInputChange=(e)=>{
    setUser({
      //con estas 2 lineas de codigo leemos los datos ingresados
      ...user,
      [e.target.name]:e.target.value,
    });
    console.log(e.target.value)
  }

  //al apretar el boton login
  const onSubmit=(e)=>{

    e.preventDefault();
  
    if( 
    user.email.trim()==="" ||  
    user.password.trim()===""){
      setError(true);
      return setErrorMsg("todos los campos son obligatorios");
      
    }
      setError(false);
      console.log(user);
      starLogin(user.email,user.password);
    }

  //funcion que va a ir al back y que va a llamar al login
  const starLogin=async (email,password)=>{
    try {
      const resp=await authApi.post('/auth/new',{
        email,
        password,
      });
      console.log(resp);
      
    } catch (error) {
      console.log(error.response.data.msg);
      setError(true);
      setErrorMsg(error.response.data.msg);
    }

  }


  return (
    <div>
        <h1>Login</h1>
        <Form className='p-3' onSubmit={onSubmit}>
        {error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo Electronico</Form.Label>
        <Form.Control type="email" name='email' placeholder="" value={user.email} onChange={onInputChange}/>
        
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" value={user.password} onChange={onInputChange} />
      </Form.Group>
      
      <Button variant="dark" type="submit">
        Login
      </Button>
    </Form>


    </div>
  )
}
