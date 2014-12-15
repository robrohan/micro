# µ - micro javascript unit testing framework

Micro is meant to be a simple, basic, unit testing framework.  It's useful for small projects, or for _Proof of Concept_ applications where you want a bit of testing, but you don't need a large number of test suite features.

## Getting Started

There are just three steps to using micro:

1. Create a test HTML and include your library, test files, the single _src/micro.js_ file, and the _micro.run_ call.
2. Create your javascript unit test file(s)
3. Open the HTML file in your favorite browser, and view the console.

### Create a test HTML

You can use the _index.html_ file included with micro as an example.  It is important to include _micro.js_ before your individual test files.

    <html>
    <head>
        <title>µ</title>
    </head>
    <body>
        <h1>µ</h1>
        <h2>Open the console for test results</h2>
    
        <script src="src/micro.js" encoding="utf8"></script>
        <script src="test/micro_test.js" encoding="utf8"></script>
        <script>micro.run();</script>
    </body>
    </html>

After micro and your tests are included, calling _micro.run()_ will run all the registered test suites.  To view the tests, their output, and any stack traces view the browsers console.

### Create Unit test files

Here is an example of how to write a simple test suite with three tests:

    micro.register({
        Given_I_Have_Equal_Things_AreEqual_Should_Pass: function() {
            micro.areEqual([1,2,3],[1,2,3]);
        },
        Given_I_Have_NotEqual_Things_NotEqual_Should_Pass: function() {
            micro.areNotEqual([1,2,3],[3,2,1]);
            micro.areNotEqual(5,5.1);
        },
        Given_I_Have_A_Boolean_Assert_Assert_Should_Pass: function() {
            micro.assert( "Test" === "Test" );
            micro.assert( !false );
        }
    });

The call to _micro.register_ registers your test suite.  The functions of that registered object are considered tests if they begin with _Given_

**Tests _must_ begin with the word _Given_.**

### Asserts

There are only three assert functions in micro:

* micro.areEqual(a,b)
* micro.areNotEqual(a,b)
* micro.assert([boolean expression])

## Using Grunt (Minification and what not)

I wanted micro so I could have a no-fuss unit testing framework, but if you want minified files, and don't mind using grunt, you can do the following:

    $ npm install
    $ grunt

That will install the dependencies and run _jshint_, and _uglify_.  Once the commands finish, you will have a minified _micro.min.js_ file in the _build_ directory (~1.7K).

**Note** You do not need to do this.  Setting up _npm_ and _grunt_ can be a pain in the arse.  You can use the _src/micro.js_ file directly if you don't want the hassle.

## License

Micro is in the public domain

