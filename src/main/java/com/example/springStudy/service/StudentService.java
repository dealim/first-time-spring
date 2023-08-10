package com.example.springStudy.service;

import com.example.springStudy.model.Header;
import com.example.springStudy.model.entity.Student;
import com.example.springStudy.myapp.CrudInterface;
import com.example.springStudy.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements CrudInterface<Student> {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Header<Student> create(Header<Student> request) {
        Student student = request.getData();
        studentRepository.save(student);
        return Header.ACK(student);
    }

    @Override
    public Header<Student> read(Integer id) {
        Student student = studentRepository.findById(id).orElse(null);
        return Header.ACK(student);
    }

    @Override
    public Header<Student> update(Header<Student> request) {
        Student student = request.getData();
        studentRepository.save(student);
        return Header.ACK(student);
    }

    @Override
    public Header delete(Integer id) {
        studentRepository.deleteById(id);
        return Header.ACK();
    }
    public Header<List<Student>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return Header.ACK(students);
    }
}
