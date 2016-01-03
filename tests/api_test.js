var request = require('supertest'),
    express = require('express'),
    assert = require('assert');

var app = require('../main');

describe('GET /api/clues/', function(){
    it('respond with json', function(done){
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
});

describe('GET /api/clues/r/', function(){
    it('respond with json', function(done){
        request(app)
            .get('/api/clues/r/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                console.log("Clues returned: " + res.body.length);
                console.log(res.body);
                done();
            });
    })
});