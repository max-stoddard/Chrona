package com.chrona.backend.api;

import com.chrona.backend.db.dataAccess.UserSessionDao;
import com.chrona.backend.db.models.UserSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class SessionController {

    private final UserSessionDao dao;

    public SessionController(UserSessionDao dao) {
        this.dao = dao;
    }

    @PostMapping("/sessions")
    @ResponseStatus(HttpStatus.CREATED)
    public StartSessionResponse start(@RequestBody StartSessionRequest body) {
        UUID sessionId = dao.insert(body.userId(), body.subjectId(), body.examId(), body.startedAt());
        return new StartSessionResponse(sessionId);
    }

    @PutMapping("/sessions/{sessionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void finish(@PathVariable UUID sessionId, @RequestBody FinishSessionRequest body) {
        dao.updateFinish(sessionId, body.endedAt(), body.secondsSpent());
    }

    @GetMapping("/users/{userId}/sessions")
    public List<UserSession> recent(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "5") int limit)
    {
        return dao.selectRecentByUser(userId, limit);
    }

    // DTOs
    public record StartSessionRequest(UUID userId, UUID subjectId, UUID examId, Instant startedAt) {}
    public record StartSessionResponse(UUID sessionId) {}
    public record FinishSessionRequest(Instant endedAt, int secondsSpent) {}
}