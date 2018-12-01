package com.raiseltwice.kendol.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Entity
public class Genre implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String title;

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

    public Genre() {
    }

    public Genre(@NotNull String title) {
        this.title = title;
    }
}
