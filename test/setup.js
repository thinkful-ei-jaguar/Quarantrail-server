process.env.TZ = 'UTC'
process.env.NODE_ENV = 'test'
const { expect } = require('chai');
const supertest = require('supertest');

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || "postgresql://dunder_mifflin@localhost/test-corona-trail"

global.expect=expect;
global.supertest=supertest;
