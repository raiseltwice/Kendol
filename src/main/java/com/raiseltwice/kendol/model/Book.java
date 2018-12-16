package com.raiseltwice.kendol.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;

    private String pdfPath;

    private Integer isApproved;



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

    public Integer getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Integer approved) {
        isApproved = approved;
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

    public Book(String title, String pdfPath, Author author, Genre genre, Integer isApproved) {
        this.title = title;
        this.pdfPath = pdfPath;
        this.author = author;
        this.genre = genre;
        this.isApproved = isApproved;
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

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", pdfPath='" + pdfPath + '\'' +
                ", author=" + author +
                ", genre=" + genre +
                '}';
    }
}
