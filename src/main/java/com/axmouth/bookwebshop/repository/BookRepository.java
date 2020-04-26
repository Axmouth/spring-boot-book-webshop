package com.axmouth.bookwebshop.repository;


import com.axmouth.bookwebshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
