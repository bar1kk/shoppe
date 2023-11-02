package dev.danilbel.backend.controller.helper;

import dev.danilbel.backend.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ControllerHelper {

    public void checkBindingResultElseThrowException(BindingResult bindingResult, String methodName) {
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                    .map(org.springframework.validation.ObjectError::getDefaultMessage)
                    .collect(Collectors.toList());

            String errorMessage = String.join(", ", errorMessages);
            log.error("IN BindingResultCheckerImpl.checkBindingResultElseThrowException - methodName: {} - errorMessage: '{}'", methodName, errorMessage);
            throw new BadRequestException(errorMessage);
        }
    }
}
