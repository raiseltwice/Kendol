package com.raiseltwice.kendol.controller;

import com.raiseltwice.kendol.model.Book;
import com.raiseltwice.kendol.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/api/validate-book")
@CrossOrigin
public class BooksToValidateController {


    @Autowired
    private BookService bookService;


    @GetMapping(path = "/{id}")
    public @ResponseBody void getBookFile(@PathVariable String id) {
        Book book = bookService.findById(id);
        book.setIsApproved(1);
        bookService.saveBook(book);
    }


}

