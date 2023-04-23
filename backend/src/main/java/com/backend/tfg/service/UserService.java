package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.User;
import com.backend.tfg.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	
	public UserService(UserRepository ur) {
		this.userRepository = ur;
	}
	
	public List<User> lastUser() {
		return userRepository.lastUser();
	}
	
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	public User save(User user) {
		return userRepository.save(user);
	}
	
	public Optional<User> findById(Long userId) {
		return userRepository.findById(userId);
	}
	
	public void delete(User user) {
		userRepository.delete(user);
	}
	
}
