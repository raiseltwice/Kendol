package com.raiseltwice.kendol.repository;

import com.raiseltwice.kendol.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Iterable<Book> findByIsApproved(Integer isApproved);

    Iterable<Book> findByIsApprovedAndTitleContaining(Integer isApproved, String title);

    Iterable<Book> findByIsApprovedAndAuthorIdEquals(Integer isApproved, Integer authorId);

    Iterable<Book> findByIsApprovedAndGenreIdEquals(Integer isApproved, Integer genreId);

    Iterable<Book> findByIsApprovedAndTitleContainingAndAuthorIdEqualsAndGenreIdEquals(
            Integer isApproved, String title, Integer authorId, Integer genreId);

    Iterable<Book> findByIsApprovedAndAuthorIdEqualsAndGenreIdEquals(
            Integer isApproved, Integer authorId, Integer genreId);



}
