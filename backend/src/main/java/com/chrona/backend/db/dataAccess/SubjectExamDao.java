package com.chrona.backend.db.dataAccess;

import com.chrona.backend.db.models.UserSubjectExam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SubjectExamDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<UserSubjectExam> ROW_MAPPER = (rs, n) -> new UserSubjectExam(
            rs.getObject("exam_id", UUID.class),
            rs.getObject("subject_id", UUID.class),
            rs.getObject("user_id", UUID.class),
            rs.getString("exam_name"),
            rs.getObject("exam_date", LocalDate.class),
            rs.getShort("exam_difficulty"),
            rs.getShort("exam_confidence"),
            rs.getLong("exam_seconds_spent")
    );


    public List<UserSubjectExam> selectAllBySubject(UUID subjectId) {
        return jdbcTemplate.query(
                """
                SELECT exam_id,
                       subject_id,
                       user_id,
                       exam_name,
                       exam_date,
                       exam_difficulty,
                       exam_confidence,
                       exam_seconds_spent
                FROM   user_subject_exams
                WHERE  subject_id = ?
                ORDER  BY exam_date ASC
                """,
                ROW_MAPPER, subjectId);
    }

    public Optional<UserSubjectExam> selectByExam(UUID examId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(
                    """
                    SELECT exam_id,
                           subject_id,
                           user_id,
                           exam_name,
                           exam_date,
                           exam_difficulty,
                           exam_confidence,
                           exam_seconds_spent
                    FROM   user_subject_exams
                    WHERE  exam_id = ?
                    """,
                    ROW_MAPPER, examId));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    public List<UserSubjectExam> selectAllByUser(UUID userId) {
        return jdbcTemplate.query(
                """
                SELECT e.exam_id,
                       e.subject_id,
                       e.user_id,
                       e.exam_name,
                       e.exam_date,
                       e.exam_difficulty,
                       e.exam_confidence,
                       e.exam_seconds_spent
                FROM   user_subject_exams e
                JOIN   user_subjects      s ON s.subject_id = e.subject_id
                WHERE  s.user_id = ?
                ORDER  BY e.exam_date DESC
                """,
                ROW_MAPPER, userId);
    }

    public boolean insert(UserSubjectExam e) {
        final String sql = """
                INSERT INTO user_subject_exams (
                    exam_id,
                    subject_id,
                    user_id,
                    exam_name,
                    exam_date,
                    exam_difficulty,
                    exam_confidence,
                    exam_seconds_spent)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT (exam_id) DO UPDATE
                SET exam_name          = EXCLUDED.exam_name,
                    exam_date          = EXCLUDED.exam_date,
                    exam_difficulty    = EXCLUDED.exam_difficulty,
                    subject_id         = EXCLUDED.subject_id,
                    user_id            = EXCLUDED.user_id,
                    exam_confidence    = EXCLUDED.exam_confidence,
                    exam_seconds_spent = EXCLUDED.exam_seconds_spent
                """;
        return jdbcTemplate.update(sql,
                e.getExamId(),
                e.getSubjectId(),
                e.getUserId(),
                e.getExamName(),
                e.getExamDate(),
                e.getExamDifficulty(),
                e.getExamConfidence(),
                e.getExamSecondsSpent()) > 0;
    }

    public void update(UserSubjectExam e) {
        jdbcTemplate.update(
                """
                UPDATE user_subject_exams
                   SET exam_name          = ?,
                       exam_date          = ?,
                       exam_difficulty    = ?,
                       exam_confidence    = ?,
                       exam_seconds_spent = ?
                 WHERE exam_id = ?
                """,
                e.getExamName(),
                e.getExamDate(),
                e.getExamDifficulty(),
                e.getExamConfidence(),
                e.getExamSecondsSpent(),
                e.getExamId());
    }

    public boolean delete(UUID examId) {
        return jdbcTemplate.update("DELETE FROM user_subject_exams WHERE exam_id = ?", examId) > 0;
    }
}