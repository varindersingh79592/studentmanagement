package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Student;

public interface StudentRpository extends JpaRepository<Student,Long> {
	
	Optional<Student> findByEmail(String emailId);

}
