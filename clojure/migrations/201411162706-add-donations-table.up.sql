CREATE TABLE donations
(id VARCHAR(20) PRIMARY KEY,
 upline VARCHAR(20),
 amount DECIMAL,
 first_name VARCHAR(20),
 last_name VARCHAR(20),
 is_paid BOOLEAN,
 downline_amount DECIMAL,
 downline_count INTEGER);
