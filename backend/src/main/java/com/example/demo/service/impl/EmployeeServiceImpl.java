package com.example.demo.service.impl;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Department;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor

public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapTOEmployee(employeeDto);
        
        if (employeeDto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + employeeDto.getDepartmentId()));
            employee.setDepartment(department);
        }

        // Generate email
        String baseEmail = employee.getFirstname().toLowerCase() + "." + employee.getLastname().toLowerCase() + "@faang.com";
        String finalEmail = baseEmail;
        int counter = 2;
        while (userRepository.findByEmail(finalEmail).isPresent()) {
            finalEmail = baseEmail.replace("@faang.com", "") + counter + "@faang.com";
            counter++;
        }
        employee.setEmail(finalEmail);

        // Generate temporary password
        String tempPassword = UUID.randomUUID().toString().substring(0, 8);

        Employee savedEmployee = employeeRepository.save(employee);
        
        // Generate EMP ID
        savedEmployee.setEmployeeId(String.format("EMP%04d", savedEmployee.getId()));
        savedEmployee = employeeRepository.save(savedEmployee);

        // Create linked User account
        User user = new User();
        user.setEmail(finalEmail);
        user.setPassword(passwordEncoder.encode(tempPassword));
        user.setRole(Role.EMPLOYEE);
        user.setFirstLogin(true);
        user.setEmployee(savedEmployee);
        userRepository.save(user);

        EmployeeDto savedDto = EmployeeMapper.mapTOEmployeeDto(savedEmployee);
        savedDto.setGeneratedPassword(tempPassword);
        return savedDto;

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
        
        employee.setDesignation(updatedEmployee.getDesignation());
        employee.setPhone(updatedEmployee.getPhone());
        employee.setAddress(updatedEmployee.getAddress());
        employee.setProfilePhoto(updatedEmployee.getProfilePhoto());

        if (updatedEmployee.getDepartmentId() != null) {
            Department department = departmentRepository.findById(updatedEmployee.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + updatedEmployee.getDepartmentId()));
            employee.setDepartment(department);
        } else {
            employee.setDepartment(null);
        }

        Employee updatedEmployeeObj =  employeeRepository.save(employee);
        return EmployeeMapper.mapTOEmployeeDto(updatedEmployeeObj);

    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exist with this id :"+ employeeId));
        employeeRepository.deleteById(employeeId);
    }


}


