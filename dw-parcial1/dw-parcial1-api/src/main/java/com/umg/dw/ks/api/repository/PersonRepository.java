/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.umg.dw.ks.api.repository;


import com.umg.dw.ks.core.entities.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface PersonRepository
        extends PagingAndSortingRepository<Person, Integer>,
        QueryByExampleExecutor<Person>, CrudRepository<Person, Integer> {

}
