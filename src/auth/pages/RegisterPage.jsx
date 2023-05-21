import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const RegisterPage = () => {
  
  const [user,setUser]=useState({
    nombre:"",
    email: "",
    edad: 0,
    contraseña:"",
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
  if(user.nombre.trim()==="" || 
  user.email.trim()==="" || 
  user.edad < 18 || 
  user.contraseña.trim()==="" || 
  user.confirmarContraseña.trim()=== ""){
    return setErrorMsg("todos los campos son obligatorios");
    return setError(true);
  }else if(user.contraseña != user.confirmarContraseña){
    return setErrorMsg("las contraseñas deben ser iguales");
  }
    setError(false);
    console.log(user);
  }
  
  
  
  return (
    <div>
        <h1>pagina de Registro</h1>

<Form className='p-3' onSubmit={onSubmit}>
  {error ? <p className='bg-danger w-100 text-center p-4 text-white fs-5'>{errorMsg}</p>:''}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control type="text" name='nombre' placeholder="" value={user.nombre} onChange={onInputChange} />
        
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
        <Form.Control type="password" name='contraseña' placeholder="Password" value={user.contraseña} onChange={onInputChange}/>
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
