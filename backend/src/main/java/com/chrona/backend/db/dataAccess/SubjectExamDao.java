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
            rs.getString("exam_name"),
            rs.getObject("exam_date", LocalDate.class),
            rs.getShort("exam_difficulty")
    );

    // ──────────────────────────────────────────────────────────────────────────────
    // Queries

    public List<UserSubjectExam> selectAllBySubject(UUID subjectId) {
        return jdbcTemplate.query("""
            SELECT exam_id, subject_id, exam_name, exam_date, exam_difficulty
            FROM user_subject_exams
            WHERE subject_id = ?
            ORDER BY exam_date DESC
            """, ROW_MAPPER, subjectId);
    }

    public Optional<UserSubjectExam> select(UUID examId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("""
                SELECT exam_id, subject_id, exam_name, exam_date, exam_difficulty
                FROM user_subject_exams
                WHERE exam_id = ?
                """, ROW_MAPPER, examId));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    // ──────────────────────────────────────────────────────────────────────────────
    // Mutations

    public boolean insert(UserSubjectExam e) {
        final String sql = """
            INSERT INTO user_subject_exams (exam_id, subject_id, exam_name, exam_date, exam_difficulty)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT (exam_id) DO UPDATE
            SET exam_name = EXCLUDED.exam_name,
                exam_date = EXCLUDED.exam_date,
                exam_difficulty = EXCLUDED.exam_difficulty,
                subject_id = EXCLUDED.subject_id
            """;
        return jdbcTemplate.update(sql,
                e.getExamId(), e.getSubjectId(), e.getExamName(), e.getExamDate(), e.getExamDifficulty()) > 0;
    }

    public void update(UserSubjectExam e) {
        jdbcTemplate.update("""
            UPDATE user_subject_exams
            SET exam_name = ?, exam_date = ?, exam_difficulty = ?
            WHERE exam_id = ?
            """, e.getExamName(), e.getExamDate(), e.getExamDifficulty(), e.getExamId());
    }

    public boolean delete(UUID examId) {
        return jdbcTemplate.update("DELETE FROM user_subject_exams WHERE exam_id = ?", examId) > 0;
    }
}