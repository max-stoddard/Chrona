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
                SELECT subject_id, user_id, subject_name, subject_seconds_spent
                FROM user_subjects
                WHERE user_id = ?
                ORDER BY subject_seconds_spent ASC
                LIMIT 1
                """;
        return jdbcTemplate.queryForObject(sql, ROW_MAPPER, userId);
    }


    
}
