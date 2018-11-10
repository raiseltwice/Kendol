package com.raiseltwice.kendol.controllers;

import com.raiseltwice.kendol.models.Author;
import com.raiseltwice.kendol.models.Book;
import com.raiseltwice.kendol.repos.AuthorRepository;
import com.raiseltwice.kendol.repos.BookRepository;
import com.raiseltwice.kendol.repos.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping(path = "/api")
@CrossOrigin
public class BookController {

    @Autowired
    private BookRepository bookRepository;


    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private GenreRepository genreRepository;

//    @PostMapping(path="/addBook/") // Map ONLY GET Requests
//    public @ResponseBody Book addBook  (@RequestBody Integer authorId,
//                                         @RequestBody Integer genreId, @RequestBody Book book) {
//        return authorRepository.findById(authorId).map(author -> {
//            book.setAuthor(author);
//            return genreRepository.findById(genreId).map(genre -> {
//                book.setGenre(genre);
//                return book;
//            }).orElseThrow(() -> new RuntimeException("GenreId" + genreId + "was not found"));
//        }).orElseThrow(() -> new RuntimeException("AuthorId" + authorId + "was not found"));
//    }
    @PostMapping(path="/addBook")
    //public @ResponseBody void addBook  (@RequestBody Map<String, Object> json) {
    public @ResponseBody void addBook(@RequestParam("file") MultipartFile file, @RequestParam("author") String authorName,
                                         @RequestParam("genre") String genreId, @RequestParam("title") String title) {
        try {
            byte[] bytes = file.getBytes();
            System.out.println(file.getOriginalFilename());
            System.out.println(genreId + title + authorName);
            Path path = Paths.get("C:\\Projects\\Kendol\\pdf_storage\\" + file.getOriginalFilename());
            Files.write(path, bytes);
            //Optional<Author> = authorRepository.findAuthorByFullName(authorName).;
            Author author;
            if (authorRepository.findAuthorByFullName(authorName).isPresent())
                author = authorRepository.findAuthorByFullName(authorName).get();
            else
                author = authorRepository.save(new Author(authorName));

            bookRepository.save(new Book(
                    title,
                    path.toString(),
                    author,
                    genreRepository.findById(Integer.parseInt(genreId)).get()
            ));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping(path = "/getBookFile")
    public @ResponseBody ResponseEntity<byte[]> getBookFile(@RequestParam("id") String id) throws IOException {
        Path path = Paths.get(bookRepository.findById(Integer.parseInt(id)).get().getPdfPath());
        byte[] content = Files.readAllBytes(path);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        // Here you have to set the actual filename of your pdf
//        String filename = "output.pdf";
//        headers.setContentDispositionFormData(filename, filename);
//        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }

    @GetMapping(path = "/getBook")
    public @ResponseBody Book getBook(@RequestParam("id") String id){

        return bookRepository.findById(Integer.parseInt(id)).get();
    }

    @GetMapping(path = "/updateBook")
    public @ResponseBody void updateBook(@RequestParam("id") String id, @RequestParam("title") String title,
                                         @RequestParam("author") String fullName, @RequestParam("genre") String genreTitle) {
        Book book = bookRepository.findById(Integer.parseInt(id)).get();
        book.setTitle(title);
        book.setAuthor(authorRepository.findAuthorByFullName(fullName).get());
        book.setGenre(genreRepository.findGenreByTitle(genreTitle).get());
        bookRepository.save(book);
    }

    @GetMapping(path = "/deleteBook")
    public @ResponseBody void deleteBook(@RequestParam("id") Integer id){
        bookRepository.delete(bookRepository.findById(id).get());
    }



    @GetMapping(path="/allBooks")
    public @ResponseBody Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}

