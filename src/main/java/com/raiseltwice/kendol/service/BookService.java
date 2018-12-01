package com.raiseltwice.kendol.service;

import com.raiseltwice.kendol.model.Author;
import com.raiseltwice.kendol.model.Book;
import com.raiseltwice.kendol.repository.AuthorRepository;
import com.raiseltwice.kendol.repository.BookRepository;
import com.raiseltwice.kendol.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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

    public Book save(MultipartFile file, String authorName, String genreId, String title) {
        Book book = null;
        try {
            byte[] bytes = file.getBytes();
            System.out.println(file.getOriginalFilename());
            System.out.println(genreId + title + authorName);
            Path path = Paths.get("C:\\Projects\\Kendol\\pdf_storage\\" + file.getOriginalFilename());
            Files.write(path, bytes);
            Author author = authorRepository.findAuthorByFullName(authorName).orElse(new Author(authorName));
            book = bookRepository.save(new Book(title, path.toString(), author,
                    genreRepository.findById(Integer.parseInt(genreId)).get()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return book;
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
        // Here you have to set the actual filename of your pdf
//        String filename = "output.pdf";
//        headers.setContentDispositionFormData(filename, filename);
//        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
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
}
