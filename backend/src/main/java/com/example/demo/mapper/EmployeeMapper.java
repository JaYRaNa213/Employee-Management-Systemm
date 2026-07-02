package com.example.demo.mapper;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapTOEmployeeDto(Employee employee ){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstname(),
                employee.getLastname(),
                employee.getEmail(),
                employee.getDepartment() != null ? employee.getDepartment().getId() : null,
                employee.getEmployeeId(),
                employee.getDesignation(),
                employee.getPhone(),
                employee.getAddress(),
                employee.getProfilePhoto(),
                null
        );
    }

    public  static Employee mapTOEmployee ( EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstname(),
                employeeDto.getLastname(),
                employeeDto.getEmail(),
                employeeDto.getEmployeeId(),
                employeeDto.getDesignation(),
                employeeDto.getPhone(),
                employeeDto.getAddress(),
                employeeDto.getProfilePhoto(),
                null
        );
    }
}
