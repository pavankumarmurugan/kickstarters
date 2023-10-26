package com.profile.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.profile.service.response.MessageResponse;

@ControllerAdvice
class GeneralExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponse> handleException(Exception e) {
    	return new ResponseEntity<>(new MessageResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
