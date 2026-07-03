package com.example.demo.service.impl;

import com.example.demo.dto.DepartmentDto;
import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Department;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.DepartmentMapper;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto addDepartment(DepartmentDto departmentDto) {

        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        department.setCreatedAt(LocalDateTime.now());
        department.setUpdatedAt(LocalDateTime.now());
        Department saveDeparment =  departmentRepository.save(department);


        return DepartmentMapper.mapToDepartmentDto(saveDeparment);
    }

    @Override
    public List<DepartmentDto> getAllDepartment() {


        List<Department> departments =  departmentRepository.findAll();


        return departments.stream().map((department)-> DepartmentMapper.mapToDepartmentDto(department))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {

       Department getDepartment = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("department is not exist with this id :"+ departmentId));

        return DepartmentMapper.mapToDepartmentDto(getDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department does not exist with this id :" + departmentId));
        departmentRepository.delete(department);
    }
}
