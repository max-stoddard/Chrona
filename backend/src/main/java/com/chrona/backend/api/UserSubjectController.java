package com.chrona.backend.api;

import com.chrona.backend.db.dataAccess.UserSubjectDao;
import com.chrona.backend.db.models.UserSubject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userId}/subjects")
public class UserSubjectController {

    private final UserSubjectDao dao;

    public UserSubjectController(UserSubjectDao dao) {
        this.dao = dao;
    }

    /**
     * Fetch every subject that belongs to *userId*.
     */
    @GetMapping
    public List<UserSubject> list(@PathVariable UUID userId) {
        return dao.selectAllByUser(userId);
    }

    /**
     * Insert a new subject for *userId*.
     *
     * @return server‑generated *subjectId* (UUID)
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UUID create(@PathVariable UUID userId, @RequestBody SubjectRequest body) {
        dao.insert(new UserSubject(body.subject_id(), userId, body.name()));
        return body.subject_id;
    }

    /**
     * Permanently delete the subject identified by *subjectId*.
     */
    @DeleteMapping("/{subjectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID subjectId) {
        dao.delete(subjectId);
    }

    /** Minimal DTO for subject creation */
    public record SubjectRequest(String name, UUID subject_id) { }
}