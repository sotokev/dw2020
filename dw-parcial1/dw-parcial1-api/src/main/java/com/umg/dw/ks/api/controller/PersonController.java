package com.umg.dw.ks.api.controller;

import com.umg.dw.ks.api.repository.PersonRepository;
import com.umg.dw.ks.core.entities.Person;
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
@RequestMapping("/persona")
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    private EmitterProcessor<Person> notificationProcessor;

    @PostConstruct
    private void createProcessor(){
        notificationProcessor = EmitterProcessor.create();
    }

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

        System.out.println("Notificando nueva persona:"+persona.getName());
        notificationProcessor.onNext(persona);

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

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.DELETE,
            produces = "application/json")
    public void delete(@PathVariable("id") int id) {
        personRepository.deleteById(id);
    }

    private Flux<ServerSentEvent<Person>> getPersonaSSE() {

        // SSE
        // notification processor retorna un FLUX en el cual podemos estar "suscritos" cuando este tenga otro valor ...
        return notificationProcessor
                .log()
                .map(
                        (persona) -> {
                            System.out.println("Sending Persona:" + persona.getId());
                            return ServerSentEvent.<Person>builder()
                                    .id(UUID.randomUUID().toString())
                                    .event("persona-result")
                                    .data(persona)
                                    .build();
                        }
                )
                .concatWith(Flux.never());
    }

    private Flux<ServerSentEvent<Person>> getNotificationHeartbeat() {
        return Flux.interval(Duration.ofSeconds(15))
                .map(i -> {
                    System.out.println(String.format("sending heartbeat [%s] ...", i.toString()));
                    return ServerSentEvent.<Person>builder()
                            .id(String.valueOf(i))
                            .event("heartbeat-result")
                            .data(null)
                            .build();
                });
    }

    @GetMapping(
            value = "/notification/sse"
    )
    public Flux<ServerSentEvent<Person>> getJobResultNotification() {

        // enviar dos flujos al mismo tiempo
        return Flux.merge(
                getNotificationHeartbeat(),
                getPersonaSSE()
        );

    }
}
