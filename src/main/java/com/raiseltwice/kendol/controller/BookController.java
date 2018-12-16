package com.raiseltwice.kendol.controller;

import com.raiseltwice.kendol.model.Book;
import com.raiseltwice.kendol.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping(path = "/api/book")
@CrossOrigin
public class BookController {


    @Autowired
    private BookService bookService;

    @PostMapping
    public @ResponseBody ResponseEntity<String> addBook(@RequestParam("file") MultipartFile file, @RequestParam("author") String authorName,
                                         @RequestParam("genre") String genreId, @RequestParam("title") String title) {
        return bookService.save(file, authorName, genreId, title);
    }

    @GetMapping(path = "/file")
    public @ResponseBody ResponseEntity<byte[]> getBookFile(@RequestParam("id") String id) throws IOException {
        return bookService.getBookFile(id);
    }

    @GetMapping("/{id}")
    public @ResponseBody Book getBook(@PathVariable String id) {
        return bookService.findById(id);
    }

    @PostMapping(path = "/update")
    public @ResponseBody void updateBook(@RequestParam("id") String id, @RequestParam("title") String title,
                                         @RequestParam("author") String fullName,
                                         @RequestParam("genre") String genreTitle
    ) {
        bookService.update(id, title, fullName, genreTitle);
    }

    @PostMapping(path = "/delete")
    public @ResponseBody void deleteBook(@RequestParam("id") String id){
        bookService.delete(id);
    }

    @GetMapping
    public @ResponseBody Iterable<Book> getAllBooks() {
        return bookService.findAll();
    }

    @GetMapping(path = "/to-validate")
    public @ResponseBody Iterable<Book> getAllBooksToValidate() {
        return bookService.findAllBooksToValidate();
    }

    @GetMapping(path = "/validated")
    public @ResponseBody Iterable<Book> getAllValidatedBooks() {
        return bookService.findAllValidatedBooks();
    }

}

