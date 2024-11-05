import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button,Container } from 'react-bootstrap';
import SERVER_URL from '../service/serverURL';
const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`${SERVER_URL}/employees/${id}`);
      setEmployee(response.data);
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${SERVER_URL}/employees/${id}`, employee);
    navigate('/');
  };

  if (!employee) return null;

  return (
    <Container style={{width:"500px",marginTop:"100px",height:"400px",paddingTop:"60px"}} className='bg-dark rounded'  >
    <form onSubmit={handleSubmit} >
    <h1 className='text-center text-white'>Edit Employee</h1>
      <input type="text" placeholder="Username" name="username" value={employee.username} onChange={handleChange}  style={{borderRadius:"5px",width:"100%",height:"38px",marginTop:"10px"}} />
      <input type="email" name="email" value={employee.email} onChange={handleChange}  style={{borderRadius:"5px",width:"100%",height:"38px",marginTop:"10px"}}/>
      <select name="status"  value={employee.status} onChange={handleChange} style={{borderRadius:"5px",width:"100%",height:"38px",marginTop:"10px"}}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <div className='d-flex justify-content-center'>
      <Button type="submit" style={{borderRadius:"5px",marginTop:"10px",backgroundColor:"darkcyan",border:"none"}}>
        Update Employee</Button>
      </div>
    </form>
    </Container>

   
  );
};

export default EditEmployee;