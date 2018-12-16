package com.raiseltwice.kendol.controller;

import com.raiseltwice.kendol.model.Role;
import com.raiseltwice.kendol.model.User;
import com.raiseltwice.kendol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String userList(Model model) {
        model.addAttribute("users", userRepository.findAll());

        return "userList";
    }

    @GetMapping("{user}")
    public String userEditForm(@PathVariable User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("roles", Role.values());

        return "userEdit";
    }

    @RequestMapping(value = "/get", method = RequestMethod.POST)
    @ResponseBody
    public String getUser(@RequestParam String username, @RequestParam String password) {
        User user = userRepository.findByUsername(username);
        if(user != null) {
            if(user.getPassword().equals(password)) return "success";
            else return "password is incorrect";
        } else return "such user doesn't exist";
    }
}
