-- Insurance Accumulator System Database Initialization
-- PostgreSQL Database Schema

-- Create database (run this as superuser)
-- CREATE DATABASE insurance_accumulator;

-- Connect to the database
-- \c insurance_accumulator;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core tables
CREATE TABLE IF NOT EXISTS product
(
    product_id                      VARCHAR(4) PRIMARY KEY,
    product_name                    VARCHAR(50) NOT NULL,
    product_eff_dt                  DATE NOT NULL,
    product_term_dt                 DATE NOT NULL default '9999-12-31',
    created_by                      VARCHAR(10) default 'aarush',
    updated_by                      VARCHAR(10) ,
    create_dt                       TIMESTAMP default CURRENT_DATE,
    update_dt                       TIMESTAMP
);



CREATE TABLE IF NOT EXISTS benefit
(
    bnf_id                          integer PRIMARY KEY,
    bnf_name                        VARCHAR(50),
    bnf_pfx                         VARCHAR(4),
    bnf_eff_dt                      DATE NOT NULL,
    bnf_term_dt                     DATE NOT NULL,
    bnf_rule_id                     VARCHAR(10) NOT NULL,
    hipaa_cd                        VARCHAR(10),
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);



CREATE TABLE IF NOT EXISTS deduct
(
    dect_id                        INTEGER PRIMARY KEY ,
    dect_pfx                        VARCHAR(4),
    accum_number                    INTEGER,
    dect_name                       VARCHAR(50),
    dect_fam_amt                    DECIMAL(10, 2),
    dect_indv_amt                   DECIMAL(10, 2),
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);



CREATE TABLE IF NOT EXISTS OOP
(
    OPP_ID                          INTEGER PRIMARY KEY,
    OOP_pfx                         VARCHAR(4),
    OOP_name                        VARCHAR(50),
    accum_number                    INTEGER,
    OOP_fam_amt                     DECIMAL(10, 2),
    OOP_indv_amt                    DECIMAL(10, 2),
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);



CREATE TABLE IF NOT EXISTS plan
(
    plan_id                         INTEGER PRIMARY KEY,
    plan_name                       VARCHAR(50) NOT NULL,
    plan_type                       VARCHAR(10),
    plan_eff_dt                     DATE NOT NULL,
    plan_term_dt                    DATE NOT NULL,
    product_id                      VARCHAR(4) REFERENCES product(product_id),
    dect_pfx                        VARCHAR(4) NOT NULL,
    OOP_pfx                         VARCHAR(4) NOT NULL,
    bnf_pfx                         VARCHAR(4) NOT NULL,
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);



CREATE TABLE IF NOT EXISTS ben_limit
(
    lmt_id                          INTEGER PRIMARY KEY,
    bnf_id                          VARCHAR(4),
    lmt_name                        VARCHAR(50),
    lmt_amt                         DECIMAL(10,2),
    lmt_type                        VARCHAR(1),
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);




CREATE TABLE IF NOT EXISTS cop_coins
(
    cop_coins_id                    INTEGER PRIMARY KEY,
    bnf_id                          VARCHAR(4) ,
    bnf_allow_amt                   DECIMAL(10,2),
    bnf_allow_ctr                   INTEGER,
    bnf_cop_amt                     DECIMAL(10,2),
    bnf_coins_pct                   INTEGER,
    accum_number                    INTEGER,
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);




CREATE TABLE IF NOT EXISTS member
(
    id                    INTEGER PRIMARY KEY,
    member_id                          VARCHAR(10) ,
    member_name                       VARCHAR(50),
    member_dob                      DATE,
    product_id                      VARCHAR(4),
    address                   VARCHAR(100),
    member_eff_dt           date,
    member_term_dt          date,
    created_by                      VARCHAR(10),
    updated_by                      VARCHAR(10),
    create_dt                       TIMESTAMP,
    update_dt                       TIMESTAMP
);


COMMIT;