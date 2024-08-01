package dev.common.exception.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.http.HttpStatusCode;
import org.springframework.lang.Nullable;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
public class ApiExceptionResponse {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    // check Date type
    private final ZonedDateTime timestamp = ZonedDateTime.now(ZoneId.of("UTC"));

    private final String url;
    private final String message;
    private final int statusCode;
    private final String desc;

    @JsonProperty("validationErrors")
    @Nullable
    List<FieldViolation> fieldViolations;

    public ApiExceptionResponse(
        String url, String message, HttpStatusCode status, String desc,
        @Nullable List<FieldViolation> fieldViolations) {
        this.url = url;
        this.message = message;
        this.statusCode = status.value();
        this.desc = desc;
        this.fieldViolations = fieldViolations;
    }

    public ApiExceptionResponse(
        String url, String message, HttpStatusCode status, String desc) {
        this.url = url;
        this.message = message;
        this.statusCode = status.value();
        this.desc = desc;
        this.fieldViolations = null;
    }
}
