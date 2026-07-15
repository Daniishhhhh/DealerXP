from __future__ import annotations

from collections import defaultdict
from typing import Any


class DepartmentService:
    """
    Single source of truth for department-level aggregation.

    Responsibilities:
    - Aggregate department scores
    - Rank departments
    - Provide top departments for dashboards,
      featured matches and analytics.
    """

    def aggregate_scores(
        self,
        scoring_events: list[dict[str, Any]]
    ) -> dict[str, int]:

        scores = defaultdict(int)

        for event in scoring_events:

            department = str(
                event.get("department", "")
            ).strip()

            if not department:
                continue

            scores[department] += int(
                event.get("points", 0)
            )

        return dict(scores)

    def ranked_departments(
        self,
        scoring_events: list[dict[str, Any]]
    ) -> list[dict[str, Any]]:

        scores = self.aggregate_scores(scoring_events)

        ranked = sorted(
            scores.items(),
            key=lambda x: x[1],
            reverse=True
        )

        return [
            {
                "rank": index + 1,
                "department": dept,
                "points": points,
            }
            for index, (dept, points)
            in enumerate(ranked)
        ]

    def top_departments(
        self,
        scoring_events: list[dict[str, Any]],
        count: int = 2,
    ) -> list[dict[str, Any]]:

        return self.ranked_departments(
            scoring_events
        )[:count]
    
    def featured_match(
        self,
        scoring_events: list[dict[str, Any]]) -> dict[str, Any]:
        ranked = self.top_departments(scoring_events, count=2)
        
        
        if len(ranked) < 2:
            return {
                "teamA": None,
                "teamB": None,
                "teamAScore": 0,
                "teamBScore": 0,
                "winner": None,
        }
        
        
        first = ranked[0]
        second = ranked[1]

        if first["points"] > second["points"]:
            winner = first["department"]
        elif second["points"] > first["points"]:
            winner = second["department"]
        else:
            winner = "Draw"

        return {
            "teamA": first["department"],
            "teamB": second["department"],
            "teamAScore": first["points"],
            "teamBScore": second["points"],
            "winner": winner,
    }