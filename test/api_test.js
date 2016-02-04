var request = require('supertest'),
    express = require('express'),
    assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

// Run the tests against the prod mongolab db
//process.env.NODE_ENV = "production";
//var config = require('config');

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
  })
});

describe('categories', function(){
  this.timeout(50000);
  it('get 100 random categories', function(done){
    request(app)
        .get('/api/cats')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          expect(res.body.length).to.equal(100);
          //console.log(res.body);
          done();
        });
  })
});


//
//
//describe('clues', function(){
//  this.timeout(50000);
//  it('gets clues', function(done){
//    request(app)
//        .get('/api/clues/')
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res){
//          if (err) throw err;
//          expect(res.body.length).to.equal(1000);
//          done();
//        });
//  })
//});
//
//describe('random clues', function(){
//  this.timeout(50000);
//  it('gets random clues', function(done){
//        request(app)
//            .get('/api/clues/r/')
//            .expect('Content-Type', /json/)
//            .expect(200)
//            .end(function(err, res){
//                if (err) throw err;
//                //console.log("Clues returned: " + res.body.length);
//                done();
//            });
//    });
//
//  it('gets 10 random clues', function(done){
//    request(app)
//        .get('/api/clues/r/10')
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res){
//          if (err) throw err;
//          expect(res.body.length).to.equal(10);
//          done();
//        });
//  })
//
//});
//
//
//describe('categories', function(){
//  this.timeout(50000);
//  it('gets 10 random categories', function(done){
//    request(app)
//        .get('/api/cats/r/')
//        .expect('Content-Type', /json/)
//        .expect(200)
//        .end(function(err, res){
//          if (err) throw err;
//          expect(res.body.length).to.equal(10);
//          //console.log(res.body);
//          done();
//        });
//  })
//});
