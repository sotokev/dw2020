package com.umg.dw.ks.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableCaching
@EnableSwagger2
@EntityScan(basePackages = {"com.umg.dw.ks.core.entities"})
@EnableJpaRepositories(basePackages = {"com.umg.dw.ks.api"})
@ComponentScan(basePackages = {"com.umg.dw"})
@EnableEurekaClient
public class DwParcial1Application extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(DwParcial1Application.class, args);
	}

}
