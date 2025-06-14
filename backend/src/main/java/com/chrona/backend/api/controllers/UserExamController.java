package com.chrona.backend.api.controllers;

import com.chrona.backend.db.daos.SubjectExamDao;
import com.chrona.backend.db.models.UserSubjectExam;

import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.List;

/**
 * GET /api/users/{userId}/exams  –  list every exam a user has,
 * across all of their subjects.
 */
@RestController
@RequestMapping("/api/users/{userId}/exams")
public class UserExamController {

    private final SubjectExamDao dao;

    public UserExamController(SubjectExamDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public List<UserSubjectExam> list(@PathVariable UUID userId) {
        return dao.selectAllByUser(userId);
    }
}