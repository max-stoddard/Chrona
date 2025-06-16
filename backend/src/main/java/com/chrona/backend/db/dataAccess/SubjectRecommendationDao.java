package com.chrona.backend.db.dataAccess;

import com.chrona.backend.db.models.UserSubject;
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
public class SubjectRecommendationDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<UserSubject> ROW_MAPPER = (rs, rowNum) -> new UserSubject(
            rs.getObject("subject_id", UUID.class),
            rs.getObject("user_id", UUID.class),
            rs.getString("subject_name"),
            rs.getLong("subject_seconds_spent")
    );


    public UserSubject getSubject(UUID userId) {
        final String sql = """
                SELECT s.subject_id, s.user_id, s.subject_name, s.subject_seconds_spent
                FROM user_subjects s
                INNER JOIN user_subject_exams e ON s.subject_id = e.subject_id
                WHERE s.user_id = ?
                AND e.exam_date >= CURRENT_DATE
                GROUP BY s.subject_id, s.user_id, s.subject_name, s.subject_seconds_spent
                ORDER BY s.subject_seconds_spent ASC, MIN(e.exam_date) ASC
                LIMIT 1
                """;
        return jdbcTemplate.queryForObject(sql, ROW_MAPPER, userId);
    }


    
}
