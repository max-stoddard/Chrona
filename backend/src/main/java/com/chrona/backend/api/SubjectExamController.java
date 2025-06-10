package com.chrona.backend.api;

import com.chrona.backend.db.dataAccess.SubjectExamDao;
import com.chrona.backend.db.models.UserSubjectExam;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * REST endpoints for exams that belong to a given subject for a specific user.
 *
 * <p><strong>Routes</strong></p>
 * <pre>
 *| Verb  | URI                                                       | Description                      |
 *|-------|-----------------------------------------------------------|----------------------------------|
 *| GET   | /api/users/{userId}/subjects/{subjectId}/exams            | List exams for a subject         |
 *| POST  | /api/users/{userId}/subjects/{subjectId}/exams            | Create exam for subject          |
 *| PUT   | /api/users/{userId}/subjects/{subjectId}/exams/{examId}   | Update existing exam             |
 *| DELETE| /api/users/{userId}/subjects/{subjectId}/exams/{examId}   | Delete exam by examId            |
 * </pre>
 */
@RestController
@RequestMapping("/api/users/{userId}/subjects/{subjectId}/exams")
public class SubjectExamController {

    private final SubjectExamDao dao;

    public SubjectExamController(SubjectExamDao dao) {
        this.dao = dao;
    }

    /** List all exams for the given subject. */
    @GetMapping
    public List<UserSubjectExam> list(@PathVariable UUID subjectId) {
        return dao.selectAllBySubject(subjectId);
    }

    /** Create a new exam for the subject. */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(
            @PathVariable UUID userId,
            @PathVariable UUID subjectId,
            @RequestBody ExamRequest body) {

        UUID examId = UUID.randomUUID();
        UserSubjectExam exam = new UserSubjectExam(
                examId,
                subjectId,
                userId,
                body.name(),
                body.date(),
                body.difficulty(),
                body.confidence(),
                defaultIfNull(body.secondsSpent(), 0L)
        );
        dao.insert(exam);
        return examId;
    }

    /** Update an existing exam. */
    @PutMapping("/{examId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(
            @PathVariable UUID userId,
            @PathVariable UUID examId,
            @RequestBody ExamRequest body) {

        UserSubjectExam exam = new UserSubjectExam(
                examId,
                null,
                userId,
                body.name(),
                body.date(),
                body.difficulty(),
                body.confidence(),
                body.secondsSpent()
        );
        dao.update(exam);
    }

    /** Delete exam by primary key. */
    @DeleteMapping("/{examId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID examId) {
        dao.delete(examId);
    }


    public record ExamRequest(String name,
                              LocalDate date,
                              Short difficulty,
                              Short confidence,
                              Long secondsSpent) { }


    private static <T> T defaultIfNull(T value, T defaultVal) {
        return value != null ? value : defaultVal;
    }
}