package com.raiseltwice.kendol.controller;


import com.raiseltwice.kendol.model.Author;
import com.raiseltwice.kendol.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/author")
@CrossOrigin
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping
    public @ResponseBody Iterable<Author> getAllAuthors(){
        return authorService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Optional<Author> getAuthorById(@PathVariable String id){
        return authorService.findById(id);
    }

    @PostMapping
    public @ResponseBody Author addAuthor(@RequestBody Author author){
        return authorService.save(author);
    }

    @PutMapping
    public @ResponseBody Author updateAuthor(@RequestBody Author author){
        return authorService.save(author);
    }

    @DeleteMapping
    public @ResponseBody void deleteAuthor(@RequestBody Author author){
        authorService.delete(author);
    }

}
