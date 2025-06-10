package com.chrona.backend.db.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Aggregate root representing exams associated with a user subject.
 * Maps to the <code>user_subject_exams</code> table.
 */
@Table("user_subject_exams")
public
class UserSubjectExam {

    @Id
    @Column("exam_id")
    @JsonProperty("exam_id")
    private UUID examId;

    @Column("subject_id")
    @JsonProperty("subject_id")
    private UUID subjectId;

    @Column("user_id")
    @JsonProperty("user_id")
    private UUID userId;

    @Column("exam_name")
    @JsonProperty("exam_name")
    private String examName;

    @Column("exam_date")
    @JsonProperty("exam_date")
    private LocalDate examDate;

    @Column("exam_difficulty")
    @JsonProperty("exam_difficulty")
    private Short examDifficulty;

    @Column("exam_confidence")
    @JsonProperty("exam_confidence")
    private Short examConfidence;

    @Column("exam_seconds_spent")
    @JsonProperty("exam_seconds_spent")
    private Long examSecondsSpent;

    public UserSubjectExam(
            UUID examId,
            UUID subjectId,
            UUID userId,
            String examName,
            LocalDate examDate,
            Short examDifficulty,
            Short examConfidence,
            Long examSecondsSpent
    ) {
        this.examId = examId;
        this.subjectId = subjectId;
        this.userId = userId;
        this.examName = examName;
        this.examDate = examDate;
        this.examDifficulty = examDifficulty;
        this.examConfidence = examConfidence;
        this.examSecondsSpent = examSecondsSpent;
    }


    public UUID getExamId() { return examId; }
    public void setExamId(UUID examId) { this.examId = examId; }

    public UUID getSubjectId() { return subjectId; }
    public void setSubjectId(UUID subjectId) { this.subjectId = subjectId; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getExamName() { return examName; }
    public void setExamName(String examName) { this.examName = examName; }

    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }

    public Short getExamDifficulty() { return examDifficulty; }
    public void setExamDifficulty(Short examDifficulty) { this.examDifficulty = examDifficulty; }

    public Short getExamConfidence() { return examConfidence; }
    public void setExamConfidence(Short examConfidence) { this.examConfidence = examConfidence; }

    public Long getExamSecondsSpent() { return examSecondsSpent; }
    public void setExamSecondsSpent(Long examSecondsSpent) { this.examSecondsSpent = examSecondsSpent; }

    @Override
    public String toString() {
        return "UserSubjectExam{" +
               "examId=" + examId +
               ", subjectId=" + subjectId +
               ", userId=" + userId +
               ", examName='" + examName + '\'' +
               ", examDate=" + examDate +
               ", examDifficulty=" + examDifficulty +
               ", examConfidence=" + examConfidence +
               ", examSecondsSpent=" + examSecondsSpent +
               '}';
    }
}
