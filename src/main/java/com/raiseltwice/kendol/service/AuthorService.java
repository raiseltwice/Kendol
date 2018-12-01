package com.raiseltwice.kendol.service;

import com.raiseltwice.kendol.model.Author;
import com.raiseltwice.kendol.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public Author save(Author author) {
        return authorRepository.save(author);
    }

    public void delete(Author author) {
        authorRepository.delete(author);
    }

    public Iterable<Author> findAll() {
        return authorRepository.findAll();
    }

    public Optional<Author> findById(String id) {
        return authorRepository.findById(Integer.parseInt(id));
    }

}
