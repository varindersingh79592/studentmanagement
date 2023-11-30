package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.StudentAlreadyExistsException;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRpository;
import com.example.demo.service.exception.StudentNotFoundException;

@Service
public class StudentService implements IStudentService {
     
	@Autowired
	StudentRpository studentRepository;
	@Override
	public Student addStudent(Student student) {
		if(studentAlreadyExists(student.getEmail())) {
			throw new StudentAlreadyExistsException(student.getEmail()+" already exists");	
		}
	return studentRepository.save(student);
	}	

	@Override
	public List<Student> getStudents() {
	return studentRepository.findAll();
	}

	@Override
	public Student getStudentId(Long id) {
		return studentRepository.findById(id).orElseThrow(()->
			new StudentNotFoundException("no student found with id"+id)
		);
	}

	@Override
	public Student updateStudent(Student student, Long id) {
		return studentRepository.findById(id).map(stu->{
			stu.setFirstName(student.getFirstName());
			stu.setLastName(student.getLastName());
			stu.setDepartment(student.getDepartment());
			return studentRepository.save(stu);
		}).orElseThrow(()-> new StudentNotFoundException("Sorry this student could not be found"));

	}

	@Override
	public void deleteStudent(Long id) {
		if(studentRepository.existsById(id)) {
			studentRepository.deleteById(id);
		}
		else {
				throw new StudentNotFoundException("Sorry this student could not be found");
		}
		
	}
	public  boolean studentAlreadyExists(String emailId) {
		return studentRepository.findByEmail(emailId).isPresent();
	}

}
