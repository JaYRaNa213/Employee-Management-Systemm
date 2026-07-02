package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EmployeeDto {

    private Long id;
    private String firstname ;
    private String lastname ;
    private String email;
    private Long departmentId;

    private String employeeId;
    private String designation;
    private String phone;
    private String address;
    private String profilePhoto;
    private String generatedPassword;

}
