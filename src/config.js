module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:process.env.DATABASE_URL||'postgresql://dunder_mifflin@localhost/corona-trail',
    TEST_DATABASE_URL:process.env.TEST_DATABASE_URL||'postgresql://dunder_mifflin@localhost/test-corona-trail',
    JWT_SECRET:process.env.JWT_SECRET || "secret",
    SSL: !!process.env.SSL,
  }

  //postgresql://dunder-mifflin@localhost/CoronaTrail
  //postgresql://dunder-mifflin@localhost/CoronaTrail-test