package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.StudentAlreadyExistsException;
import com.example.demo.model.Student;
import com.example.demo.service.IStudentService;

@CrossOrigin("http://localhost:3000")
@RestController
public class StudentController {

	@Autowired
	IStudentService studentService;
	@GetMapping("/students")
	public ResponseEntity<List<Student>> getStudents(){
		return new ResponseEntity<>(studentService.getStudents(),HttpStatus.OK);
	}
	@PostMapping("/add")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) {
		try {
		return new  ResponseEntity<>(studentService.addStudent(student),HttpStatus.CREATED);
		}
		catch(StudentAlreadyExistsException s){
			return new ResponseEntity<>(HttpStatus.CONFLICT);
			
		}
		catch(Exception e){
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}
	@GetMapping("/get/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
		return new  ResponseEntity<>(studentService.getStudentId(id),HttpStatus.OK);
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student,@PathVariable Long id) {
		return new  ResponseEntity<>(studentService.updateStudent(student,id),HttpStatus.CREATED);
	}
	@DeleteMapping("/delete/{id}")
	public void deleteStudent(@PathVariable Long id) {
		 studentService.deleteStudent(id);
	}
	
	
}
