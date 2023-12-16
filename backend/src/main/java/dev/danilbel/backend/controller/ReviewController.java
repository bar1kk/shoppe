package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.review.CreateReviewDto;
import dev.danilbel.backend.dto.review.ReviewDto;
import dev.danilbel.backend.service.ReviewService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.security.Principal;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Review")
public class ReviewController {

    private static final String REVIEW_CREATE = "api/v1/reviews/create";

    ReviewService reviewService;

    ControllerHelper controllerHelper;

    @PostMapping(REVIEW_CREATE)
    public ResponseEntity<ReviewDto> createReviewByUserEmail(@RequestBody @Valid CreateReviewDto createReviewDto,
                                                             Principal principal,
                                                             BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "ReviewController.createReviewByUserEmail");

        ReviewDto reviewDto = reviewService.createReviewByUserEmail(principal.getName(), createReviewDto);

        return new ResponseEntity<>(reviewDto, HttpStatus.CREATED);
    }
}
