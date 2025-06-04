package com.chrona.backend.db;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usersubjectexams")
public class UserSubjectExamsController {

    private final WebService<UserSubjectExam> service;

    public UserSubjectExamsController(WebService<UserSubjectExam> service) {
        this.service = service;
    }

    @GetMapping
    public List<UserSubjectExam> getSomeSubjects(int count) {
        return service.getSome(count);
    }

    @GetMapping("/{id}")
    public Optional<UserSubjectExam> get(@PathVariable UUID examId) {
        return service.get(examId);
    }

    @PostMapping("/{id}")
    public Boolean insert(@RequestBody UserSubjectExam subject) {
        return service.insert(subject);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable UUID examId) {
        return service.delete(examId);
    }




    
}
