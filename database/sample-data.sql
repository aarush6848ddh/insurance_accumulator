-- Sample Data for Insurance Accumulator System
-- This script populates the database with sample data for testing and development

-- Insert Products
INSERT INTO product (product_id, product_name, product_eff_dt, product_term_dt, created_by, create_dt) VALUES
('P001', 'Premium Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P002', 'Standard Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP);

-- Insert Members
INSERT INTO member (id, member_id, member_name, member_dob, product_id, address, member_eff_dt, member_term_dt, created_by, create_dt) VALUES
(1, 'M001', 'John Doe', '1985-03-15', 'P001', '123 Main St, City, State', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(2, 'M002', 'Jane Smith', '1990-07-22', 'P001', '456 Oak Ave, City, State', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(3, 'M003', 'Bob Johnson', '1978-11-08', 'P002', '789 Pine Rd, City, State', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP);

-- Insert Deductibles
INSERT INTO deduct (dect_id, dect_pfx, accum_number, dect_name, dect_fam_amt, dect_indv_amt, created_by, create_dt) VALUES
(1, 'D001', 1, 'Individual Deductible', 3000.00, 1500.00, 'system', CURRENT_TIMESTAMP),
(2, 'D002', 1, 'Family Deductible', 6000.00, 3000.00, 'system', CURRENT_TIMESTAMP);

-- Insert Out-of-Pocket Maximums
INSERT INTO oop (opp_id, oop_pfx, oop_name, accum_number, oop_fam_amt, oop_indv_amt, created_by, create_dt) VALUES
(1, 'O001', 'Individual OOP Max', 1, 6000.00, 3000.00, 'system', CURRENT_TIMESTAMP),
(2, 'O002', 'Family OOP Max', 1, 12000.00, 6000.00, 'system', CURRENT_TIMESTAMP);

-- Insert Benefits
INSERT INTO benefit (bnf_id, bnf_name, bnf_pfx, bnf_eff_dt, bnf_term_dt, bnf_rule_id, hipaa_cd, created_by, create_dt) VALUES
(1, 'Primary Care Visit', 'B001', '2024-01-01', '2024-12-31', 'R001', '30', 'system', CURRENT_TIMESTAMP),
(2, 'Specialist Visit', 'B001', '2024-01-01', '2024-12-31', 'R002', '35', 'system', CURRENT_TIMESTAMP),
(3, 'Emergency Room', 'B001', '2024-01-01', '2024-12-31', 'R003', '45', 'system', CURRENT_TIMESTAMP),
(4, 'Prescription Drugs', 'B001', '2024-01-01', '2024-12-31', 'R004', '40', 'system', CURRENT_TIMESTAMP);

-- Insert Plans
INSERT INTO plan (plan_id, plan_name, plan_type, plan_eff_dt, plan_term_dt, product_id, dect_pfx, oop_pfx, bnf_pfx, created_by, create_dt) VALUES
(1, 'Premium Health Plan', 'PPO', '2024-01-01', '2024-12-31', 'P001', 'D001', 'O001', 'B001', 'system', CURRENT_TIMESTAMP),
(2, 'Standard Health Plan', 'HMO', '2024-01-01', '2024-12-31', 'P002', 'D002', 'O002', 'B001', 'system', CURRENT_TIMESTAMP);

-- Insert Copay/Coinsurance
INSERT INTO cop_coins (cop_coins_id, bnf_id, bnf_allow_amt, bnf_allow_ctr, bnf_cop_amt, bnf_coins_pct, accum_number, created_by, create_dt) VALUES
(1, '1', 150.00, 1, 25.00, 0, 1, 'system', CURRENT_TIMESTAMP),
(2, '2', 200.00, 1, 40.00, 0, 1, 'system', CURRENT_TIMESTAMP),
(3, '3', 500.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP),
(4, '4', 100.00, 1, 15.00, 0, 1, 'system', CURRENT_TIMESTAMP);

-- Insert Benefit Limits
INSERT INTO ben_limit (lmt_id, bnf_id, lmt_name, lmt_amt, lmt_type, created_by, create_dt) VALUES
(1, '1', 'Primary Care Visit Limit', 12, 'V', 'system', CURRENT_TIMESTAMP),
(2, '2', 'Specialist Visit Limit', 8, 'V', 'system', CURRENT_TIMESTAMP),
(3, '3', 'Emergency Room Limit', 1000.00, 'D', 'system', CURRENT_TIMESTAMP);

COMMIT;

