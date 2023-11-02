package dev.danilbel.backend.dto.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ExceptionResponseDto {

    @Builder.Default
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    LocalDateTime timestamp = LocalDateTime.now();

    int status;

    String error;

    String message;
}
