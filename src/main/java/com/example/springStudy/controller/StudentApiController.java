package com.example.springStudy.controller;

import com.example.springStudy.model.Header;
import com.example.springStudy.model.entity.Student;
import com.example.springStudy.myapp.CrudInterface;
import com.example.springStudy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentApiController implements CrudInterface<Student> {

    @Autowired
    private StudentService studentService;

    @PostMapping("")
    public Header<Student> create(@RequestBody Header<Student> request) {
        return studentService.create(request);
    }

    @GetMapping("{id}")
    public Header<Student> read(@PathVariable Integer id) {
        return studentService.read(id);
    }

    @PutMapping("")
    public Header<Student> update(@RequestBody Header<Student> request) {
        return studentService.update(request);
    }

    @DeleteMapping("{id}")
    public Header delete(@PathVariable Integer id) {
        return studentService.delete(id);
    }

    @GetMapping("/getlist")
    public Header<List<Student>> getStudentList(){
        return studentService.getAllStudents();
    }
}
