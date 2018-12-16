package com.raiseltwice.kendol.repository;

import com.raiseltwice.kendol.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Iterable<Book> findByIsApproved(Integer isApproved);

}
