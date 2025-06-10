package com.chrona.backend.api;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrona.backend.db.dataAccess.SubjectReccomendationDao;
import com.chrona.backend.db.models.UserSubject;

@RestController
@RequestMapping("/api/users/{userId}/recommendation")
public class SubjectReccomendController {

    private final SubjectReccomendationDao  dao;

    public SubjectReccomendController(SubjectReccomendationDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public UserSubject getSubject(@PathVariable UUID userId) {
        return dao.getSubject(userId);
    }
}
