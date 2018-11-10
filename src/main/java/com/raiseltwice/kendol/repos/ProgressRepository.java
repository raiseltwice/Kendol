package com.raiseltwice.kendol.repos;

import com.raiseltwice.kendol.models.BookUserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressRepository extends JpaRepository<BookUserProgress, Integer> {
}
