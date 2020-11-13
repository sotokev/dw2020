package com.umg.dw.ks.api.controller;

import com.umg.dw.ks.api.repository.ProductRepository;
import com.umg.dw.ks.core.entities.Person;
import com.umg.dw.ks.core.entities.Product;
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

@Api(value = "/", description = "REST Product")
@RestController
@RequestMapping("/producto")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    private EmitterProcessor<Product> notificationProcessor;

    @PostConstruct
    private void createProcessor() {
        notificationProcessor = EmitterProcessor.create();
    }

    @CrossOrigin
    @RequestMapping(
            value = "/all",
            method = RequestMethod.GET,
            produces = "application/json")
    public List<Product> getAll() {
        productRepository.flush();
        return (List<Product>) productRepository.findAll();
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
    public Product getProduct(@PathVariable("id") int id){
        Optional<Product> product = productRepository.findById(id);
        return product.get();
    }

    @RequestMapping(
            value = "/",
            method = RequestMethod.POST,
            produces = "application/json")
    public Product create(@RequestBody Product producto) {
        producto = productRepository.saveAndFlush(producto);
        notificationProcessor.onNext(producto);
        return producto;
    }


    @RequestMapping(
            value = "/",
            method = RequestMethod.PUT,
            produces = "application/json")
    public Product update(@RequestBody Product producto) {
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
        Product product = new Product();
        product.setId(((Double) Math.random()).intValue());
        notificationProcessor.onNext(product);
    }

    @GetMapping(
            value = "/notification/sse"
    )
    public Flux<ServerSentEvent<Product>> getJobResultNotification() {

        return Flux.merge(
                getNotificationHeartbeat(),
                getProductSSE()
        );

    }

    private Flux<ServerSentEvent<Product>> getProductSSE() {
        return notificationProcessor
                .log()
                .map(
                        (producto) -> {
                            System.out.println("Sending Producto:" + producto.getId());
                            return ServerSentEvent.<Product>builder()
                                    .id(UUID.randomUUID().toString())
                                    .event("product-result")
                                    .data(producto)
                                    .build();
                        }
                )
                .concatWith(Flux.never());
    }

    private Flux<ServerSentEvent<Product>> getNotificationHeartbeat() {
        return Flux.interval(Duration.ofSeconds(15))
                .map(i -> {
                    System.out.println(String.format("sending heartbeat [%s] ...", i.toString()));
                    return ServerSentEvent.<Product>builder()
                            .id(String.valueOf(i))
                            .event("heartbeat-result")
                            .data(null)
                            .build();
                });
    }
}
