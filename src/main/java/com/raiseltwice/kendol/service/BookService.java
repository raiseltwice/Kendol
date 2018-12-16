package com.raiseltwice.kendol.service;

import com.raiseltwice.kendol.model.Author;
import com.raiseltwice.kendol.model.Book;
import com.raiseltwice.kendol.model.Genre;
import com.raiseltwice.kendol.repository.AuthorRepository;
import com.raiseltwice.kendol.repository.BookRepository;
import com.raiseltwice.kendol.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private GenreRepository genreRepository;

    public ResponseEntity<String> save(MultipartFile file, String authorName, String genreTitle, String title) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get("C:\\Projects\\KendolFinal\\pdf_storage\\" + file.getOriginalFilename());
            Files.write(path, bytes);
            Author author = authorRepository.findAuthorByFullName(authorName).orElse(null);
            if(author == null) {
                author = authorRepository.save(new Author(authorName));
            }
            Genre genre = genreRepository.findGenreByTitle(genreTitle).orElse(null);
            if(genre == null) {
                genre = genreRepository.save(new Genre(genreTitle));
            }
            bookRepository.save(new Book(title, path.toString(), author, genre, null));
        } catch (IOException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/plain"));
        return new ResponseEntity<>("Success", headers, HttpStatus.OK);
    }

    public void saveBook(Book book) {
        bookRepository.save(book);
    }

    public ResponseEntity<byte[]> getBookFile(String id) throws IOException {
        Book book = bookRepository.findById(Integer.parseInt(id)).orElse(null);
        Path path;
        if(book != null) {
            path = Paths.get(book.getPdfPath());
        } else return null;

        byte[] content = Files.readAllBytes(path);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }

    public Book findById(String id) {
        return bookRepository.findById(Integer.parseInt(id)).orElse(null);
    }

    public Book update(String id, String title, String fullName, String genreTitle) {
        Book book = bookRepository.findById(Integer.parseInt(id)).orElse(null);
        if (book != null) {
            book.setTitle(title);
            book.setAuthor(authorRepository.findAuthorByFullName(fullName).get());
            book.setGenre(genreRepository.findGenreByTitle(genreTitle).get());
            book = bookRepository.save(book);
        }
        return book;
    }

    public void delete(String id){
        bookRepository.findById(Integer.parseInt(id)).ifPresent(book -> bookRepository.delete(book));
    }

    public Iterable<Book> findAll() {
        return bookRepository.findAll();
    }

    public Iterable<Book> findAllBooksToValidate() {
        return bookRepository.findByIsApproved(null);
    }

    public Iterable<Book> findAllValidatedBooks() {
        return bookRepository.findByIsApproved(1);
    }

    public Iterable<Book> findByTitleAndAuthorAndGenre(String title, String author, String genre) {
        return bookRepository.findByIsApprovedAndTitleContainingAndAuthorIdEqualsAndGenreIdEquals(
                1, title,
                    authorRepository.findAuthorByFullName(author).get().getId(),
                        genreRepository.findGenreByTitle(genre).get().getId());
    }

    public Iterable<Book> findByAuthorAndGenre(String author, String genre) {
        return bookRepository.findByIsApprovedAndAuthorIdEqualsAndGenreIdEquals(
                1,
                authorRepository.findAuthorByFullName(author).get().getId(),
                genreRepository.findGenreByTitle(genre).get().getId());
    }

    public Iterable<Book> findByTitle(String title) {
        return bookRepository.findByIsApprovedAndTitleContaining(
                1, title);
    }

    public Iterable<Book> findByAuthor(String author) {
        return bookRepository.findByIsApprovedAndAuthorIdEquals(
                1, authorRepository.findAuthorByFullName(author).get().getId());
    }

    public Iterable<Book> findByGenre(String genre) {
        return bookRepository.findByIsApprovedAndGenreIdEquals(
                1, genreRepository.findGenreByTitle(genre).get().getId());
    }
}
