package com.umg.dw.ks.api.controller;

import com.umg.dw.ks.api.repository.PersonRepository;
import com.umg.dw.ks.core.entities.Person;
import com.umg.dw.ks.core.entities.Product;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value = "/", description = "REST Product")
@RestController
@RequestMapping("/persona")
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @CrossOrigin
    @RequestMapping(
            value = "/all",
            method = RequestMethod.GET,
            produces = "application/json")
    public List<Person> getAll() {
        return (List<Person>) personRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET,produces = "application/json")
    public Person getPerson(@PathVariable("id") int id){
        Optional<Person> persona = personRepository.findById(id);
        return persona.get();
    }

    @RequestMapping(
            value = "/",
            method = RequestMethod.POST,
            produces = "application/json")
    public Person create(@RequestBody Person persona) {
        persona = personRepository.save(persona);
        return persona;
    }


    @RequestMapping(
            value = "/",
            method = RequestMethod.PUT,
            produces = "application/json")
    public Person update(@RequestBody Person persona) {
        persona = personRepository.save(persona);
        return persona;
    }
}
