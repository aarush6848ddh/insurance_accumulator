package com.insurance.accumulator.model;

import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Standard API response wrapper")
public class Response {

  @Schema(description = "Response status", example = "SUCCESS")
  String status;// Success. Failed, Data Not found,
  
  @Schema(description = "HTTP status code", example = "200")
  String code;
  
  @Schema(description = "Response data payload")
  private Object data;
  
  @Schema(description = "Response message", example = "Plan benefits retrieved successfully")
  String message;
  
  @Schema(description = "Additional details")
  String details;
  
  @Schema(description = "Response timestamp")
  Date timestamp;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }
  
  @SuppressWarnings("unchecked")
  public <T> T getData(Class<T> type) {
    return (T) data;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String details) {
    this.details = details;
  }

  public Date getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Date timestamp) {
    this.timestamp = timestamp;
  }

}
