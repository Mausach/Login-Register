import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { authApi } from '../../APIS/authApi';

export const RegisterPage = () => {
  
  const [user,setUser]=useState({
    name:"",
    email: "",
    edad: 0,
    password:"",
    confirmarContraseña:"",
  })
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

  const onSubmit=(e)=>{

  e.preventDefault();

  if(user.name.trim()==="" || 
  user.email.trim()==="" || 
  user.edad < 18 || 
  user.password.trim()==="" || 
  user.confirmarContraseña.trim()=== ""){
    setError(true);
    return setErrorMsg("todos los campos son obligatorios");
    
  }else if(user.password != user.confirmarContraseña){
    setError(true);
    return setErrorMsg("las contraseñas deben ser iguales");
  }
    setError(false);
    console.log(user);
    starRegister(user.name,user.email,user.edad,user.password);
  }

  //funcion que va a ir al back y que guarda el usuario creado
  const starRegister=async (name,email,edad,password)=>{
    try {
      const resp=await authApi.post('/auth',{
        name,
        email,
        edad,
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
        <h1>pagina de Registro</h1>

<Form className='p-3' onSubmit={onSubmit}>
  {error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control type="text" name='name' placeholder="" value={user.nombre} onChange={onInputChange} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo Electronico</Form.Label>
        <Form.Control type="email" name='email' placeholder="" value={user.email} onChange={onInputChange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Edad</Form.Label>
        <Form.Control type="number" name='edad' placeholder="" value={user.edad} onChange={onInputChange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" value={user.password} onChange={onInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control type="password" name='confirmarContraseña' placeholder="Password" value={user.confirmarContraseña} onChange={onInputChange}/>
      </Form.Group>

      
      <Button variant="dark" type="submit" >
        registrarse
      </Button>
    </Form>



    </div>

    
  )
}
