package com.umg.dw.ks.api.controller;

import com.umg.dw.ks.api.repository.ProductRepository;
import com.umg.dw.ks.core.entities.Person;
import com.umg.dw.ks.core.entities.Product;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value = "/", description = "REST Product")
@RestController
@RequestMapping("/producto")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @CrossOrigin
    @RequestMapping(
            value = "/all",
            method = RequestMethod.GET,
            produces = "application/json")
    public List<Product> getAll() {
        return (List<Product>) productRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET,produces = "application/json")
    public Product getProduct(@PathVariable("id") int id){
        Optional<Product> product = productRepository.findById(id);
        return product.get();
    }

    @RequestMapping(
            value = "/",
            method = RequestMethod.POST,
            produces = "application/json")
    public Product create(@RequestBody Product producto) {
        producto = productRepository.save(producto);
        return producto;
    }


    @RequestMapping(
            value = "/",
            method = RequestMethod.PUT,
            produces = "application/json")
    public Product update(@RequestBody Product producto) {
        producto = productRepository.save(producto);
        return producto;
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.DELETE,
            produces = "application/json")
    public void delete(@PathVariable("id") int id) {
        productRepository.deleteById(id);
    }
}
