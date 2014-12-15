/* jshint laxbreak:true */
// µ - micro unit testing framework
var micro = micro || {};

(function(){
    "use strict";
    
    // All the registered test suites
    micro._suites = [];
    // Console.log callback.
    micro._log = console;

    // Basic run metrics
    micro._ran = micro._asserts = micro._pass = micro._fail = 0;

    micro._style = {
        bigBlack: "background: black; color: white; font-size: 2em; padding: 5px;",
        black: "background: black; color: white; font-size: 1.2em;",
        green: "background: green; font-weight: bold;",
        red: "background: red; font-weight: bold;"
    };

    ///////////////////////////////////////////////////////////////////

    // Hello banner
    micro.banner = function() {
        micro.writeToLog("               µ               ", micro._style.bigBlack);
        micro.writeToLog("");
    };

    // Gets everything ready for another run
    micro.resetRun = function() {
        micro._ran = micro._asserts = micro._pass = micro._fail = 0;    
    };

    // Write a value to the console with a optional css style
    micro.writeToLog = function(message, style) {
        var s = style || 'background: #fff; color: #000';
        micro._log.log("%c " + message, s);
    };

    //////////////////////////////////////////////////////////////////

    micro.assert = function(b) {
        micro._asserts++;
        if(b) {
            micro.didPass();
        } else {
            micro.didFail();
        }
    };

    micro.areEqual = function(a, b) {
        micro._asserts++;
        if(JSON.stringify(a) === JSON.stringify(b)) {
            micro.didPass();
        } else {
            micro.didFail(a + ' !== ' + b);
        }
    };

    micro.areNotEqual = function(a, b) {
        micro._asserts++;
        if(JSON.stringify(a) !== JSON.stringify(b)) {
            micro.didPass();
        } else {
            micro.didFail(a + ' === ' + b);
        }
    };

    //////////////////////////////////////////////////////////////////

    micro.didPass = function() {
        micro.writeToLog('    Pass    ', micro._style.green);
        micro._pass++;    
    };

    micro.didFail = function(message) {
        micro.writeToLog(
            '    Fail ' +  message + '    ',
            micro._style.red);
        micro.writeToLog(new Error().stack);
        micro._fail++;    
    };

    // Register a test suite function
    micro.register = function(tests) {
        micro._suites.push(tests);
    };

    // Kick off a unit test run
    micro.run = function() {
        micro.banner();
        micro.resetRun();
        for(var x=0; x < micro._suites.length; x++) {
            var suite = micro._suites[x];
            for(var fx in suite) {
                if(fx.slice(0, 5) === 'Given') {
                    micro._ran++;
                    micro.writeToLog(
                        fx,
                        micro._style.black);
                    suite[fx]();
                }
            }    
        }

        setTimeout(function() {
            micro.writeToLog("");
            micro.writeToLog(
                '    Ran: ' + micro._ran + ' Assert: '+ micro._asserts
                    + ' Failed: ' + micro._fail
                    + ' Passed: ' + micro._pass
                    + '    ',
                micro._style.bigBlack);
        },0);
    };
}());

