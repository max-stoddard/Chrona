// backend/src/main/java/com/chrona/backend/api/UserSubjectController.java
package com.chrona.backend.api.controllers;

import com.chrona.backend.api.dtos.CreateSubjectDTO;
import com.chrona.backend.api.dtos.ExamDTO;
import com.chrona.backend.api.dtos.SubjectDetailsDTO;
import com.chrona.backend.api.dtos.SubjectRequestDTO;
import com.chrona.backend.db.daos.SubjectExamDao;
import com.chrona.backend.db.daos.UserSubjectDao;
import com.chrona.backend.db.models.UserSubject;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userId}/subjects")
public class UserSubjectController {

    private final UserSubjectDao subjectDao;
    private final SubjectExamDao  examDao;

    public UserSubjectController(UserSubjectDao subjectDao, SubjectExamDao examDao) {
        this.subjectDao = subjectDao;
        this.examDao    = examDao;
    }

    /** List every subject that belongs to the given user. */
    @GetMapping
    public List<UserSubject> list(@PathVariable UUID userId) {
        return subjectDao.selectAllByUser(userId);
    }

    /** Get one subject plus its exams (pretty view model). */
    @GetMapping("/{subjectId}")
    public SubjectDetailsDTO one(
            @PathVariable UUID userId,
            @PathVariable UUID subjectId) {

        UserSubject subject = subjectDao.select(subjectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        List<ExamDTO> exams = examDao.selectAllBySubject(subjectId)
                .stream()
                .map(r -> new ExamDTO(
                        r.getExamId(),
                        r.getExamName(),
                        r.getExamDate(),
                        r.getExamDifficulty(),
                        r.getExamConfidence(),
                        r.getExamSecondsSpent()))
                .toList();

        return new SubjectDetailsDTO(
                subject.getSubjectId(),
                subject.getSubjectName(),
                subject.getSubjectSecondsSpent(),
                exams);
    }

    /** Create a new subject for the user and return its server-generated UUID. */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreateSubjectDTO create(
            @PathVariable UUID userId,
            @RequestBody SubjectRequestDTO body) {

        UUID subjectId = UUID.randomUUID();
        long seconds   = body.seconds_spent() == null ? 0L : body.seconds_spent();

        subjectDao.insert(new UserSubject(subjectId, userId, body.name(), seconds));
        return new CreateSubjectDTO(subjectId);
    }

    /** Permanently delete the subject by primary key. */
    @DeleteMapping("/{subjectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID subjectId) {
        subjectDao.delete(subjectId);
    }
}
