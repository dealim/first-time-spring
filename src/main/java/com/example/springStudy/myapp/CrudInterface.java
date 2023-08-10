package com.example.springStudy.myapp;

import com.example.springStudy.model.Header;

public interface CrudInterface<T> {

    Header<T> create(Header<T> request);

    Header<T> read(Integer id);

    Header<T> update(Header<T> request);

    Header delete(Integer id);
}
