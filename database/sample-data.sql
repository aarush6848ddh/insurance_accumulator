-- Sample Data for Insurance Accumulator System
-- This script populates the database with comprehensive sample data for testing and development

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE ben_limit, cop_coins, plan, benefit, oop, deduct, member, product CASCADE;

-- Insert Products (8 different products)
INSERT INTO product (product_id, product_name, product_eff_dt, product_term_dt, created_by, create_dt) VALUES
('P001', 'Premium Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P002', 'Standard Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P003', 'Basic Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P004', 'Elite Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P005', 'Family Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P006', 'Senior Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P007', 'Student Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
('P008', 'Corporate Health Plan', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP);

-- Insert Members (20 members across different products)
INSERT INTO member (id, member_id, member_name, member_dob, product_id, address, member_eff_dt, member_term_dt, created_by, create_dt) VALUES
(1, 'M001', 'John Doe', '1985-03-15', 'P001', '123 Main St, Springfield, IL 62701', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(2, 'M002', 'Jane Smith', '1990-07-22', 'P001', '456 Oak Ave, Chicago, IL 60601', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(3, 'M003', 'Bob Johnson', '1978-11-08', 'P002', '789 Pine Rd, Peoria, IL 61601', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(4, 'M004', 'Sarah Williams', '1992-05-14', 'P002', '321 Elm St, Rockford, IL 61101', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(5, 'M005', 'Michael Brown', '1988-09-30', 'P003', '654 Maple Dr, Naperville, IL 60540', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(6, 'M006', 'Emily Davis', '1995-12-05', 'P003', '987 Cedar Ln, Aurora, IL 60502', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(7, 'M007', 'David Miller', '1982-02-18', 'P004', '147 Birch Way, Joliet, IL 60431', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(8, 'M008', 'Lisa Wilson', '1987-08-25', 'P004', '258 Spruce Ct, Elgin, IL 60120', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(9, 'M009', 'Robert Moore', '1975-04-12', 'P005', '369 Willow St, Schaumburg, IL 60193', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(10, 'M010', 'Jennifer Taylor', '1991-10-20', 'P005', '741 Ash Blvd, Waukegan, IL 60085', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(11, 'M011', 'William Anderson', '1965-06-08', 'P006', '852 Poplar Ave, Cicero, IL 60804', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(12, 'M012', 'Patricia Thomas', '1968-01-15', 'P006', '963 Hickory Rd, Bloomington, IL 61701', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(13, 'M013', 'James Jackson', '1998-03-22', 'P007', '159 Sycamore Dr, Champaign, IL 61820', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(14, 'M014', 'Linda White', '1999-07-11', 'P007', '357 Magnolia Ln, Urbana, IL 61801', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(15, 'M015', 'Christopher Harris', '1984-11-28', 'P008', '468 Dogwood St, Decatur, IL 62521', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(16, 'M016', 'Barbara Martin', '1986-05-03', 'P008', '579 Redwood Way, Springfield, IL 62701', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(17, 'M017', 'Daniel Thompson', '1993-09-17', 'P001', '680 Cypress Ave, Chicago, IL 60601', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(18, 'M018', 'Susan Garcia', '1994-12-24', 'P002', '791 Fir Ct, Peoria, IL 61601', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(19, 'M019', 'Matthew Martinez', '1989-02-09', 'P003', '802 Juniper Rd, Rockford, IL 61101', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP),
(20, 'M020', 'Karen Robinson', '1996-08-16', 'P004', '913 Larch Dr, Naperville, IL 60540', '2024-01-01', '2024-12-31', 'system', CURRENT_TIMESTAMP);

-- Insert Deductibles (12 different deductible configurations)
INSERT INTO deduct (dect_id, dect_pfx, accum_number, dect_name, dect_fam_amt, dect_indv_amt, created_by, create_dt) VALUES
(1, 'D001', 1, 'Premium Individual Deductible', 3000.00, 1500.00, 'system', CURRENT_TIMESTAMP),
(2, 'D002', 1, 'Premium Family Deductible', 6000.00, 3000.00, 'system', CURRENT_TIMESTAMP),
(3, 'D003', 1, 'Standard Individual Deductible', 5000.00, 2500.00, 'system', CURRENT_TIMESTAMP),
(4, 'D004', 1, 'Standard Family Deductible', 10000.00, 5000.00, 'system', CURRENT_TIMESTAMP),
(5, 'D005', 1, 'Basic Individual Deductible', 7500.00, 3750.00, 'system', CURRENT_TIMESTAMP),
(6, 'D006', 1, 'Basic Family Deductible', 15000.00, 7500.00, 'system', CURRENT_TIMESTAMP),
(7, 'D007', 1, 'Elite Individual Deductible', 2000.00, 1000.00, 'system', CURRENT_TIMESTAMP),
(8, 'D008', 1, 'Elite Family Deductible', 4000.00, 2000.00, 'system', CURRENT_TIMESTAMP),
(9, 'D009', 1, 'Senior Individual Deductible', 2500.00, 1250.00, 'system', CURRENT_TIMESTAMP),
(10, 'D010', 1, 'Senior Family Deductible', 5000.00, 2500.00, 'system', CURRENT_TIMESTAMP),
(11, 'D011', 1, 'Student Individual Deductible', 2000.00, 1000.00, 'system', CURRENT_TIMESTAMP),
(12, 'D012', 1, 'Corporate Individual Deductible', 4000.00, 2000.00, 'system', CURRENT_TIMESTAMP);

-- Insert Out-of-Pocket Maximums (12 different OOP configurations)
INSERT INTO oop (opp_id, oop_pfx, oop_name, accum_number, oop_fam_amt, oop_indv_amt, created_by, create_dt) VALUES
(1, 'O001', 'Premium Individual OOP Max', 1, 6000.00, 3000.00, 'system', CURRENT_TIMESTAMP),
(2, 'O002', 'Premium Family OOP Max', 1, 12000.00, 6000.00, 'system', CURRENT_TIMESTAMP),
(3, 'O003', 'Standard Individual OOP Max', 1, 10000.00, 5000.00, 'system', CURRENT_TIMESTAMP),
(4, 'O004', 'Standard Family OOP Max', 1, 20000.00, 10000.00, 'system', CURRENT_TIMESTAMP),
(5, 'O005', 'Basic Individual OOP Max', 1, 15000.00, 7500.00, 'system', CURRENT_TIMESTAMP),
(6, 'O006', 'Basic Family OOP Max', 1, 30000.00, 15000.00, 'system', CURRENT_TIMESTAMP),
(7, 'O007', 'Elite Individual OOP Max', 1, 4000.00, 2000.00, 'system', CURRENT_TIMESTAMP),
(8, 'O008', 'Elite Family OOP Max', 1, 8000.00, 4000.00, 'system', CURRENT_TIMESTAMP),
(9, 'O009', 'Senior Individual OOP Max', 1, 5000.00, 2500.00, 'system', CURRENT_TIMESTAMP),
(10, 'O010', 'Senior Family OOP Max', 1, 10000.00, 5000.00, 'system', CURRENT_TIMESTAMP),
(11, 'O011', 'Student Individual OOP Max', 1, 4000.00, 2000.00, 'system', CURRENT_TIMESTAMP),
(12, 'O012', 'Corporate Individual OOP Max', 1, 8000.00, 4000.00, 'system', CURRENT_TIMESTAMP);

-- Insert Benefits (20 different benefits with various HIPAA codes)
INSERT INTO benefit (bnf_id, bnf_name, bnf_pfx, bnf_eff_dt, bnf_term_dt, bnf_rule_id, hipaa_cd, created_by, create_dt) VALUES
(1, 'Primary Care Visit', 'B001', '2024-01-01', '2024-12-31', 'R001', '30', 'system', CURRENT_TIMESTAMP),
(2, 'Specialist Visit', 'B001', '2024-01-01', '2024-12-31', 'R002', '35', 'system', CURRENT_TIMESTAMP),
(3, 'Emergency Room', 'B001', '2024-01-01', '2024-12-31', 'R003', '45', 'system', CURRENT_TIMESTAMP),
(4, 'Prescription Drugs', 'B001', '2024-01-01', '2024-12-31', 'R004', '40', 'system', CURRENT_TIMESTAMP),
(5, 'Inpatient Hospital', 'B001', '2024-01-01', '2024-12-31', 'R005', '50', 'system', CURRENT_TIMESTAMP),
(6, 'Outpatient Surgery', 'B001', '2024-01-01', '2024-12-31', 'R006', '55', 'system', CURRENT_TIMESTAMP),
(7, 'Lab Services', 'B001', '2024-01-01', '2024-12-31', 'R007', '60', 'system', CURRENT_TIMESTAMP),
(8, 'Radiology', 'B001', '2024-01-01', '2024-12-31', 'R008', '65', 'system', CURRENT_TIMESTAMP),
(9, 'Mental Health', 'B001', '2024-01-01', '2024-12-31', 'R009', '70', 'system', CURRENT_TIMESTAMP),
(10, 'Physical Therapy', 'B001', '2024-01-01', '2024-12-31', 'R010', '75', 'system', CURRENT_TIMESTAMP),
(11, 'Durable Medical Equipment', 'B001', '2024-01-01', '2024-12-31', 'R011', '80', 'system', CURRENT_TIMESTAMP),
(12, 'Home Health', 'B001', '2024-01-01', '2024-12-31', 'R012', '85', 'system', CURRENT_TIMESTAMP),
(13, 'Skilled Nursing', 'B001', '2024-01-01', '2024-12-31', 'R013', '90', 'system', CURRENT_TIMESTAMP),
(14, 'Urgent Care', 'B001', '2024-01-01', '2024-12-31', 'R014', '32', 'system', CURRENT_TIMESTAMP),
(15, 'Preventive Care', 'B001', '2024-01-01', '2024-12-31', 'R015', '33', 'system', CURRENT_TIMESTAMP),
(16, 'Chiropractic', 'B001', '2024-01-01', '2024-12-31', 'R016', '36', 'system', CURRENT_TIMESTAMP),
(17, 'Ambulance', 'B001', '2024-01-01', '2024-12-31', 'R017', '46', 'system', CURRENT_TIMESTAMP),
(18, 'Maternity Care', 'B001', '2024-01-01', '2024-12-31', 'R018', '51', 'system', CURRENT_TIMESTAMP),
(19, 'Rehabilitation', 'B001', '2024-01-01', '2024-12-31', 'R019', '76', 'system', CURRENT_TIMESTAMP),
(20, 'Hospice Care', 'B001', '2024-01-01', '2024-12-31', 'R020', '91', 'system', CURRENT_TIMESTAMP);

-- Insert Plans (8 plans, one for each product)
INSERT INTO plan (plan_id, plan_name, plan_type, plan_eff_dt, plan_term_dt, product_id, dect_pfx, oop_pfx, bnf_pfx, created_by, create_dt) VALUES
(1, 'Premium Health Plan', 'PPO', '2024-01-01', '2024-12-31', 'P001', 'D001', 'O001', 'B001', 'system', CURRENT_TIMESTAMP),
(2, 'Standard Health Plan', 'HMO', '2024-01-01', '2024-12-31', 'P002', 'D003', 'O003', 'B001', 'system', CURRENT_TIMESTAMP),
(3, 'Basic Health Plan', 'EPO', '2024-01-01', '2024-12-31', 'P003', 'D005', 'O005', 'B001', 'system', CURRENT_TIMESTAMP),
(4, 'Elite Health Plan', 'PPO', '2024-01-01', '2024-12-31', 'P004', 'D007', 'O007', 'B001', 'system', CURRENT_TIMESTAMP),
(5, 'Family Health Plan', 'HMO', '2024-01-01', '2024-12-31', 'P005', 'D002', 'O002', 'B001', 'system', CURRENT_TIMESTAMP),
(6, 'Senior Health Plan', 'PPO', '2024-01-01', '2024-12-31', 'P006', 'D009', 'O009', 'B001', 'system', CURRENT_TIMESTAMP),
(7, 'Student Health Plan', 'EPO', '2024-01-01', '2024-12-31', 'P007', 'D011', 'O011', 'B001', 'system', CURRENT_TIMESTAMP),
(8, 'Corporate Health Plan', 'PPO', '2024-01-01', '2024-12-31', 'P008', 'D012', 'O012', 'B001', 'system', CURRENT_TIMESTAMP);

-- Insert Copay/Coinsurance (40 entries covering all benefits across different plan types)
INSERT INTO cop_coins (cop_coins_id, bnf_id, bnf_allow_amt, bnf_allow_ctr, bnf_cop_amt, bnf_coins_pct, accum_number, created_by, create_dt) VALUES
-- Premium Plan (P001) - Lower copays
(1, '1', 150.00, 1, 25.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Primary Care
(2, '2', 200.00, 1, 40.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Specialist
(3, '3', 500.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP),  -- Emergency Room
(4, '4', 100.00, 1, 15.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Prescription
(5, '5', 5000.00, 1, 0.00, 10, 1, 'system', CURRENT_TIMESTAMP), -- Inpatient
(6, '6', 2000.00, 1, 0.00, 15, 1, 'system', CURRENT_TIMESTAMP), -- Outpatient Surgery
(7, '7', 150.00, 1, 0.00, 0, 1, 'system', CURRENT_TIMESTAMP),   -- Lab (covered)
(8, '8', 300.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP),  -- Radiology
(9, '9', 200.00, 1, 30.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Mental Health
(10, '10', 150.00, 1, 25.00, 0, 1, 'system', CURRENT_TIMESTAMP), -- Physical Therapy

-- Standard Plan (P002) - Medium copays
(11, '1', 150.00, 1, 35.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Primary Care
(12, '2', 200.00, 1, 50.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Specialist
(13, '3', 500.00, 1, 0.00, 30, 1, 'system', CURRENT_TIMESTAMP),  -- Emergency Room
(14, '4', 100.00, 1, 20.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Prescription
(15, '5', 5000.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP), -- Inpatient
(16, '6', 2000.00, 1, 0.00, 25, 1, 'system', CURRENT_TIMESTAMP), -- Outpatient Surgery
(17, '7', 150.00, 1, 0.00, 0, 1, 'system', CURRENT_TIMESTAMP),   -- Lab (covered)
(18, '8', 300.00, 1, 0.00, 30, 1, 'system', CURRENT_TIMESTAMP),  -- Radiology
(19, '9', 200.00, 1, 40.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Mental Health
(20, '10', 150.00, 1, 35.00, 0, 1, 'system', CURRENT_TIMESTAMP), -- Physical Therapy

-- Basic Plan (P003) - Higher copays/coinsurance
(21, '1', 150.00, 1, 50.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Primary Care
(22, '2', 200.00, 1, 75.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Specialist
(23, '3', 500.00, 1, 0.00, 40, 1, 'system', CURRENT_TIMESTAMP),  -- Emergency Room
(24, '4', 100.00, 1, 30.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Prescription
(25, '5', 5000.00, 1, 0.00, 30, 1, 'system', CURRENT_TIMESTAMP), -- Inpatient
(26, '6', 2000.00, 1, 0.00, 35, 1, 'system', CURRENT_TIMESTAMP), -- Outpatient Surgery
(27, '7', 150.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP),  -- Lab
(28, '8', 300.00, 1, 0.00, 40, 1, 'system', CURRENT_TIMESTAMP),  -- Radiology
(29, '9', 200.00, 1, 50.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Mental Health
(30, '10', 150.00, 1, 50.00, 0, 1, 'system', CURRENT_TIMESTAMP), -- Physical Therapy

-- Elite Plan (P004) - Best coverage
(31, '1', 150.00, 1, 15.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Primary Care
(32, '2', 200.00, 1, 25.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Specialist
(33, '3', 500.00, 1, 0.00, 10, 1, 'system', CURRENT_TIMESTAMP),  -- Emergency Room
(34, '4', 100.00, 1, 10.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Prescription
(35, '5', 5000.00, 1, 0.00, 5, 1, 'system', CURRENT_TIMESTAMP),  -- Inpatient
(36, '6', 2000.00, 1, 0.00, 10, 1, 'system', CURRENT_TIMESTAMP), -- Outpatient Surgery
(37, '7', 150.00, 1, 0.00, 0, 1, 'system', CURRENT_TIMESTAMP),   -- Lab (covered)
(38, '8', 300.00, 1, 0.00, 10, 1, 'system', CURRENT_TIMESTAMP),  -- Radiology
(39, '9', 200.00, 1, 20.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Mental Health
(40, '10', 150.00, 1, 15.00, 0, 1, 'system', CURRENT_TIMESTAMP); -- Physical Therapy

-- Additional benefits for all plans
INSERT INTO cop_coins (cop_coins_id, bnf_id, bnf_allow_amt, bnf_allow_ctr, bnf_cop_amt, bnf_coins_pct, accum_number, created_by, create_dt) VALUES
-- DME, Home Health, Skilled Nursing, Urgent Care, etc. (using same pattern for all plans)
(41, '11', 500.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP), -- DME
(42, '12', 200.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP), -- Home Health
(43, '13', 300.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP), -- Skilled Nursing
(44, '14', 200.00, 1, 50.00, 0, 1, 'system', CURRENT_TIMESTAMP), -- Urgent Care
(45, '15', 200.00, 1, 0.00, 0, 1, 'system', CURRENT_TIMESTAMP),  -- Preventive (covered)
(46, '16', 100.00, 1, 30.00, 0, 1, 'system', CURRENT_TIMESTAMP), -- Chiropractic
(47, '17', 800.00, 1, 0.00, 20, 1, 'system', CURRENT_TIMESTAMP), -- Ambulance
(48, '18', 10000.00, 1, 0.00, 10, 1, 'system', CURRENT_TIMESTAMP), -- Maternity
(49, '19', 200.00, 1, 25.00, 0, 1, 'system', CURRENT_TIMESTAMP), -- Rehabilitation
(50, '20', 500.00, 1, 0.00, 0, 1, 'system', CURRENT_TIMESTAMP);  -- Hospice (covered)

-- Insert Benefit Limits (30 entries covering various benefit limits)
INSERT INTO ben_limit (lmt_id, bnf_id, lmt_name, lmt_amt, lmt_type, created_by, create_dt) VALUES
-- Visit limits (V = Visit count)
(1, '1', 'Primary Care Visit Limit', 12, 'V', 'system', CURRENT_TIMESTAMP),
(2, '2', 'Specialist Visit Limit', 8, 'V', 'system', CURRENT_TIMESTAMP),
(3, '9', 'Mental Health Visit Limit', 20, 'V', 'system', CURRENT_TIMESTAMP),
(4, '10', 'Physical Therapy Visit Limit', 30, 'V', 'system', CURRENT_TIMESTAMP),
(5, '16', 'Chiropractic Visit Limit', 12, 'V', 'system', CURRENT_TIMESTAMP),
(6, '19', 'Rehabilitation Visit Limit', 20, 'V', 'system', CURRENT_TIMESTAMP),

-- Dollar limits (D = Dollar amount)
(7, '3', 'Emergency Room Limit', 1000.00, 'D', 'system', CURRENT_TIMESTAMP),
(8, '4', 'Prescription Annual Limit', 5000.00, 'D', 'system', CURRENT_TIMESTAMP),
(9, '5', 'Inpatient Hospital Limit', 50000.00, 'D', 'system', CURRENT_TIMESTAMP),
(10, '6', 'Outpatient Surgery Limit', 20000.00, 'D', 'system', CURRENT_TIMESTAMP),
(11, '7', 'Lab Services Annual Limit', 2000.00, 'D', 'system', CURRENT_TIMESTAMP),
(12, '8', 'Radiology Annual Limit', 5000.00, 'D', 'system', CURRENT_TIMESTAMP),
(13, '11', 'DME Annual Limit', 10000.00, 'D', 'system', CURRENT_TIMESTAMP),
(14, '12', 'Home Health Annual Limit', 5000.00, 'D', 'system', CURRENT_TIMESTAMP),
(15, '13', 'Skilled Nursing Annual Limit', 10000.00, 'D', 'system', CURRENT_TIMESTAMP),
(16, '14', 'Urgent Care Annual Limit', 2000.00, 'D', 'system', CURRENT_TIMESTAMP),
(17, '17', 'Ambulance Annual Limit', 3000.00, 'D', 'system', CURRENT_TIMESTAMP),
(18, '18', 'Maternity Care Limit', 15000.00, 'D', 'system', CURRENT_TIMESTAMP),
(19, '20', 'Hospice Care Limit', 25000.00, 'D', 'system', CURRENT_TIMESTAMP),

-- Additional limits
(20, '1', 'Primary Care Annual Dollar Limit', 2000.00, 'D', 'system', CURRENT_TIMESTAMP),
(21, '2', 'Specialist Annual Dollar Limit', 3000.00, 'D', 'system', CURRENT_TIMESTAMP),
(22, '9', 'Mental Health Annual Dollar Limit', 5000.00, 'D', 'system', CURRENT_TIMESTAMP),
(23, '10', 'Physical Therapy Annual Dollar Limit', 4000.00, 'D', 'system', CURRENT_TIMESTAMP),
(24, '15', 'Preventive Care Annual Limit', 1000.00, 'D', 'system', CURRENT_TIMESTAMP),
(25, '16', 'Chiropractic Annual Dollar Limit', 2000.00, 'D', 'system', CURRENT_TIMESTAMP),
(26, '19', 'Rehabilitation Annual Dollar Limit', 5000.00, 'D', 'system', CURRENT_TIMESTAMP),
(27, '4', 'Prescription Monthly Limit', 500.00, 'D', 'system', CURRENT_TIMESTAMP),
(28, '7', 'Lab Services Per Visit Limit', 500.00, 'D', 'system', CURRENT_TIMESTAMP),
(29, '8', 'Radiology Per Visit Limit', 1000.00, 'D', 'system', CURRENT_TIMESTAMP),
(30, '11', 'DME Per Item Limit', 2000.00, 'D', 'system', CURRENT_TIMESTAMP);

COMMIT;
