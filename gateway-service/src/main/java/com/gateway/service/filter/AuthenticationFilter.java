package com.gateway.service.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import com.gateway.service.util.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config>{
	
	@Autowired
    private RouteValidator validator;
	
	@Autowired
    private JwtUtil jwtUtil;
	
	public AuthenticationFilter() {
		super(Config.class);
	}

	public static class Config {
		
	}

	@Override
	public GatewayFilter apply(Config config) {
		
		return ((exchange, chain) -> {
			ServerHttpRequest request = null;
            if (validator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }
                try {
                    jwtUtil.validateToken(authHeader);
                    
                    request = exchange.getRequest()
                    .mutate().header("loggedInUser", jwtUtil.extractUsername(authHeader)).build();

                } catch (Exception e) {
                    throw new RuntimeException("un authorized access to application");
                }
            }
            return chain.filter(exchange.mutate().request(request).build());
        });
	}
	

}
