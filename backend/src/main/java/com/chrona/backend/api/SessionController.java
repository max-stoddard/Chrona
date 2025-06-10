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
        UUID sessionId = dao.insert(
                body.user_id(),
                body.subject_id(),
                body.exam_id(),
                body.started_at());
        return new StartSessionResponse(sessionId);
    }

    @PutMapping("/sessions/{sessionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void finish(@PathVariable UUID sessionId,
                       @RequestBody FinishSessionRequest body) {
        dao.updateFinish(
                sessionId,
                body.ended_at(),
                body.seconds_spent(),
                defaultIfNull(body.session_confidence(), (short) 0),
                defaultIfNull(body.session_focus(),     (short) 0));
    }

    @GetMapping("/users/{userId}/sessions")
    public List<UserSession> recent(@PathVariable UUID userId,
                                    @RequestParam(defaultValue = "5") int limit) {
        return dao.selectRecentByUser(userId, limit);
    }

    public record StartSessionRequest(UUID user_id,
                                      UUID subject_id,
                                      UUID exam_id,
                                      Instant started_at) { }

    public record StartSessionResponse(UUID session_id) { }

    public record FinishSessionRequest(Instant ended_at,
                                       int seconds_spent,
                                       Short session_confidence,
                                       Short session_focus) { }

    private static <T> T defaultIfNull(T val, T def) {
        return val != null ? val : def;
    }
}
