package com.raiseltwice.kendol.controller;


import com.raiseltwice.kendol.model.Genre;
import com.raiseltwice.kendol.repository.GenreRepository;
import com.raiseltwice.kendol.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "/api")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping
    public @ResponseBody Iterable<Genre> getAllGenres(){
        return genreService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Optional<Genre> getGenreById(@PathVariable String id){
        return genreService.findById(id);
    }

    @PostMapping
    public @ResponseBody Genre addGenre(@RequestBody Genre genre){
        return genreService.save(genre);
    }

    @PutMapping
    public @ResponseBody Genre updateGenre(@RequestBody Genre genre){
        return genreService.save(genre);
    }

    @DeleteMapping
    public @ResponseBody void deleteGenre(@RequestBody Genre genre){
        genreService.delete(genre);
    }

}
