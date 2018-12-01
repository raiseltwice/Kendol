package com.raiseltwice.kendol.service;

import com.raiseltwice.kendol.model.Author;
import com.raiseltwice.kendol.model.Book;
import com.raiseltwice.kendol.model.BookUserProgress;
import com.raiseltwice.kendol.repository.AuthorRepository;
import com.raiseltwice.kendol.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    public BookUserProgress save(BookUserProgress bookUserProgress) {
        return progressRepository.save(bookUserProgress);
    }

    public void delete(BookUserProgress bookUserProgress) {
        progressRepository.delete(bookUserProgress);
    }

    public Iterable<BookUserProgress> findAll() {
        return progressRepository.findAll();
    }

    public Optional<BookUserProgress> findById(String id) {
        return progressRepository.findById(Integer.parseInt(id));
    }

}
