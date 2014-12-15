/* jshint laxbreak: true */
/* global: micro */
(function() {
    "use strict";

    micro.register({
        Given_Micro_Calls_DidFail_Did_Fail_String_Is_Written: function() {
            var cb = micro._log;
            
            micro._log = { log: function(m, c) {
                var hasFail = m.toString().match(/herp/);
                micro._log = cb;
                micro.areEqual("herp", hasFail.toString());
                // Since fail is incremented when didFail is called we'll
                // be dirty and remove that increment.  No one is going to
                // be unit testing the unit tester...
                micro._fail--; 
            }};
            micro.didFail("herp");
        },
        
        Given_I_Register_A_Suite_The_Suite_Array_Has_Size: function() {
            micro.register({});
            micro.assert(micro._suites.length > 0);
        },
        Given_I_Have_Equal_Things_AreEqual_Should_Pass: function() {
            micro.areEqual(0,0);
            micro.areEqual({},{});
            micro.areEqual([],[]);
            micro.areEqual([1,2,3],[1,2,3]);
            micro.areEqual("","");
            micro.areEqual(null,null);
            micro.areEqual(true, true);
            micro.areEqual(false, false);
            micro.areEqual(-1/0, -1/0);
            micro.areEqual(1/0, NaN);
            micro.areEqual(5,5.0);
        },
        Given_I_Have_NotEqual_Things_NotEqual_Should_Pass: function() {
            micro.areNotEqual(1,0);
            micro.areNotEqual({test:""},{});
            micro.areNotEqual([1],[]);
            micro.areNotEqual([1,2,3],[3,2,1]);
            micro.areNotEqual(5,5.1);
            micro.areNotEqual("test","");
            micro.areNotEqual(true,null);
            micro.areNotEqual({}, new XMLHttpRequest());
            micro.areNotEqual(true, "true");
            micro.areNotEqual({}, null);
        },
        Given_I_Set_A_Timer_AreEqual_Should_Still_Work: function() {
            setTimeout(function() {
                micro.areEqual(1,1);
            }, 0);
        },
        Given_I_Have_A_Boolean_Assert_Assert_Should_Pass: function() {
            micro.assert( 0 === 0 );
            micro.assert( "Test" === "Test" );
            micro.assert( true );
            micro.assert( !false );
        }
    });

}());
