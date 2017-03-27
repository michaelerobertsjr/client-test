var window;
var $;
const should = require('should');
const fs = require('fs');
const jsdom = require("jsdom");
const serializeDocument = require("jsdom").serializeDocument;
const userHTML = fs.readFileSync(require.resolve("../index.html"), { encoding: "utf-8" });
const userScript = fs.readFileSync(require.resolve("../main.js"), { encoding: "utf-8" });

// create an event emitter for log and error events
const virtualConsole = jsdom.createVirtualConsole();

// add an event emitter handler to log console from the virutal DOM
virtualConsole.on("log", function (message) {
  console.log("console.log called within virtual DOM ->", message);
});

// add an event emitter handler to log error from the virutal DOM
// all jsdomError will go here by default
virtualConsole.on("error", function (message) {
  console.log("console.error called within virtual DOM ->", message);
});

describe('HelloWorld page', function(){
  beforeEach(() => {
    const document = jsdom.jsdom(userHTML, { virtualConsole });
    window = document.defaultView;
    const scriptEl = document.createElement("script");
    scriptEl.textContent = userScript;
    document.body.appendChild(scriptEl);
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
      //console.log(`CALCULATOR====> ${window.Calculator}`)
      should.exist(calculator);
    });
    it('have someData on the global namespace', function(done){
      //console.log(`SOME DATA====> ${window.someData}`);
      should.equal(window.someData, 1);
      done();
    });
  });

});
