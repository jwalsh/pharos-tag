// Asynchronous Loading Pattern
// Source: Steve Souders
// URL: http://www.stevesouders.com/blog/2010/12/15/controljs-part-1/

// Asynchronous Initialization
// Source: Facebook JavaScript SDK
// URL: https://developers.facebook.com/docs/reference/javascript/
// URL: http://www.phpied.com/async-javascript-callbacks/


// JavaScript Patterns, Immediate Functions, p.69

(function() {

  // addMethod - By John Resig (MIT Licensed)
  function addMethod(object, name, fn) {
    var old = object[name];
    object[name] = function() {
      if (fn.length === arguments.length) {
        return fn.apply(this, arguments);
      } else if (typeof old === 'function') {
        return old.apply(this, arguments);
      } else {
        return object;
      }
    };
  }

  var Tag = function() {

    // Augmented Configuration pattern
    // Source: Augmented Configuration Pattern, Matthew Snider
    // URL: http://www.mattsnider.com/augmented-configuration-pattern/

    var options = {};
    var self = this;

    self._params = [];
    self.config = options;
    self._beacon = self.config.beacon +
        '?' +
        'site=' + options.site +
        '&' + this._params.join('&');


    // Support operator overloading
    // Source: JavaScript Method Overloading, John Resig
    // URL: http://ejohn.org/blog/javascript-method-overloading/


    // v2: Global Variables pattern
    addMethod(this,
        'tag',
        function() {

        });
    // v1: Function Parameters pattern
    addMethod(this,
        'tag',
        function(site, limit, partner, debug, use_meta, use_mobile) {

        });
    // v3: Configuration pattern
    // Source: JavaScript Patterns, Configuration Objects, p.77
    addMethod(this,
        'tag',
        function(config, cb) {


          // Source: JavaScript Patterns, Callback Pattern, p.77
          if (typeof cb === 'function') {
            cb();
          }
        });

    return self;
  };

  Tag.prototype.exec = function() {

    // Source: Souders, Velocity 2010 or jQuery Conference 2010
    // Notes: http://stevesouders.com/tests/autohead.html
    var scripts = document.getElementsByTagName('script');
    var target = scripts[scripts.length - 1];
    var container = document.createElement('iframe');
    container.src = this._beacon;
    target.appendChild(container);
  };

  Tag.prototype.param = function(k, v) {
    this._params.push(k + '=' + v);
  };

  var pharos = new Tag(
      {
        site: 1,
        beacon: 'http://199.204.23.142/beacon/1x1.gif'
      }
      );

  pharos.add('_p_pr', document.referrer);
  pharos.add('_p_pt', document.title);
  pharos.add('_p_pl', encodeURIComponent(window.location));
  pharos.exec();



}());
