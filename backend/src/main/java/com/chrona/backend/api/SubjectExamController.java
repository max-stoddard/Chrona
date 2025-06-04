package com.chrona.backend.api;

import com.chrona.backend.db.dataAccess.SubjectExamDao;
import com.chrona.backend.db.models.UserSubjectExam;
import com.chrona.backend.db.models.UserSubjectExam;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * REST endpoints for exams that belong to a given *subject*.
 *
 * **Routes**
 * | Verb | URI                                        | Description                         |
 * |------|--------------------------------------------|-------------------------------------|
 * | GET  | /api/subjects/{subjectId}/exams            | List all exams for a subject        |
 * | POST | /api/subjects/{subjectId}/exams            | Create exam for subject             |
 * | PUT  | /api/subjects/{subjectId}/exams/{examId}   | Update existing exam                |
 * | DELETE| /api/subjects/{subjectId}/exams/{examId}  | Delete exam by *examId*             |
 */
@RestController
@RequestMapping("/api/subjects/{subjectId}/exams")
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
    public UUID create(@PathVariable UUID subjectId, @RequestBody ExamRequest body) {
        UUID examId = UUID.randomUUID();
        UserSubjectExam exam = new UserSubjectExam(
                examId,
                subjectId,
                body.name(),
                body.date(),
                body.difficulty()
        );
        dao.insert(exam);
        return examId;
    }

    /** Update an existing exam. */
    @PutMapping("/{examId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable UUID examId, @RequestBody ExamRequest body) {
        UserSubjectExam exam = new UserSubjectExam(
                examId,
                null, // subjectId unchanged
                body.name(),
                body.date(),
                body.difficulty()
        );
        dao.update(exam);
    }

    /** Delete exam by primary key. */
    @DeleteMapping("/{examId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID examId) {
        dao.delete(examId);
    }

    /** Minimal DTO for exam create/update */
    public record ExamRequest(String name, LocalDate date, short difficulty) { }
}