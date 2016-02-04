var request = require('supertest'),
    express = require('express'),
    assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;


var app = require('../main');


describe('clues', function(){
  it('get 100 random clues', function(done){
    request(app)
        .get('/api/clues')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          expect(res.body.length).to.equal(100);
          //console.log(res.body);
          done();
        });
  });
});


describe('clues by category', function(){
  it('gets 10 clues for category 1', function(done){
    request(app)
        .get('/api/clues/cat/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          expect(res.body.length).to.equal(10);
          //console.log(res.body);
          done();
        });
  });
});


describe('categories', function(){
  it('get 20 random categories', function(done){
    request(app)
        .get('/api/cats')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          expect(res.body.length).to.equal(20);
          //console.log(res.body);
          done();
        });
  })
});

