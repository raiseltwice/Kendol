package com.raiseltwice.kendol.controller;


import com.raiseltwice.kendol.model.Role;
import com.raiseltwice.kendol.model.User;
import com.raiseltwice.kendol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;

@Controller
@RequestMapping(path = "/api/")
public class RegistrationController {
    @Autowired
    private UserRepository userRepository;



    @PostMapping("/registration")
    public ResponseEntity<String> addUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        System.out.println(username);
        User userFromDb = userRepository.findByUsername(username);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/plain"));
        System.out.println(userFromDb);
        if (userFromDb != null) {
            return new ResponseEntity<>("User already exists", headers, HttpStatus.OK);
        }
        User user = new User(username, password);
        user.setRoles(Collections.singleton(Role.USER));
        userRepository.save(user);

        return new ResponseEntity<>("Success. You can login now", headers, HttpStatus.OK);
    }
}
