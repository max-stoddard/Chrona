package com.chrona.backend.api.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrona.backend.db.dataAccess.SubjectRecommendationDao;
import com.chrona.backend.db.models.UserSubject;

@RestController
@RequestMapping("/api/users/{userId}/subjects/recommendation")
public class SubjectRecommendController {

    private final SubjectRecommendationDao  dao;

    public SubjectRecommendController(SubjectRecommendationDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public UserSubject getSubject(@PathVariable UUID userId) {
        return dao.getSubject(userId);
    }
}
