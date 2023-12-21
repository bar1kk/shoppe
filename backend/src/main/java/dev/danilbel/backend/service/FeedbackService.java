package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.feedback.FeedbackDto;

public interface FeedbackService {

    FeedbackDto createFeedback(FeedbackDto feedbackDto);
}
