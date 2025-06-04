package com.chrona.backend.db;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserSubjectExamDao implements Dao<UserSubjectExam> {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Maps a single row of <code>user_subjects</code> to a {@link UserSubject} aggregate.
     */
    private static final RowMapper<UserSubjectExam> ROW_MAPPER = (rs, rowNum) -> new UserSubjectExam(
            rs.getObject("exam_id", UUID.class),
            rs.getObject("subject_id", UUID.class),
            rs.getString("exam_name"),
            rs.getObject("exam_date", LocalDate.class),
            rs.getShort("exam_difficulty")
    );


    @Override
    public Optional<UserSubjectExam> select(UUID id) {
                final String sql = 
"""
SELECT exam_id, subject_id, exam_name, exam_date, exam_difficulty
FROM user_subject_exams
WHERE exam_id = ?
""";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, ROW_MAPPER, id));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    @Override
    public List<UserSubjectExam> selectSome(int count) {
        final String sql = 
        """
        SELECT exam_id, subject_id, exam_name, exam_date, exam_difficulty
        FROM user_subject_exams
        LIMIT ?
        """;
        return jdbcTemplate.query(sql, ROW_MAPPER, count);
    }

    @Override
    public boolean insert(UserSubjectExam entity) {
        final String sql = """
            INSERT INTO user_subject_exams(exam_id, subject_id, exam_name, exam_date, exam_difficulty)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT (exam_id) DO UPDATE
            SET user_id      = EXCLUDED.user_id,
                subject_name = EXCLUDED.subject_name""";
        
            return jdbcTemplate.update(sql,
                entity.getExamId(),
                entity.getSubjectId(),
                entity.getExamName(),
                entity.getExamDate(),
                entity.getExamDifficulty()) > 0;
    }



    @Override
    public void update(UserSubjectExam entity) {
        final String sql = "UPDATE user_subject_exams SET subject_id = ?, exam_name = ?, exam_date = ?, exam_difficulty = ? WHERE exam_id = ?";
        jdbcTemplate.update(sql,
                entity.getSubjectId(),
                entity.getExamName(),
                entity.getExamDate(),
                entity.getExamDifficulty(),
                entity.getExamId());
    }

    @Override
    public boolean delete(UUID id) {
        final String sql = "DELETE FROM user_subject_exams WHERE exam_id = ?";
        return jdbcTemplate.update(sql, id) > 0;
    }
    
}
