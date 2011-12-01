/*
 * jQuery 'ScoreNotify' plugin 0.1
 *
 * http://github.com/paulasmuth/jquery.scorenotify
 *
 * Copyright (c) 2011 Paul Asmuth
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($){
  $.fn.scoreNotify = function(opts){

    var default_label_func = function(_opts){
      var n  = parseInt(_opts.value);
      return ((n > 0) ? ('+'+n) : n);
    };
            
    if(!opts.label_func){ opts.label_func=default_label_func; }
    if(!opts.offset_x){ opts.offset_x=0; }
    if(!opts.offset_y){ opts.offset_y=0; }
    if(!opts.delta_y){ opts.delta_y=3; }
    
    $('body').prepend(
      opts.elem = $('<div></div>').css({
        textAlign: 'center',
        position: 'fixed',
        float: 'left',
        display: 'none'
      })
    );

    opts.elem.html(
      opts.label_func(opts)
    ).addClass(
      opts.add_class || 'score_notify'
    );
    
    opts.offset_x += (
      this.offset().left +
      parseInt(this.width()/2) -
      parseInt(opts.elem.width()/2) 
    );

    opts.offset_y += (
      this.offset().top -
      opts.elem.height()
    );

    opts.target_y = (
      opts.offset_y - 
      (opts.elem.height()*opts.delta_y)
    );

    opts.elem.css({
      left: opts.offset_x,
      top: opts.offset_y,
      display: 'block',
      opacity: 1
    }).animate({
      top: opts.target_y,
      opacity: 0
    }, 300, function(){
      $(this).remove();
    });

  };
})(jQuery); 