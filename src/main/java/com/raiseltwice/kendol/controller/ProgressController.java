package com.raiseltwice.kendol.controller;


import com.raiseltwice.kendol.model.BookUserProgress;
import com.raiseltwice.kendol.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/progress")
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

    @PostMapping(path = "/update")
    public @ResponseBody BookUserProgress updateProgress(@RequestBody BookUserProgress bookUserProgress){
        return progressService.save(bookUserProgress);
    }

    @PostMapping(path = "/delete")
    public @ResponseBody void deleteProgress(@RequestBody BookUserProgress bookUserProgress){
        progressService.delete(bookUserProgress);
    }

}
