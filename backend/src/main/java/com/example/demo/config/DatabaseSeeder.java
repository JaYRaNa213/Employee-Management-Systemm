package com.example.demo.config;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("==============================");
        System.out.println("[DEBUG] DatabaseSeeder: Checking if admin exists...");
        boolean exists = userRepository.findByEmail("admin@faang.com").isPresent();
        System.out.println("[DEBUG] DatabaseSeeder: admin@faang.com exists in DB = " + exists);

        if (!exists) {
            User admin = new User();
            admin.setEmail("admin@faang.com");
            String encoded = passwordEncoder.encode("admin123");
            admin.setPassword(encoded);
            admin.setRole(Role.ADMIN);
            admin.setFirstLogin(false);
            userRepository.save(admin);
            System.out.println("[DEBUG] DatabaseSeeder: Admin created.");
        } else {
            User admin = userRepository.findByEmail("admin@faang.com").get();
            admin.setPassword(passwordEncoder.encode("admin123"));
            userRepository.save(admin);
            System.out.println("[DEBUG] DatabaseSeeder: Admin exists, password reset to 'admin123'.");
        }

        // Seed demo employee user
        java.util.Optional<User> empOpt = userRepository.findByEmail("karan.rana@faang.com");
        if (empOpt.isEmpty()) {
            User emp = new User();
            emp.setEmail("karan.rana@faang.com");
            emp.setPassword(passwordEncoder.encode("12345678"));
            emp.setRole(Role.EMPLOYEE);
            emp.setFirstLogin(false);
            userRepository.save(emp);
            System.out.println("[DEBUG] DatabaseSeeder: Demo employee 'karan.rana@faang.com' created.");
        } else {
            User emp = empOpt.get();
            emp.setPassword(passwordEncoder.encode("12345678"));
            userRepository.save(emp);
            System.out.println("[DEBUG] DatabaseSeeder: Demo employee exists, password reset to '12345678'.");
        }
        System.out.println("==============================");
    }
}
