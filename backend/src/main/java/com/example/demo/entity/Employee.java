package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "employees")
public class Employee {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(name= "First Name")
    private String firstname;
//    @Column(name="Last Name")
    private String lastname ;

//    @Column(name = " EMail", nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String employeeId;

    private String designation;
    private String phone;
    private String address;
    private String profilePhoto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

}
