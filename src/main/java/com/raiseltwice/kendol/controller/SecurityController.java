package com.raiseltwice.kendol.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api/user")
public class SecurityController {

    @RequestMapping(value = "/username", method = RequestMethod.GET)
    @ResponseBody
    public String currentUserName(Authentication authentication) {
        if(authentication != null) {
            String username = authentication.getName();
            if(username == null) return null;
            return username;
        } else return null;
    }
    @RequestMapping(value = "/authority", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<?> currentUserAuthorities(Authentication authentication) {
        if(authentication != null) {
            Iterable<?> authorities = authentication.getAuthorities();
            if (authorities == null) return null;
            return authorities;
        } else return null;
    }
}
