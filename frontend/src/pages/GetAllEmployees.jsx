import React, { useEffect } from 'react'
import { useState } from 'react'
import {listEmployees} from '../services/EmployeeService.js'
import { useNavigate } from 'react-router-dom';

import { deleteEmployee } from '../services/EmployeeService.js';
const GetAllEmployees = () => {


  const [employees , setEmployees ] = useState ([]);
  const navigator = useNavigate();

  useEffect(() =>{
    listEmployees().then((response)=>{
      setEmployees(response.data);
    }).catch(error=>{
      console.error(error);
    })


  }, [])

  function addEmployee(){
    navigator('/add-employee');
  }

  function updateEmployee(id){
    navigator(`/update-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
        .then(() => {
            setEmployees(employees.filter(employee => employee.id !== id));
        })
        .catch(error => {
            console.error(error);
        });
}



  return (

    <div className='container' >
     

      <h2 className='text-center'> List of Employees</h2>
       <button className='btn btn-primary mb-2 ' onClick={addEmployee}> Add Employee</button>

      <table className= "table table-striped table-bordered" >
        <thead>
          <tr>
            <th> Employee Id</th>
            <th> Employee First Name</th>
            <th> Employee Last Name</th>
            <th> Employee Email</th>
            <th> Action </th>
          </tr>
        </thead>

        <tbody>
          {
            employees.map(employeeData =>
              <tr key= {employeeData.id}>
                <td>{employeeData.id}</td>
                <td>{employeeData.firstname}</td>
                <td>{employeeData.lastname}</td>
                <td> {employeeData.email}</td>

                <td>
                  <button className='btn btn-info' onClick={() => updateEmployee(employeeData.id)} > Update</button>

                  <button
  className='btn btn-danger'
  onClick={() => removeEmployee(employeeData.id)}style={{marginLeft:'10px'}}
>
  Delete
</button>

                </td>

              </tr>
            )
          }
         
        </tbody>
      </table>
    </div>
  )
}

export default GetAllEmployees