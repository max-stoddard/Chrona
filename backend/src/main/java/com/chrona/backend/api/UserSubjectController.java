package com.chrona.backend.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

public class UserSubjectController {

    private WebService<UserSubject> service;

    public List<UserSubject> getAllSubjects() {
        return service.getAll();
    }


    public 

}