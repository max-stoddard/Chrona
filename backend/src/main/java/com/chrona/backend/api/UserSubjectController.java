// backend/src/main/java/com/chrona/backend/api/UserSubjectController.java
package com.chrona.backend.api;

import com.chrona.backend.db.dataAccess.SubjectExamDao;
import com.chrona.backend.db.dataAccess.UserSubjectDao;
import com.chrona.backend.db.models.UserSubject;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
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

    /* ─────────────────────────────  Queries  ───────────────────────────── */

    /** List every subject that belongs to the given user. */
    @GetMapping
    public List<UserSubject> list(@PathVariable UUID userId) {
        return subjectDao.selectAllByUser(userId);
    }

    /** Get one subject plus its exams (pretty view model). */
    @GetMapping("/{subjectId}")
    public SubjectDetailsResponse one(
            @PathVariable UUID userId,
            @PathVariable UUID subjectId) {

        UserSubject subject = subjectDao.select(subjectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        List<ExamDto> exams = examDao.selectAllBySubject(subjectId)
                .stream()
                .map(r -> new ExamDto(
                        r.getExamId(),
                        r.getExamName(),
                        r.getExamDate(),
                        r.getExamDifficulty(),
                        r.getExamConfidence(),
                        r.getExamSecondsSpent()))
                .toList();

        return new SubjectDetailsResponse(
                subject.getSubjectId(),
                subject.getSubjectName(),
                subject.getSubjectSecondsSpent(),
                exams);
    }

    /* ─────────────────────────────  Mutations  ─────────────────────────── */

    /** Create a new subject for the user and return its server-generated UUID. */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreateSubjectResponse create(
            @PathVariable UUID userId,
            @RequestBody SubjectRequest body) {

        UUID subjectId = UUID.randomUUID();
        long seconds   = body.seconds_spent() == null ? 0L : body.seconds_spent();

        subjectDao.insert(new UserSubject(subjectId, userId, body.name(), seconds));
        return new CreateSubjectResponse(subjectId);
    }

    /** Permanently delete the subject by primary key. */
    @DeleteMapping("/{subjectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID subjectId) {
        subjectDao.delete(subjectId);
    }

    /* inbound DTO for create/update */
    public record SubjectRequest(
        String name,
        Long seconds_spent
    ) { }

    /* outbound DTOs */
    public record CreateSubjectResponse(
        UUID subject_id
    ) { }

    public record ExamDto(
        UUID   exam_id,
        String exam_name,
        LocalDate exam_date,
        short exam_difficulty,
        short  exam_confidence,
        long   exam_seconds_spent
    ) { }

    public record SubjectDetailsResponse(
        UUID            subject_id,
        String          subject_name,
        long            subject_seconds_spent,
        List<ExamDto>   exams
    ) { }
}
