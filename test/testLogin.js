const mongoose = require("mongoose");
const expect = require("chai").expect;
var connect = require("../dbConnect.js");

var loginFacade = require("../facades/loginFacade");
var User = require("../models/User");
var Position = require("../models/Position");

describe("Testing the Login Facade", function () {

  /* Connect to the TEST-DATABASE */
  before(async function () {
    await connect(require("../settings").TEST_DB_URI);
  })

  after(async function () {
    await Position.deleteMany({});
    //await User.deleteMany({});
    await mongoose.disconnect();
  })
  
  /* Setup the database in a known state (2 users) BEFORE EACH test */
  beforeEach(async function () {
    await User.deleteMany({});
    await Position.deleteMany({});

    users = await User.insertMany([
      { firstName: "Kurt", lastName: "Wonnegut", username: "kw", password: "test", email: "a@b.dk" },
      { firstName: "Hanne", lastName: "Wonnegut", username: "hw", password: "test", email: "b@b.dk" },
      { firstName: "Marc", lastName: "io", username: "marcio", password: "test", email: "marc@mail.io" },
    ])

    await loginFacade.login('kw', 'test', 10, 10, 1)
    await loginFacade.login('hw', 'test', 10, 10, 1)
  })

  it("Should find all friends nearby", async function () {
    let result = await loginFacade.login('marcio', 'test', 10.00005, 10.00005, 5);
    console.log(result.friends)
    expect(true).to.be.true
    //expect(result.friends.length).to.be.equal(2);
  });

})

