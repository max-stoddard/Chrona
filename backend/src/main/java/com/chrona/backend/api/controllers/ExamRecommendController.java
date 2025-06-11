package com.chrona.backend.api.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrona.backend.db.dataAccess.ExamRecommendationDao;
import com.chrona.backend.db.dataAccess.SubjectRecommendationDao;
import com.chrona.backend.db.models.UserSubject;
import com.chrona.backend.db.models.UserSubjectExam;

@RestController
@RequestMapping("/api/users/{userId}/subjects/{subjectId}/recommendation")
public class ExamRecommendController { 

    private final ExamRecommendationDao dao;

    public ExamRecommendController(ExamRecommendationDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public List<UserSubjectExam> getRecommendedExam(@PathVariable UUID userId, @PathVariable UUID subjectId) {
        return dao.getRecommendedExam(userId, subjectId);
    }

}