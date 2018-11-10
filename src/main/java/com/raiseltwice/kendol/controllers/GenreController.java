package com.raiseltwice.kendol.controllers;


import com.raiseltwice.kendol.models.Genre;
import com.raiseltwice.kendol.repos.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/api")
public class GenreController {

    @Autowired
    private GenreRepository genreRepository;

    @GetMapping(path = "/allGenre")
    public @ResponseBody Iterable<Genre> getAllGenres(){
        return genreRepository.findAll();
    }

    @GetMapping(path = "/addGenre")
    public @ResponseBody void addGenre(@RequestParam("title") String title){
        genreRepository.save(new Genre(title));
    }
}
