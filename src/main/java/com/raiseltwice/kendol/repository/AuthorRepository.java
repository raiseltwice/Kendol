package com.raiseltwice.kendol.repository;

import com.raiseltwice.kendol.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {

    Optional<Author> findAuthorByFullName(String fullName);
}
