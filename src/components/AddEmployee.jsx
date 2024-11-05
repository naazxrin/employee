import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button,Container } from 'react-bootstrap';
import SERVER_URL from '../service/serverURL';
const AddEmployee = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email) {
      alert("Username and email are required!");
      return;
    }
    await axios.post(`${SERVER_URL}/employees`, { username, email, status });
    navigate('/');
  };
  return (
    <Container style={{width:"500px",marginTop:"100px",height:"400px",paddingTop:"60px"}} className='bg-black d-flex justify-content-center align-items-center rounded'>
    <form onSubmit={handleSubmit}>
    <h1 className='text-center text-primary fw-bolder p-3 '>ADD EMPLOYEE</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required  style={{borderRadius:"5px",width:"100%",height:"38px",marginTop:"10px"}} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required  style={{borderRadius:"5px",width:"100%",height:"38px",marginTop:"10px"}}/>
      <select value={status} name='status' placeholder="status" onChange={(e) => setStatus(e.target.value)} style={{borderRadius:"5px",width:"100%",height:"38px",marginTop:"10px"}}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    <div className='d-flex justify-content-center'>
    <Button  type="submit" style={{borderRadius:"5px",marginTop:"10px",backgroundColor:"darkcyan",border:"none"}}>Add Employee</Button>
    </div>
    </form>
    </Container>
     );
};

export default AddEmployee;