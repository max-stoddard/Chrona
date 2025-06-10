package com.chrona.backend.db.daos;

import com.chrona.backend.db.models.UserSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
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
            rs.getInt("seconds_spent"),
            (Short) rs.getObject("session_confidence", Short.class),
            (Short) rs.getObject("session_focus", Short.class)
    );

    public UUID insert(UUID userId,
                       UUID subjectId,
                       UUID examId,
                       Instant startedAt) {
        UUID sessionId = UUID.randomUUID();
        OffsetDateTime startedAtOdt = OffsetDateTime.ofInstant(startedAt, ZoneOffset.UTC);

        jdbcTemplate.update(
                """
                INSERT INTO user_sessions (
                    session_id,
                    user_id,
                    subject_id,
                    exam_id,
                    started_at,
                    seconds_spent,
                    session_confidence,
                    session_focus)
                VALUES (?,?,?,?,?,?,?,?)
                """,
                sessionId,
                userId,
                subjectId,
                examId,
                startedAtOdt,
                0,
                0,
                0
        );
        return sessionId;
    }

    @Transactional
    public void updateFinish(UUID sessionId,
                             Instant endedAt,
                             int secondsSpent,
                             Short sessionConfidence,
                             Short sessionFocus) {
        OffsetDateTime endedAtOdt = OffsetDateTime.ofInstant(endedAt, ZoneOffset.UTC);

        // 1) Update the session with the end time and other details
        jdbcTemplate.update(
                """
                UPDATE user_sessions
                   SET ended_at          = ?,
                       seconds_spent     = ?,
                       session_confidence = ?,
                       session_focus      = ?
                 WHERE session_id = ?
                """,
                endedAtOdt,
                secondsSpent,
                sessionConfidence,
                sessionFocus,
                sessionId);

        // 2) Add this session’s time onto the exam’s total
        jdbcTemplate.update(
            """
            UPDATE user_subject_exams AS e
               SET exam_seconds_spent = e.exam_seconds_spent + ?
              FROM user_sessions AS s
            WHERE e.exam_id = s.exam_id
              AND s.session_id = ?
            """,
            secondsSpent,
            sessionId
        );

        // 3) Add this session’s time onto the subject’s total
        jdbcTemplate.update(
            """
            UPDATE user_subjects AS s
               SET subject_seconds_spent = s.subject_seconds_spent + ?
              FROM user_sessions AS u
            WHERE s.subject_id = u.subject_id
              AND u.session_id = ?
            """,
            secondsSpent,
            sessionId
        );
    }

    public Optional<UserSession> select(UUID sessionId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(
                    "SELECT * FROM user_sessions WHERE session_id = ?",
                    ROW_MAPPER,
                    sessionId));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    public List<UserSession> selectRecentByUser(UUID userId, int limit) {
        return jdbcTemplate.query(
                """
                SELECT *
                  FROM user_sessions
                 WHERE user_id = ?
                 ORDER BY started_at DESC
                 LIMIT ?
                """,
                ROW_MAPPER,
                userId,
                limit);
    }
}
