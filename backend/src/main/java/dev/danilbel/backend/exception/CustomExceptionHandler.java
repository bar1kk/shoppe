package dev.danilbel.backend.exception;

import dev.danilbel.backend.dto.exception.ExceptionResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;

@ControllerAdvice
@Slf4j
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAllExceptions(Exception e, WebRequest request) throws Exception {

        log.info("IN CustomExceptionHandler.handleAllExceptions - Exception: {}, message: {}", e.getClass(), e.getMessage());

        return handleException(e, request);
    }

    @Override
    @Nonnull
    protected ResponseEntity<Object> createResponseEntity(@Nullable Object body,
                                                          @Nonnull HttpHeaders headers,
                                                          @Nonnull HttpStatusCode statusCode,
                                                          @Nonnull WebRequest request) {

        if (body instanceof ProblemDetail) {

            ExceptionResponseDto exceptionResponse = ExceptionResponseDto.builder()
                    .status(statusCode.value())
                    .error(((ProblemDetail) body).getTitle())
                    .message(((ProblemDetail) body).getDetail())
                    .build();

            return new ResponseEntity<>(exceptionResponse, headers, statusCode);
        } else {
            return super.createResponseEntity(body, headers, statusCode, request);
        }
    }
}
