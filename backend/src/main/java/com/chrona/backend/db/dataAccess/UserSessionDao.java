package com.chrona.backend.db.dataAccess;

import com.chrona.backend.db.models.UserSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * DAO for the <code>user_sessions</code> table.
 */
@Repository
public class UserSessionDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<UserSession> ROW_MAPPER = (rs, rowNum) -> new UserSession(
            rs.getObject("session_id", UUID.class),
            rs.getObject("user_id", UUID.class),
            rs.getObject("subject_id", UUID.class),
            rs.getObject("exam_id", UUID.class),
            rs.getObject("started_at", OffsetDateTime.class).toInstant(),
            Optional.ofNullable(rs.getObject("ended_at", OffsetDateTime.class))
                .map(OffsetDateTime::toInstant)
                .orElse(null),
            rs.getObject("seconds_spent", Integer.class)
    );

    /** Start / create a session */
    public UUID insert(UUID userId, UUID subjectId, UUID examId, Instant startedAt) {
        UUID sessionId = UUID.randomUUID();
        OffsetDateTime startedAtOdt = OffsetDateTime.ofInstant(startedAt, ZoneOffset.UTC);

        jdbcTemplate.update("""
            INSERT INTO user_sessions(session_id, user_id, subject_id, exam_id, started_at, seconds_spent)
            VALUES(?,?,?,?,?,?)""",
                sessionId, userId, subjectId, examId, startedAtOdt, 0
        );
        return sessionId;
    }

    /** Finish a session */
    public void updateFinish(UUID sessionId, Instant endedAt, int secondsSpent) {
        OffsetDateTime endedAtOdt = OffsetDateTime.ofInstant(endedAt, ZoneOffset.UTC);
        
        jdbcTemplate.update("""
            UPDATE user_sessions
            SET ended_at = ?, seconds_spent = ?
            WHERE session_id = ?""",
                endedAtOdt, secondsSpent, sessionId
        );
    }

    public Optional<UserSession> select(UUID sessionId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("""
                SELECT * FROM user_sessions WHERE session_id = ?""", ROW_MAPPER, sessionId));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    /** Return the most recent *limit* sessions for a user */
    public List<UserSession> selectRecentByUser(UUID userId, int limit) {
        return jdbcTemplate.query("""
                SELECT *
                FROM user_sessions
                WHERE user_id = ?
                ORDER BY started_at DESC
                LIMIT ?""", ROW_MAPPER, userId, limit);
    }
}