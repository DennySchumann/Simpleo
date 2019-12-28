const chai     = require("chai");
const chaiHttp = require("chai-http");
const mocha    = require("mocha");
const server   = require('../build/server');

chai.use(chaiHttp);
const assert = chai.assert;

const event_TestData = {
	"color": {
		"tetrad": {
			"first": "ffffff",
			"first_txt": "000000",
			"second": "ffffff",
			"second_txt": "000000",
			"third": "ffffff",
			"third_txt": "000000"
		},
		"primary": "ffffff",
		"primary_txt": "000000",
		"darken": "e8e8e8",
		"darken_txt": "000000",
		"lighten": "ffffff",
		"lighten_txt": "000000",
		"accent": "ffffff",
		"accent_txt": "000000",
		"background": "d22027",
		"background_txt": "ffffff"
	},
	"social_members": {
		"flimme_members": [],
		"twitter_members": [],
		"instagram_members": []
	},
	"tag": "TestTag",
	"tag_sort": "testtag",
	"title": "TestTitle",
	"title_sort": "testtitle",
	"subtitle": "",
	"description": "This is a Test Data",
	"image_header_filetype": "jpg",
	"image_header_preview": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAASADYDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBgf/xAAlEAAABQQCAgIDAAAAAAAAAAAAAQIDBAUGERITMSEyB5FBYaH/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAgMG/8QAIhEAAQQABQUAAAAAAAAAAAAAAAECAxEEEhMhMQVBUYHh/9oADAMBAAIRAxEAPwDMNI5HUI62URDeufG6OHVqokcnh5eM0/jGexg2FEiQ2o+iURn9jrEi9aPJYXDJ/i2jElL5F5JWOhWxI1UXMe76hJiGObo+zMs2NHKit1CXUDa3yRJJGfJBGsBUxcE48vZmTnK8euBeRLiparXYp51UmXUbEozRtkRaTd8KmWxJic20ltw+BWOyz2OmWPYiLNjVR2W7uuO3ngrE2AtJrJ6VoZSOFPj2/YiXNa0SgNKJM83X0qwaNMf0aSq3lTpcmjG27hLayXIPHRiFfFXp1YjLcj1RLmFZQySMH9jDmspaNoZsWsrNS0Redvhz4AARy8AAAAAAAAAAAAAAA//Z",
	"image_logo_filetype": "png",
	"playlists": [
		"5a8eaf7f0d178955d766ab96",
		"5a8edf390d178955d766aba7",
		"5a8fcca2167ba455cb575b0f",
		"5a8fd2c5167ba455cb575b16",
		"5a8fd3aeb9d31e55c57a7c0b",
		"5a8fd94ce00d7355d18997ac",
		"5a8fd9f2b9d31e55c57a7c0e",
		"5a8fda26b9d31e55c57a7c0f",
		"5a8fda4bb9d31e55c57a7c13",
		"5a8fda8ee00d7355d18997b2",
		"5a8fdabf0d178955d766abc3",
		"5a8fdafbe00d7355d18997b5",
		"5a8fdb680d178955d766abcb",
		"5a97e0c47ae7b74d485461d2",
		"5a9e58c452575e4d42bd494a",
		"5a9e5d992e61ee4d4e6ce180",
		"5a9e81c452575e4d42bd4952",
		"5a9e81e552575e4d42bd4953",
		"5a9e81ee52575e4d42bd4954"
	],
	"bookmark_playlists": [
		"5a8ed9060d178955d766aba6",
		"5a8fe5f4e00d7355d18997b8",
		"5a8fe5f7b9d31e55c57a7c1e",
		"5a8fe7ddb9d31e55c57a7c1f",
		"5a9e7f32acf0324d548380b8",
		"5a9e848a2e61ee4d4e6ce187",
		"5a9e8be32e61ee4d4e6ce18b"
	],
	"boards": [
		"5a8eaf7f0d178955d766ab97",
		"5a9e5827acf0324d548380b2"
	],
	"viewer_code": "",
	"broadcaster_code": "",
	"cta_text": "tzt",
	"main_stream": "",
	"media_visible": [],
	"media_invisible": [],
	"image_header": "2018-02-22T12:20:41.845Z",
	"image_logo": "2018-02-22T12:20:41.778Z",
	"date_start": "2018-02-22T11:54:39.936Z",
	"date_end": null,
	"bookmarks": "5a8ed901b9d31e55c57a7c01",
	"main_board": "5a8eaf7f0d178955d766ab97",
	"bitrate": 800,
	"published": "2018-02-22T11:54:46.938Z",
	"visibility": false,
	"private_broadcasting": false,
	"trusted_broadcasting": true,
	"owner": "57063d5eccf336d2530e7a85",
	"package": "57f63c11e2076463312574ad",
	"main_live": false,
	"reset": "2018-02-22T11:54:39.936Z",
	"old_id": 0,
	"broadcasters": [
		{
			"user": "57063d58ccf336d2530e79ad",
			"role": "57063d59ccf336d2530e7a7e"
		}
	]
};

