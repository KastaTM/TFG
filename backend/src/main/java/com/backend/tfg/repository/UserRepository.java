package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	//FROM Table ORDER BY ID DESC LIMIT 1
	@Query(value ="from User r order by id desc")
    List<User> lastUser();
	
}