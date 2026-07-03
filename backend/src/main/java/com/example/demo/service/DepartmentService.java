package com.example.demo.service;

import com.example.demo.dto.DepartmentDto;
import com.example.demo.dto.EmployeeDto;

import java.util.List;

public interface DepartmentService {


    DepartmentDto addDepartment(DepartmentDto departmentDto);


    List<DepartmentDto> getAllDepartment ();
    DepartmentDto getDepartmentById (Long departmentId );
    void deleteDepartment(Long departmentId);

}
