package com.chrona.backend.db.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Aggregate root representing the subjects a user has enrolled in.
 * Maps to the <code>user_subjects</code> table.
 */
@Table("user_subjects")
public
class UserSubject {

    @Id
    @Column("subject_id")
    private UUID subjectId;

    @Column("user_id")
    private UUID userId;

    @Column("subject_name")
    private String subjectName;

    public UserSubject() {}

    public UserSubject(UUID subjectId, UUID userId, String subjectName) {
        this.subjectId = subjectId;
        this.userId = userId;
        this.subjectName = subjectName;
    }

    public UUID getSubjectId() { return subjectId; }
    public void setSubjectId(UUID subjectId) { this.subjectId = subjectId; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    @Override
    public String toString() {
        return "UserSubject{" +
                "subjectId=" + subjectId +
                ", userId=" + userId +
                ", subjectName='" + subjectName + '\'' +
                '}';
    }
}