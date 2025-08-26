package com.insurance.accumulator.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SwaggerController {

    @GetMapping(value = "/api-docs", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getOpenApiSpec() {
        return """
        {
          "openapi": "3.0.1",
          "info": {
            "title": "Insurance Accumulator API",
            "description": "API for managing insurance benefit plans, deductibles, and out-of-pocket maximums",
            "version": "1.0.0",
            "contact": {
              "name": "Insurance Team",
              "email": "support@insurance.com"
            }
          },
          "servers": [
            {
              "url": "http://localhost:8080",
              "description": "Development Server"
            }
          ],
          "paths": {
            "/benefitPlans": {
              "get": {
                "tags": ["BenefitPlan Management"],
                "summary": "Get Plan Benefits for a member",
                "description": "Retrieve plan benefits including coverage details, cost shares, and benefits for a specific member",
                "parameters": [
                  {
                    "name": "memberId",
                    "in": "query",
                    "required": true,
                    "description": "Member ID",
                    "schema": {
                      "type": "string",
                      "example": "M001"
                    }
                  },
                  {
                    "name": "hipaaCodes",
                    "in": "query",
                    "required": false,
                    "description": "List of HIPAA codes",
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "example": ["30", "35"]
                    }
                  },
                  {
                    "name": "covgStartDt",
                    "in": "query",
                    "required": true,
                    "description": "Coverage start date (yyyy-MM-dd)",
                    "schema": {
                      "type": "string",
                      "format": "date",
                      "example": "2024-01-01"
                    }
                  },
                  {
                    "name": "covgEndDt",
                    "in": "query",
                    "required": true,
                    "description": "Coverage end date (yyyy-MM-dd)",
                    "schema": {
                      "type": "string",
                      "format": "date",
                      "example": "2024-12-31"
                    }
                  }
                ],
                "responses": {
                  "200": {
                    "description": "Successfully retrieved plan benefits",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Response"
                        }
                      }
                    }
                  },
                  "400": {
                    "description": "Invalid request parameters",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Response"
                        }
                      }
                    }
                  },
                  "404": {
                    "description": "Member not found",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Response"
                        }
                      }
                    }
                  },
                  "500": {
                    "description": "Internal server error",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Response"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "components": {
            "schemas": {
              "Response": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "description": "Response status",
                    "example": "SUCCESS"
                  },
                  "code": {
                    "type": "string",
                    "description": "HTTP status code",
                    "example": "200"
                  },
                  "message": {
                    "type": "string",
                    "description": "Response message",
                    "example": "Plan benefits retrieved successfully"
                  },
                  "data": {
                    "$ref": "#/components/schemas/DataResponse"
                  },
                  "details": {
                    "type": "string",
                    "description": "Additional details"
                  },
                  "timestamp": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Response timestamp"
                  }
                }
              },
              "DataResponse": {
                "type": "object",
                "properties": {
                  "plans": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Plan"
                    },
                    "description": "List of insurance plans"
                  }
                }
              },
              "Plan": {
                "type": "object",
                "properties": {
                  "planId": {
                    "type": "string",
                    "description": "Plan identifier"
                  },
                  "planName": {
                    "type": "string",
                    "description": "Plan name"
                  },
                  "planType": {
                    "type": "string",
                    "description": "Plan type"
                  }
                }
              }
            }
          }
        }
        """;
    }
}
