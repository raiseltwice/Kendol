package com.raiseltwice.kendol.service;

import com.raiseltwice.kendol.model.Genre;
import com.raiseltwice.kendol.model.User;
import com.raiseltwice.kendol.repository.GenreRepository;
import com.raiseltwice.kendol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(Integer.parseInt(id));
    }

}
