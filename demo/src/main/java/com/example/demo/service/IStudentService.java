package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Student;

public interface IStudentService {

	public Student addStudent(Student student);
	public List<Student> getStudents();
	public Student getStudentId(Long id);
	public Student updateStudent(Student student, Long id);
	void deleteStudent(Long id);
	
}
