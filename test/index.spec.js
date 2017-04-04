var { window, jsdom, virtualConsole, loadWindow, serialDoc } = require('../libs/testHelper');
const should = require('should');

describe('HelloWorld page', function(){
  beforeEach(() => {
    window = loadWindow();
    $ = require('jquery')(window);
  });

  describe("markup should", () => {
    it('contain Hello World title', function(done){
      should.equal($('.title').html(), "Hello World!");
      done();
    });

  });

  describe("scripts should", () => {
    it("have Calculator", () => {
      let calculator = new window.Calculator();
      should.exist(calculator);
    });
    it('have someData on the global namespace', function(done){
      should.equal(window.someData, 1);
      done();
    });
  });

});
