package com.insurance.accumulator.exception;

import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.insurance.accumulator.model.Response;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        
        Response response = new Response();
        response.setCode("400");
        response.setStatus("BAD_REQUEST");
        response.setMessage("Validation failed: " + errorMessage);
        response.setTimestamp(new Date());
        
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Response> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
        String errorMessage = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .collect(Collectors.joining(", "));
        
        Response response = new Response();
        response.setCode("400");
        response.setStatus("BAD_REQUEST");
        response.setMessage("Constraint violation: " + errorMessage);
        response.setTimestamp(new Date());
        
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        Response response = new Response();
        response.setCode("400");
        response.setStatus("BAD_REQUEST");
        response.setMessage(ex.getMessage());
        response.setTimestamp(new Date());
        
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handleGlobalException(Exception ex, WebRequest request) {
        Response response = new Response();
        response.setCode("500");
        response.setStatus("INTERNAL_SERVER_ERROR");
        response.setMessage("An unexpected error occurred: " + ex.getMessage());
        response.setTimestamp(new Date());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

