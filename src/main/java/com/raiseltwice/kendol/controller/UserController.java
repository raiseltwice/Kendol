package com.raiseltwice.kendol.controller;


import com.raiseltwice.kendol.model.Author;
import com.raiseltwice.kendol.model.User;
import com.raiseltwice.kendol.repository.UserRepository;
import com.raiseltwice.kendol.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public @ResponseBody Iterable<User> getAllUsers(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Optional<User> getUserById(@PathVariable String id){
        return userService.findById(id);
    }

    @PostMapping
    public @ResponseBody User addUser(@RequestBody User user){
        return userService.save(user);
    }

    @PutMapping
    public @ResponseBody User updateUser(@RequestBody User user){
        return userService.save(user);
    }

    @DeleteMapping
    public @ResponseBody void deleteUser(@RequestBody User user){
        userService.delete(user);
    }

}
