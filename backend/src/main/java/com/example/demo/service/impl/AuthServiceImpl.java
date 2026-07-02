package com.example.demo.service.impl;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.JwtAuthResponse;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtTokenProvider;
import com.example.demo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        System.out.println("==============================");
        System.out.println("[DEBUG] Login attempt started");
        System.out.println("[DEBUG] Email received: " + loginDto.getEmail());
        System.out.println("[DEBUG] Password received (length): " + (loginDto.getPassword() != null ? loginDto.getPassword().length() : "null"));

        // Step 1: Check if user exists in DB
        Optional<User> userCheck = userRepository.findByEmail(loginDto.getEmail());
        if (userCheck.isEmpty()) {
            System.out.println("[DEBUG] FAIL: No user found with email: " + loginDto.getEmail());
        } else {
            System.out.println("[DEBUG] OK: User found in DB. Role: " + userCheck.get().getRole());
            System.out.println("[DEBUG] Stored hashed password: " + userCheck.get().getPassword());
        }

        // Step 2: Authenticate via Spring Security
        Authentication authentication;
        try {
            System.out.println("[DEBUG] Attempting AuthenticationManager.authenticate()...");
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
            System.out.println("[DEBUG] OK: Authentication successful for: " + authentication.getName());
        } catch (BadCredentialsException ex) {
            System.out.println("[DEBUG] FAIL: BadCredentialsException - " + ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            System.out.println("[DEBUG] FAIL: Unexpected Exception - " + ex.getClass().getName() + ": " + ex.getMessage());
            throw ex;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Step 3: Generate JWT
        String token = jwtTokenProvider.generateToken(authentication);
        System.out.println("[DEBUG] OK: JWT generated successfully");
        System.out.println("==============================");

        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        JwtAuthResponse authResponse = new JwtAuthResponse();
        authResponse.setAccessToken(token);
        authResponse.setRole(user.getRole().name());
        authResponse.setFirstLogin(user.isFirstLogin());
        if (user.getEmployee() != null) {
            authResponse.setEmployeeId(user.getEmployee().getId());
        }

        return authResponse;
    }
}
