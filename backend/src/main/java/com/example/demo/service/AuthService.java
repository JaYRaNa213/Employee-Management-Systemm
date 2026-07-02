package com.example.demo.service;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.JwtAuthResponse;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
}
