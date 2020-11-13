/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.umg.dw.ks.api.repository;


import com.umg.dw.ks.core.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface ProductRepository
        extends JpaRepository<Product, Integer>,
        QueryByExampleExecutor<Product> {

}