/**
 * this test compilation is for the collection events only for the param tag
 * TODO: implements all tests from the collection events
  */
describe("Test Events tag", function() {
	let testTag   = '';
	let objekt_id = '';
	this.timeout(10000); //  without comes an Timeout(2000) exception

	before(function() {
		console.log("Before all tests");
		chai.request(server.default)
			.get('/api/v1/events/')
			.then(res => {
				testTag = res.body.data[0].tag;
			});
	});

	it("post request on non-existing event", function() {
		let testString = "";
		let blub = {
			sub: "1234567890",
			age: 27,
			admin: true
		};
		assert.typeOf(testString, 'string');
		return chai.request(server.default)
				   .post('/api/v1/events/')
				   .send({"tag": "TestTag"})
				   .then(res => {
					   const response = res.body.data;

					   assert.equal(res.status, 200);
					   assert.equal(response.tag, 'TestTag');
				   });
	});

	it("post request without tag", function() {
		return chai.request(server.default)
				   .post('/api/v1/events/')
				   .send({"tag_sort": "testtag"}) //give tag_sort otherwise come TypeError: Cannot read property 'toLowerCase' of undefined
				   .then(res => {
					   assert.equal(res.status, 400);
				   });
	});

	it("post request on existing event", function() {
		return chai.request(server.default)
				   .post('/api/v1/events/')
				   .send({"tag": "TestTag"})
				   .then(res => {
					   assert.equal(res.status, 500);
				   });
	});

	it("get request on existing event with tag: TestTag", function() {
		return chai.request(server.default)
				   .get('/api/v1/events?tag=TestTag')
				   .then(res => {
					   const response = res.body.data[0];
					   objekt_id      = response._id; // save id for update and delete tests

					   assert.equal(res.status, 200);
					   assert.equal(response.tag, 'TestTag');
				   });
	});

	it("get request on non-existing event", function() {
		return chai.request(server.default)
				   .get('/api/v1/events?tag=')
				   .then(res => {
					   assert.equal(res.status, 404);
				   });
	});

	it("get request on with incorrectly field name", function() {
		return chai.request(server.default)
				   .get('/api/v1/events?nonExistingTag=')
				   .then(res => {
					   assert.equal(res.status, 404);
				   });
	});

	it("update request on existing event", function() {
		return chai.request(server.default)
				   .put('/api/v1/events/' + objekt_id)
				   .send({"tag": "UpdatedTestTag"})
				   .then(res => {
					   assert.equal(res.status, 200);
				   });
	});

	it("update request on existing event with existing tag", function() {
		return chai.request(server.default)
				   .put('/api/v1/events/' + objekt_id)
				   .send({"tag": testTag.toString()})
				   .then(res => {
					   assert.equal(res.status, 500);
				   });
	});

	it("update request on non-existing event", function() {
		return chai.request(server.default)
				   .put('/api/v1/events/12345')
				   .then(res => {
					   assert.equal(res.status, 404);
				   });
	});

	it("delete request on existing event", function() {
		return chai.request(server.default)
				   .delete('/api/v1/events/' + objekt_id)
				   .then(res => {
					   assert.equal(res.status, 200);
				   });
	});

	it("delete request on non-existing event", function() {
		return chai.request(server.default)
				   .delete('/api/v1/events/12345')
				   .then(res => {
					   assert.equal(res.status, 404);
				   });
	});
});
