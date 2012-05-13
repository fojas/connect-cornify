var cornify = require('../index.js')
  , should = require('should');
describe("Cornify middleware", function(){
  it("should add the cornify scripts to the output", function(){
    var cornifyMiddleware = cornify()
      , mockResponse = {send : function(text){ return text;}};

    cornifyMiddleware('request',mockResponse,function next(){});
    should.equal(mockResponse.send("<html><head></head><body></body></html>"),[
      "<html><head>"
    , '<script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>'
    , "</head><body></body></html>"
    ].join(''));
  });

  it("should add a setInterval to call cornify_add when configured", function(){
    var interval = 2
      , cornifyMiddleware = cornify({interval:interval})
      , mockResponse = {send : function(text){ return text;}};

    cornifyMiddleware('request',mockResponse,function next(){});
    should.equal(mockResponse.send("<html><head></head><body></body></html>"),[
      "<html><head>"
    , '<script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>'
    , '<script>setInterval(cornify_add,',interval,')</script>'
    , "</head><body></body></html>"
    ].join(''));
  });

  it("should do nothing if it cant find the head", function(){
    var interval = 2
      , cornifyMiddleware = cornify({interval:interval})
      , mockResponse = {send : function(text){ return text;}};

    cornifyMiddleware('request',mockResponse,function next(){});
    should.equal(mockResponse.send("this is just text"),"this is just text");

  });
});
