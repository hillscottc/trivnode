var request = require('supertest'),
    config = require('config'),
    express = require('express'),
    assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

var app = require('../main');

// Get all clues is only reasonable with a local mongo db.
if (config.util.getEnv('NODE_ENV') === 'development') {
  describe('GET /api/clues/', function(){
    this.timeout(50000);
    it('gets clues', function(done){
      request(app)
          .get('/api/clues/')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res){
            if (err) throw err;
            console.log("Clues returned: " + res.body.length);
            done();
          });
    })
  });}


describe('GET /api/clues/r/', function(){
  this.timeout(50000);
  it('gets random clues', function(done){
        request(app)
            .get('/api/clues/r/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                console.log("Clues returned: " + res.body.length);
                done();
            });
    })
});

describe('GET /api/clues/r/10', function(){
  this.timeout(50000);
  it('gets 10 random clues', function(done){
        request(app)
            .get('/api/clues/r/10')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                expect(res.body.length).to.equal(10);
                done();
            });
    })
});