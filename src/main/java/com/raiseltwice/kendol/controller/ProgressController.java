package com.raiseltwice.kendol.controller;


import com.raiseltwice.kendol.model.BookUserProgress;
import com.raiseltwice.kendol.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping
    public @ResponseBody Iterable<BookUserProgress> getAllProgresses(){
        return progressService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Optional<BookUserProgress> getProgressById(@PathVariable String id){
        return progressService.findById(id);
    }

    @PostMapping
    public @ResponseBody BookUserProgress addProgress(@RequestBody BookUserProgress bookUserProgress){
        return progressService.save(bookUserProgress);
    }

    @PutMapping
    public @ResponseBody BookUserProgress updateProgress(@RequestBody BookUserProgress bookUserProgress){
        return progressService.save(bookUserProgress);
    }

    @DeleteMapping
    public @ResponseBody void deleteProgress(@RequestBody BookUserProgress bookUserProgress){
        progressService.delete(bookUserProgress);
    }

}
