package com.example.demo.controller;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ResourceBundle;

@CrossOrigin("*")

@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService ;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping

    public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
        List<EmployeeDto> employees = employeeService.getAllEmployees();

        return ResponseEntity.ok(employees);

    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }



   @PutMapping ("{id}")
   public ResponseEntity<EmployeeDto> updateEmployeeDetails ( @PathVariable("id")  Long employeeId,
                                                              @RequestBody EmployeeDto updateEmployee){
        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId,updateEmployee );
        return ResponseEntity.ok(employeeDto);
   }

   @DeleteMapping("{id}")
   public ResponseEntity< String> deleteEmployee ( @PathVariable("id") Long employeeId  ){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok(" Employee Deleted Successfully ");
    }
}
