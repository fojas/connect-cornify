module.exports = function(options){
  options = options || {};
  var interval = options.interval;
  return function (req, res, next) {
    var originalSend = res.send;
    res.send = function(original){
      var originalSplit = original.split('</head>');
      if(originalSplit.length > 1){
        var cornified = [ '<script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>' ];
        if( interval ){
          cornified.push( '<script>setInterval(cornify_add,',interval,')</script>' );
        }
        originalSplit.splice(1,0,cornified.concat('</head>').join(''));
      }   
      return originalSend.call(this,originalSplit.join(''));
    }   
    next();
  }
};
