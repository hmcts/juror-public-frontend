-- Conflict with straight through checkYourAnswers.feature response
INSERT INTO "JUROR_DIGITAL"."JUROR_RESPONSE" (JUROR_NUMBER, DATE_RECEIVED) VALUES (352004504, (select sysdate from dual));

UPDATE "JUROR_DIGITAL"."JUROR_RESPONSE" SET
  TITLE = 'Rev',
  FIRST_NAME = 'Jose',
  LAST_NAME = 'Rivera',
  ADDRESS = '22177 Redwing Way',
  ADDRESS2 = 'London',
  ADDRESS3 = 'England',
  ADDRESS4 = 'United Kingdom',
  ZIP = 'EC3M 2NY',
  PROCESSING_STATUS = 'TODO',
  DATE_OF_BIRTH = TO_DATE('1984-07-24 16:04:09', 'YYYY-MM-DD HH24:MI:SS'),
  PHONE_NUMBER = '44(406)759-6616',
  ALT_PHONE_NUMBER = '44(322)292-4490',
  EMAIL = 'jriverac@myspace.com',
  PROCESSING_COMPLETE = 'N',
  THIRDPARTY_FNAME = 'Jon',
  THIRDPARTY_LNAME = 'Deaves',
  RELATIONSHIP='Brother',
  THIRDPARTY_REASON = 'deceased',
  MAIN_PHONE='01411411414',
  OTHER_PHONE='01411411415',
  EMAIL_ADDRESS='jonD@mystery.gov',

  RESIDENCY = 'N',
  RESIDENCY_DETAIL = 'Lived in U.K. for 3 years',

  MENTAL_HEALTH_ACT = 'Y',
  MENTAL_HEALTH_ACT_DETAILS = 'I was detained',
  CONVICTIONS = 'Y',
  CONVICTIONS_DETAILS = 'I was convicted',
  BAIL = 'Y',
  BAIL_DETAILS = 'I am on bail because I was convicted',

  EXCUSAL_REASON = 'Need to be excused because of stuff',

  SPECIAL_NEEDS_ARRANGEMENTS = 'Even more special reasons'

  WHERE JUROR_NUMBER = 352004504;
