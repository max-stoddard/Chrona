package com.chrona.backend.api;

import com.chrona.backend.db.daos.LeaderboardDao;
import com.chrona.backend.db.models.LeaderboardEntry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LeaderboardController {
    private final LeaderboardDao leaderboardDao;

    public LeaderboardController(LeaderboardDao leaderboardDao) {
        this.leaderboardDao = leaderboardDao;
    }

    @GetMapping("/leaderboard")
    public List<LeaderboardEntry> getLeaderboard() {
        return leaderboardDao.getLeaderboard();
    }
}
