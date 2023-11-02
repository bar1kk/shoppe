package dev.danilbel.backend.exception;

import dev.danilbel.backend.dto.exception.ExceptionResponseDto;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Hidden
public class CustomErrorController implements ErrorController {

    private static final String PATH = "/error";

    ErrorAttributes errorAttributes;

    @RequestMapping(PATH)
    public ResponseEntity<ExceptionResponseDto> error(WebRequest request) {

        Map<String, Object> attributes = errorAttributes.getErrorAttributes(
                request,
                ErrorAttributeOptions.of(ErrorAttributeOptions.Include.EXCEPTION, ErrorAttributeOptions.Include.MESSAGE)
        );

        ResponseEntity<ExceptionResponseDto> responseResponseEntity = ResponseEntity
                .status((int) attributes.get("status"))
                .body(
                        ExceptionResponseDto.builder()
                                .status((int) attributes.get("status"))
                                .error((String) attributes.get("error"))
                                .message((String) attributes.get("message"))
                                .build()
                );

        log.info("IN CustomErrorController.error - ExceptionResponseDto: {}", responseResponseEntity.getBody());

        return responseResponseEntity;
    }
}
