package com.raiseltwice.kendol.service;

import com.raiseltwice.kendol.model.Genre;
import com.raiseltwice.kendol.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    public Genre save(Genre genre) {
        return genreRepository.save(genre);
    }

    public void delete(Genre genre) {
        genreRepository.delete(genre);
    }

    public Iterable<Genre> findAll() {
        return genreRepository.findAll();
    }

    public Optional<Genre> findById(String id) {
        return genreRepository.findById(Integer.parseInt(id));
    }

}
