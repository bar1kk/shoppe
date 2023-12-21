package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.feedback.FeedbackDto;
import dev.danilbel.backend.service.FeedbackService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Feedback")
public class FeedbackController {

    private static final String CONTACT = "api/v1/feedback";

    FeedbackService feedbackService;

    ControllerHelper controllerHelper;

    @PostMapping(CONTACT)
    public ResponseEntity<FeedbackDto> createFeedback(@RequestBody @Valid FeedbackDto feedbackDto,
                                                     BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "FeedbackController.createContact");

        FeedbackDto result = feedbackService.createFeedback(feedbackDto);

        return ResponseEntity.ok(result);
    }
}
