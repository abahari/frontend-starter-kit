'use strict';

casper.
  start( '_build/html/index.html' ).
  then(function(){
    phantomcss.screenshot('body', 'index_body');
  });

casper.run();
