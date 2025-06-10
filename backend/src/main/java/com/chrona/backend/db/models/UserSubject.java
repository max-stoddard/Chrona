package com.chrona.backend.db.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

/**
 * Aggregate root representing the subjects a user has enrolled in.
 * Maps to the <code>user_subjects</code> table.
 */
@Table("user_subjects")
public class UserSubject {

    @Id
    @Column("subject_id")
    @JsonProperty("subject_id")
    private UUID subjectId;

    @Column("user_id")
    @JsonProperty("user_id")
    private UUID userId;

    @Column("subject_name")
    @JsonProperty("subject_name")
    private String subjectName;

    @Column("subject_seconds_spent")
    @JsonProperty("subject_seconds_spent")
    private Long subjectSecondsSpent;

    public UserSubject(UUID subjectId, UUID userId, String subjectName, Long subjectSecondsSpent) {
        this.subjectId = subjectId;
        this.userId = userId;
        this.subjectName = subjectName;
        this.subjectSecondsSpent = subjectSecondsSpent;
    }

    public UUID getSubjectId() { return subjectId; }
    public void setSubjectId(UUID subjectId) { this.subjectId = subjectId; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public Long getSubjectSecondsSpent() { return subjectSecondsSpent; }
    public void setSubjectSecondsSpent(Long subjectSecondsSpent) { this.subjectSecondsSpent = subjectSecondsSpent; }

    @Override
    public String toString() {
        return "UserSubject{" +
                "subjectId=" + subjectId +
                ", userId=" + userId +
                ", subjectName='" + subjectName + '\'' +
                ", subjectSecondsSpent=" + subjectSecondsSpent +
                '}';
    }
}
