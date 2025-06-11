package com.chrona.backend.db.dataAccess;

import com.chrona.backend.db.models.UserSubjectExam;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Repository
public class ExamRecommendationDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<UserSubjectExam> examRowMapper = (rs, rowNum) -> new UserSubjectExam(
        rs.getObject("exam_id", UUID.class),
        rs.getObject("subject_id", UUID.class),
        rs.getObject("user_id", UUID.class),
        rs.getString("exam_name"),
        rs.getDate("exam_date").toLocalDate(),
        rs.getShort("exam_difficulty"),
        rs.getShort("exam_confidence"),
        rs.getLong("exam_seconds_spent")
    );

    public List<UserSubjectExam> getRecommendedExam(UUID userId, UUID subjectId) {
        String sql = """
            SELECT exam_id, subject_id, user_id, exam_name, exam_date,
                   exam_difficulty, exam_confidence, exam_seconds_spent
            FROM user_subject_exams
            WHERE user_id = ? AND subject_id = ?
            ORDER BY exam_seconds_spent ASC
            LIMIT 1
        """;

        return jdbcTemplate.query(sql, examRowMapper, userId, subjectId);
    }
}
