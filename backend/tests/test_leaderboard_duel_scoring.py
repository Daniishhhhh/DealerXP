from backend.app.engines.leaderboard_engine import LeaderboardEngine


def test_duel_uses_max_total_per_user_before_team_sum() -> None:
    scoring_events = [
        {"department": "DSE", "user_id": "USR001", "points": 100},
        {"department": "DSE", "user_id": "USR001", "points": 200},
        {"department": "DSE", "user_id": "USR001", "points": 300},
        {"department": "Finance", "user_id": "USR002", "points": 260},
        {"department": "Finance", "user_id": "USR003", "points": 250},
    ]
    payload = LeaderboardEngine().get_current_duel(scoring_events)
    duel = payload["duel"]

    assert duel["teamAScore"] == 300
    assert duel["teamBScore"] == 510
    assert duel["winner"] == "Finance"
