package com.raiseltwice.kendol.repository;

import com.raiseltwice.kendol.model.BookUserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressRepository extends JpaRepository<BookUserProgress, Integer> {
}
