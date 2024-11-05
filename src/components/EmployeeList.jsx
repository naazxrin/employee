import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SERVER_URL from '../service/serverURL';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(`${SERVER_URL}/employees`);
    setEmployees(response.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${SERVER_URL}/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-5' >
        <div>
      <h1 className='text-center text-white'>Employee List</h1>
      <table className="table my-5 shadow">
      <thead style={{fontSize:"20px",color:"white"}} >
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
              <Button style={{backgroundColor:"black",border:"black",color:"black"}} ><Link style={{color:"white",textDecoration:"none"}}  to={`/edit/${employee.id}`}>Edit</Link></Button>  
                <Button style={{backgroundColor:"red",border:"black",color:"black",marginLeft:"5px"}} onClick={() => deleteEmployee(employee.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='d-flex justify-content-center'>  
      <Button style={{backgroundColor:"green",border:"none"}}><Link style={{textDecoration:"none",color:"black"}} to="/add">Add Employee</Link></Button>
      </div>
    
      </div>
    </div>
  );
};

export default EmployeeList;