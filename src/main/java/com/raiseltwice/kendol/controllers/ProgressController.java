package com.raiseltwice.kendol.controllers;


import com.raiseltwice.kendol.models.BookUserProgress;
import com.raiseltwice.kendol.repos.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ProgressController {
    @Autowired
    private ProgressRepository progressRepository;

    @GetMapping(path = "/allProgress")
    public @ResponseBody Iterable<BookUserProgress> getAllProgresses(){
        return progressRepository.findAll();
    }

}
