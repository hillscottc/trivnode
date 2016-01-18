var request = require('supertest'),
    express = require('express'),
    assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

// Run the tests against the prod mongolab db
//process.env.NODE_ENV = "production";
//var config = require('config');

var app = require('../main');

describe('GET /api/clues/', function(){
  this.timeout(50000);
  it('gets clues', function(done){
    request(app)
        .get('/api/clues/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          expect(res.body.length).to.equal(1000);
          done();
        });
  })
});

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