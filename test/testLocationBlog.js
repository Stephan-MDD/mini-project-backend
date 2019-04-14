const mongoose = require("mongoose");
const expect = require("chai").expect;
let connect = require("../dbConnect.js");


//See (for the three lines below): https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

var blogFacade = require("../facades/blogFacade");
var User = require("../models/User");
var LocationBlog = require("../models/LocationBlog");

let testUser = null

describe("Testing the User Facade", function () {

  /* Connect to the TEST-DATABASE */
  before(async function () {
    await connect(require("../settings").TEST_DB_URI);
  })

  after(async function () {
    await User.deleteMany({});
    await LocationBlog.deleteMany({});
    await mongoose.disconnect();
  })
  
  var users = [];
  /* Setup the database in a known state (2 users) BEFORE EACH test */
  beforeEach(async function () {
    await User.deleteMany({});
    await LocationBlog.deleteMany({});
    testUser = await User.insertMany({firstName: "test", lastName: "test", username: "test", password: "test", email: "test@test"})
    locationBlogs = await LocationBlog.insertMany([
      { info: 'test1', pos: {longitude: 1111, latitude: 2222}, author: testUser[0]._id },
      { info: 'test2', pos: {longitude: 3333, latitude: 4444}, author: testUser[0]._id },
    ])
  })

  it("Should add a location blog", async function () {
    await blogFacade.addLocationBlog('test3', {longitude: 5555, latitude: 6666}, testUser[0]._id)
    var locations = await LocationBlog.find();
    expect(locations.length).to.be.equal(3);
  });

  it('should add a like top the locationBlog', async function() {
    let locationBlog = await LocationBlog.find({ info: 'test1' })
    await blogFacade.likeLocationBlog(testUser[0]._id, locationBlog[0]._id)
    let likedLocation = await LocationBlog.find({ info: 'test1' })
    expect(likedLocation[0].likedBy.length).to.be.equal(1)
  })

})