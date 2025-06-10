package com.chrona.backend.api;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrona.backend.db.dataAccess.ExamRecommendationDao;
import com.chrona.backend.db.dataAccess.SubjectReccomendationDao;
import com.chrona.backend.db.models.UserSubject;
import com.chrona.backend.db.models.UserSubjectExam;

@RestController
@RequestMapping("/api/users/{userId}/subjects/{subjectId}/recommendation")
public class ExamReccomendController { 

    private final ExamRecommendationDao dao;

    public ExamReccomendController(ExamRecommendationDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public UserSubjectExam getRecommendedExam(@PathVariable UUID userId, @PathVariable UUID subjectId) {
        return dao.getRecommendedExam(userId, subjectId);
    }

}