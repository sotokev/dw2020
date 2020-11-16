package com.umg.dw.ks.api.controller;

import com.umg.dw.ks.api.repository.ProductByPersonRepository;
import com.umg.dw.ks.api.repository.ProductRepository;
import com.umg.dw.ks.core.entities.Product;
import com.umg.dw.ks.core.entities.ProductByPerson;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Api(value = "/")
@RestController
@RequestMapping("/productByPerson")
public class ProductByPersonController {

    @Autowired
    ProductByPersonRepository productRepository;

    @CrossOrigin
    @RequestMapping(
            value = "/all",
            method = RequestMethod.GET,
            produces = "application/json")
    public List<ProductByPerson> getAll() {
        productRepository.flush();
        return (List<ProductByPerson>) productRepository.findAll();
    }

    @RequestMapping(
            value = "/count",
            method = RequestMethod.GET,
            produces = "application/json")
    public long count() {
        productRepository.flush();
        return productRepository.count();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET,produces = "application/json")
    public ProductByPerson getProduct(@PathVariable("id") int id){
        Optional<ProductByPerson> product = productRepository.findById(id);
        return product.get();
    }

    @RequestMapping(
            value = "/",
            method = RequestMethod.POST,
            produces = "application/json")
    public ProductByPerson create(@RequestBody ProductByPerson producto) {
        producto = productRepository.saveAndFlush(producto);
        return producto;
    }


    @RequestMapping(
            value = "/",
            method = RequestMethod.PUT,
            produces = "application/json")
    public ProductByPerson update(@RequestBody ProductByPerson producto) {
        producto = productRepository.saveAndFlush(producto);
        return producto;
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.DELETE,
            produces = "application/json")
    public void delete(@PathVariable("id") int id) {
        productRepository.deleteById(id);
        productRepository.flush();
    }
}
