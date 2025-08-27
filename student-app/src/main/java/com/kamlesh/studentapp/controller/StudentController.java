/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.kamlesh.studentapp.controller;

import com.kamlesh.studentapp.model.Student;
import com.kamlesh.studentapp.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173") // allow React dev server
public class StudentController {

  @Autowired
  private StudentRepository repo;

  @GetMapping
  public List<Student> all() {
    return repo.findAll();
  }

  @PostMapping
  public Student create(@RequestBody Student s) {
    return repo.save(s);
  }
  
   @GetMapping("/{searchId}")
  public Optional<Student> search(@PathVariable("searchId") Long searchId) {
    System.out.print("hello "+searchId);
    return  repo.findById(searchId);
  }

  @PutMapping("/{id}")
  public Student update(@PathVariable("id") Long id, @RequestBody Student s) {
    s.setId(id);
    return repo.save(s);
  }

   @DeleteMapping("/{id}")
  public void delete(@PathVariable("id") Long id) {
   
    repo.deleteById(id);
  }
}
