-- Enabled court
-- All users who should be able to login will need to be part of this court
insert into JUROR_DIGITAL.COURT_WHITELIST (loc_code) values (443);


-- Rivera
-- Enabled
insert into JUROR.POOL (part_no, fname, lname, h_email, title, dob, address, address2, address3, address4, zip, h_phone, w_phone, is_active, owner, loc_code, m_phone, responded, poll_number, pool_no, on_call, completion_flag, read_only, contact_preference, reg_spc, ret_date, status, next_date) values (352004504, 'Jose', 'Rivera', 'jriverac@myspace.com', 'Rev', TO_DATE('1987-05-25 13:19:23', 'YYYY-MM-DD HH24:MI:SS'), '22177 Redwing Way', 'England', 'London', 'United Kingdom', 'EC3M 2NY', '44(406)759-6616', '44(322)292-4490', 'Y', 400, 443, '44(362)527-9947', 'N', 76024, 222, 'N', 'N', 'N', 0, 'N', (select sysdate from dual), 1, (select sysdate from dual) + 21);

-- Castillo
-- Enabled
insert into JUROR.POOL (part_no, fname, lname, h_email, title, dob, address, address2, address3, address4, zip, h_phone, w_phone, is_active, owner, loc_code, m_phone, responded, poll_number, pool_no, on_call, completion_flag, read_only, contact_preference, reg_spc, ret_date, status, next_date) values (209092530, 'Jane', 'Castillo', 'jcastillo0@ed.gov', 'Dr', TO_DATE('1984-07-24 16:04:09', 'YYYY-MM-DD HH24:MI:SS'), '4 Knutson Trail', 'Scotland', 'Aberdeen', 'United Kingdom', 'AB39RY', '44(703)209-6993', '44(109)549-5625', 'Y', 400, 443, '44(362)527-9947', 'N', 76024, 222, 'N', 'N', 'N', 0, 'N', (select sysdate from dual), 1, (select sysdate from dual) + 21);

-- Wilson
-- Enabled
insert into JUROR.POOL (part_no, fname, lname, h_email, title, dob, address, address2, address3, address4, zip, h_phone, w_phone, is_active, owner, loc_code, m_phone, responded, poll_number, pool_no, on_call, completion_flag, read_only, contact_preference, reg_spc, ret_date, status, next_date) values (122444503, 'Wade', 'Wilson', 'captain_deadpool@gmail.com', 'Mr', TO_DATE('1987-05-25 13:19:23', 'YYYY-MM-DD HH24:MI:SS'), '123 Fake Road', 'England', 'London', 'United Kingdom', 'BC3M 2ND', '44(406)759-6616', '44(322)292-4490', 'Y', 400, 443, '44(362)527-9947', 'N', 76024, 222, 'N', 'N', 'N', 0, 'N', (select sysdate from dual), 1, (select sysdate from dual) + 31);

  -- Reynolds
  -- Enabled
  insert into JUROR.POOL (part_no, fname, lname, h_email, title, dob, address, address2, address3, address4, zip, h_phone, w_phone, is_active, owner, loc_code, m_phone, responded, poll_number, pool_no, on_call, completion_flag, read_only, contact_preference, reg_spc, ret_date, status, next_date) values (152004504, 'Frank', 'Reynolds', 'frankie_fast_hands@gmail.com', 'Mr', TO_DATE('1987-05-25 13:19:23', 'YYYY-MM-DD HH24:MI:SS'), '123 Fake Street', 'England', 'London', 'United Kingdom', 'BC3M 2NY', '44(406)759-6616', '44(322)292-4490', 'Y', 400, 443, '44(362)527-9947', 'N', 76024, 222, 'N', 'N', 'N', 0, 'N', (select sysdate from dual), 1, (select sysdate from dual) + 31);

-- Bold
-- Enabled
insert into JUROR.POOL (part_no, fname, lname, h_email, title, dob, address, address2, address3, address4, zip, h_phone, w_phone, is_active, owner, loc_code, m_phone, responded, poll_number, pool_no, on_call, completion_flag, read_only, contact_preference, reg_spc, ret_date, status, next_date) values (352005444, 'Nick', 'Bold', 'nbold@myspace.com', 'Rev', TO_DATE('1984-04-24 14:49:24', 'YYYY-MM-DD HH24:MI:SS'), '44 Queen Street', 'England', 'London', 'United Kingdom', 'EC4M 4NY', '44(406)759-4414', '44(322)292-4494', 'Y', 400, 443, '44(362)527-9944', 'N', 76024, 444, 'N', 'N', 'N', 0, 'N', (select sysdate from dual), 1, (select sysdate from dual) + 21);

-- Unique Pool
-- Only specific users will be assigned to this unique pool (Nick Bold)
insert into JUROR.UNIQUE_POOL (owner, pool_no, return_date, next_date, reg_spc, loc_code, attend_time) values (400, 444, (select sysdate from dual), (select sysdate from dual) + 21, 'Y', 443, TO_DATE('2014-04-24 09:44:00', 'YYYY-MM-DD HH24:MI:SS'));
