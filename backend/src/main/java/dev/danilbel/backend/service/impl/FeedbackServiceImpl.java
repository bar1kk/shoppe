package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.feedback.FeedbackDto;
import dev.danilbel.backend.entity.FeedbackEntity;
import dev.danilbel.backend.mapper.FeedbackMapper;
import dev.danilbel.backend.repository.FeedbackRepository;
import dev.danilbel.backend.service.FeedbackService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class FeedbackServiceImpl implements FeedbackService {

    FeedbackRepository feedbackRepository;

    FeedbackMapper feedbackMapper;

    @Override
    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {

        FeedbackEntity feedbackEntity = feedbackMapper.map(feedbackDto);

        feedbackEntity = feedbackRepository.save(feedbackEntity);

        log.info("IN FeedbackServiceImpl.createFeedback - feedback: {} successfully created", feedbackEntity);
        return feedbackMapper.map(feedbackEntity);
    }
}
