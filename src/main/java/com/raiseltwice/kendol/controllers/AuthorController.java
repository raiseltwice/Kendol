package com.raiseltwice.kendol.controllers;


import com.raiseltwice.kendol.models.Author;
import com.raiseltwice.kendol.repos.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping(path = "/allAuthors")
    public @ResponseBody Iterable<Author> getAllAuthors(){
        return authorRepository.findAll();
    }

    @GetMapping(path = "/addAuthor")
    public @ResponseBody void addAuthor(@RequestParam("fullName") String fullName){
        authorRepository.save(new Author(fullName));
    }
}
