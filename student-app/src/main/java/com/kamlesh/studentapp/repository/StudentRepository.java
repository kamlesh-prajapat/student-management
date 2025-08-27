/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.kamlesh.studentapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kamlesh.studentapp.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {}

