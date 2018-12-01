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
    public @ResponseBody void addBook(@RequestParam("file") MultipartFile file, @RequestParam("author") String authorName,
                                         @RequestParam("genre") String genreId, @RequestParam("title") String title) {
        bookService.save(file, authorName, genreId, title);
    }

    @GetMapping(path = "/file")
    public @ResponseBody ResponseEntity<byte[]> getBookFile(@RequestParam("id") String id) throws IOException {
        return bookService.getBookFile(id);
    }

    @GetMapping("/{id}")
    public @ResponseBody Book getBook(@PathVariable String id) {
        return bookService.findById(id);
    }

    @PutMapping
    public @ResponseBody void updateBook(@RequestParam("id") String id, @RequestParam("title") String title,
                                         @RequestParam("author") String fullName, @RequestParam("genre") String genreTitle) {
        bookService.update(id, title, fullName, genreTitle);
    }

    @DeleteMapping
    public @ResponseBody void deleteBook(@RequestParam("id") String id){
        bookService.delete(id);
    }

    @GetMapping
    public @ResponseBody Iterable<Book> getAllBooks() {
        return bookService.findAll();
    }

}

