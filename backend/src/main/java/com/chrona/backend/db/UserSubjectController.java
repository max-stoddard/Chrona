package com.chrona.backend.db;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.*;

@RestController
@RequestMapping("/api/usersubjects")
public class UserSubjectController {

    private WebService<UserSubject> service;

    @GetMapping
    public List<UserSubject> getAllSubjects() {
        return service.getAll();
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