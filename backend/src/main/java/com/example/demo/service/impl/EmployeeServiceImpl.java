package com.example.demo.service.impl;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor

public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapTOEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapTOEmployeeDto(savedEmployee);

    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exist with this id :"+ employeeId));

        return EmployeeMapper.mapTOEmployeeDto(employee);
    }

    @Override

    public List<EmployeeDto> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();


        return employees.stream().map((employee)-> EmployeeMapper.mapTOEmployeeDto(employee))
                .collect(Collectors.toList());

    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee  = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException(" Employee not found with this employee Id"));

        employee.setFirstname(updatedEmployee.getFirstname());
        employee.setLastname(updatedEmployee.getLastname());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj =  employeeRepository.save(employee);
        return EmployeeMapper.mapTOEmployeeDto(updatedEmployeeObj);

    }

    @Override
    public void deleteEmployee(Long employeeId) {
//        Employee employee = employeeRepository.findById(employeeId)
//                .orElseThrow(() ->
//                        new ResourceNotFoundException("Employee is not exist with this id :"+ employeeId));
        employeeRepository.deleteById(employeeId);
    }


}


