package com.chrona.backend.api.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrona.backend.db.dataAccess.SubjectRecommendationDao;
import com.chrona.backend.db.models.UserSubject;

@RestController
@RequestMapping("/api/users/{userId}/subjects/recommendation")
public class SubjectRecommendController {

    private final SubjectRecommendationDao dao;

    public SubjectRecommendController(SubjectRecommendationDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public ResponseEntity<UserSubject> getSubject(@PathVariable UUID userId) {
        UserSubject subject = dao.getSubject(userId);
        
        if (subject == null) {
            // No subjects with future exams found - return 404
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(subject);
    }
}