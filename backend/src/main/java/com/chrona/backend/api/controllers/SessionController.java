package com.chrona.backend.api.controllers;

import com.chrona.backend.api.dtos.FinishSessionRequestDTO;
import com.chrona.backend.api.dtos.StartSessionRequestDTO;
import com.chrona.backend.api.dtos.StartSessionResponseDTO;
import com.chrona.backend.db.daos.UserSessionDao;
import com.chrona.backend.db.models.UserSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public StartSessionResponseDTO start(@RequestBody StartSessionRequestDTO body) {
        UUID sessionId = dao.insert(
                body.user_id(),
                body.subject_id(),
                body.exam_id(),
                body.started_at());
        return new StartSessionResponseDTO(sessionId);
    }

    @PutMapping("/sessions/{sessionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void finish(@PathVariable UUID sessionId,
                       @RequestBody FinishSessionRequestDTO body) {
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

    private static <T> T defaultIfNull(T val, T def) {
        return val != null ? val : def;
    }
}
