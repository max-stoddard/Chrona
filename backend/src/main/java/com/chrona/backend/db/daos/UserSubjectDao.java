package com.chrona.backend.db.daos;

import com.chrona.backend.db.models.UserSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * DAO for the <code>user_subjects</code> table.
 */
@Repository
public class UserSubjectDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<UserSubject> ROW_MAPPER = (rs, rowNum) -> new UserSubject(
            rs.getObject("subject_id", UUID.class),
            rs.getObject("user_id", UUID.class),
            rs.getString("subject_name"),
            rs.getLong("subject_seconds_spent")
    );

    public List<UserSubject> selectAllByUser(UUID userId) {
        return jdbcTemplate.query(
                """
                SELECT subject_id,
                       user_id,
                       subject_name,
                       subject_seconds_spent
                FROM   user_subjects
                WHERE  user_id = ?
                ORDER  BY subject_name
                """,
                ROW_MAPPER,
                userId);
    }

    public List<UserSubject> selectSome(int count) {
        return jdbcTemplate.query(
                """
                SELECT subject_id,
                       user_id,
                       subject_name,
                       subject_seconds_spent
                FROM   user_subjects
                LIMIT  ?
                """,
                ROW_MAPPER,
                count);
    }

    public Optional<UserSubject> select(UUID subjectId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(
                    """
                    SELECT subject_id,
                           user_id,
                           subject_name,
                           subject_seconds_spent
                    FROM   user_subjects
                    WHERE  subject_id = ?
                    """,
                    ROW_MAPPER,
                    subjectId));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    public boolean insert(UserSubject entity) {
        final String sql = """
                INSERT INTO user_subjects (
                    subject_id,
                    user_id,
                    subject_name,
                    subject_seconds_spent)
                VALUES (?, ?, ?, ?)
                ON CONFLICT (subject_id) DO UPDATE
                   SET user_id               = EXCLUDED.user_id,
                       subject_name          = EXCLUDED.subject_name,
                       subject_seconds_spent = EXCLUDED.subject_seconds_spent
                """;
        return jdbcTemplate.update(sql,
                entity.getSubjectId(),
                entity.getUserId(),
                entity.getSubjectName(),
                entity.getSubjectSecondsSpent()) > 0;
    }

    public void update(UserSubject entity) {
        jdbcTemplate.update(
                """
                UPDATE user_subjects
                   SET user_id               = ?,
                       subject_name          = ?,
                       subject_seconds_spent = ?
                 WHERE subject_id = ?
                """,
                entity.getUserId(),
                entity.getSubjectName(),
                entity.getSubjectSecondsSpent(),
                entity.getSubjectId());
    }

    public boolean delete(UUID id) {
        return jdbcTemplate.update("DELETE FROM user_subjects WHERE subject_id = ?", id) > 0;
    }
}
