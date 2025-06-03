package com.chrona.backend.db;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.*;

@RestController
@RequestMapping("/api/usersubjects")
public class UserSubjectController {

    private final WebService<UserSubject> service;

    public UserSubjectController(WebService<UserSubject> service) {
        this.service = service;
    }

    @GetMapping
    public List<UserSubject> getSomeSubjects(int count) {
        return service.getSome(count);
    }

    @GetMapping("/{id}")
    public Optional<UserSubject> get(@PathVariable UUID subjectID) {
        return service.get(subjectID);
    }

    @PostMapping("/{id}")
    public Boolean insert(@RequestBody UserSubject subject) {
        return service.insert(subject);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable UUID subjectID) {
        return service.delete(subjectID);
    }

}