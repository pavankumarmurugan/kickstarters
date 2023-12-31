package com.gateway.service.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/api/v1/auth/registerUser",
            "/api/v1/auth/signin",
            "/api/v1/auth/confirm",
            "/eureka",
            "/api-docs",
            "/swagger-ui",
            "/api/v1/job/service/allJobsForHomepage",
            "/api/v1/job/service/jobseekerJobSearch"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}
