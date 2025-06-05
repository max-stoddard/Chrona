package com.chrona.backend.api;

import com.chrona.backend.db.dataAccess.SubjectExamDao;
import com.chrona.backend.db.dataAccess.UserSubjectDao;
import com.chrona.backend.db.models.UserSubject;
import com.chrona.backend.db.models.UserSubjectExam;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userId}/subjects")
public class UserSubjectController {

    private final UserSubjectDao userSubjectDao;
    private final SubjectExamDao examDao;

    public UserSubjectController(UserSubjectDao userSubjectDao, SubjectExamDao  examDao) {
        this.userSubjectDao = userSubjectDao;
        this.examDao = examDao;
    }

    /**
     * Fetch every subject that belongs to *userId*.
     */
    @GetMapping
    public List<UserSubject> list(@PathVariable UUID userId) {
        return userSubjectDao.selectAllByUser(userId);
    }

    // UserSubjectController.java
    @GetMapping("/{subjectId}")
    public SubjectDetailsResponse one(
            @PathVariable UUID userId,
            @PathVariable UUID subjectId) {

        UserSubject subject = userSubjectDao.select(subjectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        List<UserSubjectExam> rows = examDao.selectAllBySubject(subjectId);

        // convert DB ⇒ API payload
        List<ExamDto> exams = rows.stream()
                .map(r -> new ExamDto(
                        r.getExamName(),
                        r.getExamDate(),
                        switch (r.getExamDifficulty()) {
                            case 0 -> "Easy";
                            case 1 -> "Medium";
                            default -> "Hard";
                        }))
                .toList();

        return new SubjectDetailsResponse(
                subject.getSubjectId(),
                subject.getSubjectName(),
                exams);
    }

    public record ExamDto(String name, LocalDate date, String difficulty) { }

    public record SubjectDetailsResponse(
            UUID subject_id,
            String subject_name,
            List<ExamDto> exams) { }


    /**
     * Insert a new subject for *userId*.
     *
     * @return server‑generated *subjectId* (UUID)
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@PathVariable UUID userId, @RequestBody SubjectRequest body) {
        userSubjectDao.insert(new UserSubject(body.subject_id(), userId, body.name()));
        return body.subject_id;
    }

    /**
     * Permanently delete the subject identified by *subjectId*.
     */
    @DeleteMapping("/{subjectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID subjectId) {
        userSubjectDao.delete(subjectId);
    }

    /** Minimal DTO for subject creation */
    public record SubjectRequest(String name, UUID subject_id) { }
}