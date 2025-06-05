package com.chrona.backend.db.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.UUID;

/**
 * Aggregate root representing a study session for a specific exam.
 * Maps to the <code>user_sessions</code> table.
 */
@Table("user_sessions")
public class UserSession {

    @Id
    @Column("session_id")
    @JsonProperty("session_id")
    private UUID sessionId;

    @Column("user_id")
    @JsonProperty("user_id")
    private UUID userId;

    @Column("subject_id")
    @JsonProperty("subject_id")
    private UUID subjectId;

    @Column("exam_id")
    @JsonProperty("exam_id")
    private UUID examId;

    @Column("started_at")
    @JsonProperty("started_at")
    private Instant startedAt;

    @Column("ended_at")
    @JsonProperty("ended_at")
    private Instant endedAt;

    @Column("seconds_spent")
    @JsonProperty("seconds_spent")
    private Integer secondsSpent;

    public UserSession() {}

    public UserSession(UUID sessionId, UUID userId, UUID subjectId, UUID examId, Instant startedAt, Instant endedAt, Integer secondsSpent) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.subjectId = subjectId;
        this.examId = examId;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.secondsSpent = secondsSpent;
    }

    // Getters and setters
    public UUID getSessionId() { return sessionId; }
    public void setSessionId(UUID sessionId) { this.sessionId = sessionId; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public UUID getSubjectId() { return subjectId; }
    public void setSubjectId(UUID subjectId) { this.subjectId = subjectId; }

    public UUID getExamId() { return examId; }
    public void setExamId(UUID examId) { this.examId = examId; }

    public Instant getStartedAt() { return startedAt; }
    public void setStartedAt(Instant startedAt) { this.startedAt = startedAt; }

    public Instant getEndedAt() { return endedAt; }
    public void setEndedAt(Instant endedAt) { this.endedAt = endedAt; }

    public Integer getSecondsSpent() { return secondsSpent; }
    public void setSecondsSpent(Integer secondsSpent) { this.secondsSpent = secondsSpent; }
}
