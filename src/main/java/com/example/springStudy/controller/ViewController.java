package com.example.springStudy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class ViewController {
    @GetMapping("")
    public String index() {
        return "redirect:/index.html";
    }

    @GetMapping("/student-list")
    public String studentList() {
        return "redirect:/student_list.html";
    }

    @GetMapping("/signup")
    public String signup(){
        return "redirect:/signup.html";
    }
}
