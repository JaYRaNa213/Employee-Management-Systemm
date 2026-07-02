package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;

public class UserMapper {
    
    public static UserDto mapToUserDto(User user) {
        return new UserDto(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getRole(),
            user.isFirstLogin(),
            user.getEmployee() != null ? user.getEmployee().getId() : null
        );
    }
    
    public static User mapToUser(UserDto userDto) {
        return new User(
            userDto.getId(),
            userDto.getEmail(),
            userDto.getPassword(),
            userDto.getRole(),
            userDto.isFirstLogin(),
            null
        );
    }
}
