package com.example.demo.mapper;

import com.example.demo.dto.DepartmentDto;
import com.example.demo.entity.Department;

public class DepartmentMapper {

    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentCode(),
                department.getDepartmentDescription(),
                department.getCreatedAt(),
                department.getUpdatedAt()
        );

    }
    public static Department mapToDepartment(DepartmentDto departmentDto) {

        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentCode(),
                departmentDto.getDepartmentDescription(),
                departmentDto.getCreatedAt(),
                departmentDto.getUpdatedAt()
        );

    }
}
