package com.raiseltwice.kendol.model;



import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Author implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private String fullName;

    public Integer getId() {
        return id;
    }

    public Author() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Author(String fullName) {
        this.fullName = fullName;
    }
}
