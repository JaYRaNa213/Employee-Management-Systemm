package com.example.demo.controller;

import com.example.demo.dto.DepartmentDto;
import com.example.demo.dto.EmployeeDto;
import com.example.demo.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/department")

public class DepartmentController {


    private DepartmentService departmentService ;


    @PostMapping

    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){

         DepartmentDto savedDepartment= departmentService.addDepartment(departmentDto);

        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }

    @GetMapping

    public ResponseEntity<List<DepartmentDto>> getAllDepartments( ){
        List<DepartmentDto> departments = departmentService.getAllDepartment();
        return ResponseEntity.ok(departments);

    }

    @GetMapping ("{id}")
    public ResponseEntity<DepartmentDto> getDepartment(@PathVariable("id") Long departmentId){

        DepartmentDto DepartmentDto = departmentService.getDepartmentById(departmentId);

        return ResponseEntity.ok(DepartmentDto);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId) {
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok("Department deleted successfully");
    }
}
