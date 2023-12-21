package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.feedback.FeedbackDto;
import dev.danilbel.backend.entity.FeedbackEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {

    FeedbackDto map(FeedbackEntity feedbackEntity);

    @Mapping(target = "id", ignore = true)
    FeedbackEntity map(FeedbackDto feedbackDto);
}
