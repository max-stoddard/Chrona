package com.chrona.backend.db.dataAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.chrona.backend.db.models.UserSubject;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * DAO implementation that uses {@link JdbcTemplate} to access the <code>user_subjects</code>
 * table stored in Supabase (PostgreSQL). The class follows the classical DAO pattern,
 * keeping persistence concerns separate from the service layer.
 */
@Repository
public class UserSubjectDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<UserSubject> ROW_MAPPER = (rs, rowNum) -> new UserSubject(
            rs.getObject("subject_id", UUID.class),
            rs.getObject("user_id", UUID.class),
            rs.getString("subject_name")
    );

    /*** List every subject that belongs to userId */
    public List<UserSubject> selectAllByUser(UUID userId) {
        final String sql = """
                SELECT subject_id, user_id, subject_name
                FROM user_subjects
                WHERE user_id = ?
                ORDER BY subject_name
                """;
        return jdbcTemplate.query(sql, ROW_MAPPER, userId);
    }

    /**
     * Return all rows in <code>user_subjects</code>.
     */
    public List<UserSubject> selectSome(int count) {
        final String sql = """
                SELECT subject_id, user_id, subject_name
                FROM user_subjects
                LIMIT ?
                """;
        return jdbcTemplate.query(sql, ROW_MAPPER, count);
    }

    public Optional<UserSubject> select(UUID subjectId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject("""
                SELECT subject_id, user_id, subject_name
                FROM user_subjects
                WHERE subject_id = ?
                """, ROW_MAPPER, subjectId));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    /**
     * Persist a new {@link UserSubject}. If the key already exists, the row is updated (PostgreSQL UPSERT).
     */
    public boolean insert(UserSubject entity) {
        final String sql = """
                INSERT INTO user_subjects(subject_id, user_id, subject_name)
                VALUES (?, ?, ?)
                ON CONFLICT (subject_id) DO UPDATE
                SET user_id      = EXCLUDED.user_id,
                    subject_name = EXCLUDED.subject_name""";
        return jdbcTemplate.update(sql,
                entity.getSubjectId(),
                entity.getUserId(),
                entity.getSubjectName()) > 0;
    }

    /**
     * Update the <code>user_id</code> or <code>subject_name</code> of an existing row.
     */
    public void update(UserSubject entity) {
        final String sql = """
                UPDATE user_subjects
                SET user_id = ?, subject_name = ?
                WHERE subject_id = ?
                """;
        jdbcTemplate.update(sql,
                entity.getUserId(),
                entity.getSubjectName(),
                entity.getSubjectId());
    }

    /**
     * Delete a row by primary key.
     */
    public boolean delete(UUID id) {
        final String sql = "DELETE FROM user_subjects WHERE subject_id = ?";
        return jdbcTemplate.update(sql, id) > 0;
    }
}