package com.chrona.backend.db.daos;

import com.chrona.backend.db.models.LeaderboardEntry;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class LeaderboardDao {
    private final JdbcTemplate jdbcTemplate;

    public LeaderboardDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<LeaderboardEntry> getLeaderboard() {
        String sql = """
            SELECT au.email, SUM(us.seconds_spent) as total_seconds
            FROM auth.users au
            LEFT JOIN public.user_sessions us ON au.id = us.user_id
            GROUP BY au.id, au.email
            ORDER BY total_seconds DESC NULLS LAST
        """;

        return jdbcTemplate.query(sql, this::mapLeaderboardEntry);
    }

    private LeaderboardEntry mapLeaderboardEntry(ResultSet rs, int rowNum) throws SQLException {
        return new LeaderboardEntry(
            rs.getString("email"),
            rs.getLong("total_seconds")
        );
    }
}