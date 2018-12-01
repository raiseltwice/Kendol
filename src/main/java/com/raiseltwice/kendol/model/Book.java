package com.raiseltwice.kendol.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String title;

    @NotNull
    private String pdfPath;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPdfPath() {
        return pdfPath;
    }

    public void setPdfPath(String pdfPath) {
        this.pdfPath = pdfPath;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Book(@NotNull String title, @NotNull String pdfPath, Author author, Genre genre) {
        this.title = title;
        this.pdfPath = pdfPath;
        this.author = author;
        this.genre = genre;
    }

//    @Autowired
//    private AuthorRepository authorRepository;
//    @Autowired
//    private GenreRepository genreRepository;
//    public Book(@NotNull String title, @NotNull String pdfPath, Integer authorId, Integer genreId) {
//        this.title = title;
//        this.pdfPath = pdfPath;
//        this.author = authorRepository.findById(authorId).get();
//        this.genre = genreRepository.findById(genreId).get();
//    }

    public Book() {
    }
}
