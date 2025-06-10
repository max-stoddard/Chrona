package com.chrona.backend.api.controllers;

import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrona.backend.db.daos.UserSubjectDao;
import com.chrona.backend.db.models.UserSubject;

@RestController
@RequestMapping("/api/subject/{subjectId}")
public class SubjectController {
  private final UserSubjectDao dao;

  public SubjectController(UserSubjectDao dao) {
    this.dao = dao;
  }

  @GetMapping
  public Optional<UserSubject> list(@PathVariable UUID subjectId) {
    return dao.select(subjectId);
  }
}
