---
title: JavaScript. Edge Cases
tags: javascript, development
author: Elina Hovakimyan
date: "2018-03-06"
description: tricky parts in javascript, edge cases
discussionId: "2018-02-08-javascript-edge-cases"
---

# Edge cases in JavaScript

Hi everyone, today we are going to talk about the edge cases in JS

## Small Decimal Values

The most (in)famous side effect of using binary floating-point
numbers (which, remember, is true of all languages that use IEEE
754 -- not just JavaScript as many assume/pretend) is:

```js
0.1 + 0.2 === 0.3; // false
```

Simply put, the representations for 0.1 and 0.2 in binary
floating-point are not exact, so when they are added, the result
is not exactly 0.3. It's really close: 0.30000000000000004, but if
your comparison fails, "close" is irrelevant.

FYI, `0.1 + 0.5 === 0.6` works perfectly fine.

So you just have to be careful while working with floating numbers.

One way of handling this issue in JS is to use a tiny "rounding
error": `Number.EPSILON`. Here is its polyfill:

```js
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52);
}
```

You simply have to create a function which does the "close to
equal" comparison with `Number.EPSILON`:

```js
function numbersCloseEnoughToEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b); // true
numbersCloseEnoughToEqual(0.0000001, 0.0000002); // false
```

## NaN

```js
NaN === NaN; // false
```

`NaN` is a very special value in that it's never equal to another
`NaN` value (i.e., it's never equal to itself). It's the only
value, in fact, that is not reflexive (without the Identity
characteristic `x === x`). So, `NaN !== NaN`.

So how do we test for it, if we can't compare to `NaN` (since that
comparison would always fail)?

```js
var a = 2 / 'foo';

isNaN(a); // true
```

Easy enough, right? We use the built-in global utility called
`isNaN(..)` and it tells us if the value is `NaN` or not. Problem solved!

Not so fast.

The isNaN(..) utility has a fatal flaw. It appears it tried to take the meaning of NaN ("Not a Number") too literally -- that its job is basically: "test if the thing passed in is either not a number or is a number." But that's not quite accurate.

```js
var a = 2 / 'foo';
var b = 'foo';

a; // NaN
b; // "foo"

window.isNaN(a); // true
window.isNaN(b); // true -- ouch!
```

Clearly, "foo" is literally not a number, but it's definitely not
the NaN value either! This bug has been in JS since the very
beginning (over 19 years of ouch).

As of ES6, finally a replacement utility has been provided:
`Number.isNaN(..)`. A simple polyfill for it so that you can
safely check NaN values now even in pre-ES6 browsers is:

```js
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return typeof n === 'number' && window.isNaN(n);
  };
}

var a = 2 / 'foo';
var b = 'foo';

Number.isNaN(a); // true
Number.isNaN(b); // false -- phew!
```

# Infinity

Developers from traditional compiled languages like C are probably
used to seeing either a compiler error or runtime exception, like
"Divide by zero," for an operation like:

```js
var a = 1 / 0;
```

However, in JS, this operation is well-defined and results in the
value Infinity (aka Number.POSITIVE_INFINITY). Unsurprisingly:

```js
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

As you can see, -Infinity (aka Number.NEGATIVE_INFINITY) results
from a divide-by-zero where either (but not both!) of the divide
operands is negative.

JS uses finite numeric representations (IEEE 754 floating-point,
which we covered earlier), so contrary to pure mathematics, it
seems it is possible to overflow even with an operation like
addition or subtraction, in which case you'd get Infinity or
-Infinity.

For example:

```js
var a = Number.MAX_VALUE; // 1.7976931348623157e+308
a + a; // Infinity
a + Math.pow(2, 970); // Infinity
a + Math.pow(2, 969); // 1.7976931348623157e+308
```

According to the specification, if an operation like addition
results in a value that's too big to represent, the IEEE 754
"round-to-nearest" mode specifies what the result should be. So,
in a crude sense, `Number.MAX_VALUE + Math.pow( 2, 969 )` is
closer to `Number.MAX_VALUE` than to `Infinity`, so it "rounds
down," whereas `Number.MAX_VALUE + Math.pow( 2, 970 )` is closer
to `Infinity` so it "rounds up".

If you think too much about that, it's going to make your head
hurt. So don't. Seriously, stop!

Once you overflow to either one of the infinities, however,
there's no going back. In other words, in an almost poetic sense,
you can go from finite to infinite but not from infinite back to
finite.

It's almost philosophical to ask: "What is `Infinity` divided by
`Infinity`". Our naive brains would likely say `1` or maybe
`Infinity`. Turns out neither is true. Both mathematically and in
JavaScript, `Infinity / Infinity` is not a defined operation.
In JS, this results in `NaN`.

## Negative zero

It may confuse you as students of Computer Science major, but
Javascript has both negative and positive zeros!

Besides being specified literally as -0, negative zero also
results from certain mathematic operations. For example:

```js
var a = 0 / -3; // -0
var b = 0 * -3; // -0
```

However, there is a strange behavior when you want to convert
`-0` to string:

```js
var a = 0 / -3;

// (some browser) consoles at least get it right
a; // -0

// but the spec insists on lying to you!
a.toString(); // "0"
a + ''; // "0"
String(a); // "0"

// strangely, even JSON gets in on the deception
JSON.stringify(a); // "0"
```

and surprisingly, the reverse operation from `string` to
`number` results in a correct way:

```js
+'-0'; // -0
Number('-0'); // -0
JSON.parse('-0'); // -0
```

In addition to stringification of negative zero being deceptive to
hide its true value, the comparison operators are also
(intentionally) configured to lie.

```js
var a = 0;
var b = 0 / -3;

a == b; // true
-0 == 0; // true

a === b; // true
-0 === 0; // true

0 > -0; // false
a > b; // false
```

In nowadays browsers you can get the right output of
`console.log` tho:

```js
console.log(-0); // -0
```

However, older browsers may still return 0 (As a good programmer,
you have to use an up-to-date software, right?)

Clearly, if you want to distinguish between `0` and `-0`, you
can't just rely on what the developer console outputs. So let's be
a little bit more clever:

```js
function isNegZero(n) {
  n = Number(n);
  return n === 0 && 1 / n === -Infinity;
}

isNegZero(-0); // true
isNegZero(0 / -3); // true
isNegZero(0); // false
```

Great! But why do we need `-0`?

There are some kind of applications that use that sign to find out
the direction of movement before it came to 0. Preserving the sign
of 0 prevents potentially unwanted information loss.

### `Object.is(..)`

As of ES6, there's a new utility that can be used to test two
values for absolute equality, without any of these exceptions.
It's called `Object.is(..)`:

```js
var a = 2 / 'foo';
var b = -3 * 0;

Object.is(a, NaN); // true
Object.is(b, -0); // true

Object.is(b, 0); // false
```

Let's try to reimplement `Object.is(..)` for pre-ES6
environments:

```js
if (!Object.is) {
  Object.is = function(v1, v2) {
    // test for `-0`
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    // test for `NaN`
    if (v1 !== v1) {
      return v2 !== v2;
    }
    // everything else
    return v1 === v2;
  };
}
```

`Object.is(..)` probably shouldn't be used in cases where ==
or === are known to be safe (see Chapter 4 "Coercion"), as the
operators are likely much more efficient and certainly are more
idiomatic/common. `Object.is(..)` is mostly for these special
cases of equality.

## Value vs. Reference

Let's start from the example:

```js
var a = 2;
var b = a; // `b` is always a copy of the value in `a`
b++;
a; // 2
b; // 3

var c = [1, 2, 3];
var d = c; // `d` is a reference to the shared `[1,2,3]` value
d.push(4);
c; // [1,2,3,4]
d; // [1,2,3,4]
```

Simple values (aka scalar primitives) are always assigned/passed
by value-copy: null, undefined, string, number, boolean, and ES6's
symbol.

Compound values -- objects (including arrays, and all boxed object
wrappers -- see Chapter 3) and functions -- always create a copy
of the reference on assignment or passing.

Since references point to the values themselves and not to the
variables, you cannot use one reference to change where another
reference is pointed:

```js
var a = [1, 2, 3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]

// later
b = [4, 5, 6];
a; // [1,2,3]
b; // [4,5,6]
```

## `this`

Consider this code snippet:

```js
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times `foo` is called
  this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(foo.count); // 0 -- WTF?
```

Congratulations, we've just created a global variable `count`
with value `NaN`! `this` in `this.count++` points to
global object! :O

This is another way of creating and accesing global variables
(never do this):

```js
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2
```

To solve this issue, we have to call foo function with binding to
function foo (which is apparently an object):

```js
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times `foo` is called
  // Note: `this` IS actually `foo` now, based on
  // how `foo` is called (see below)
  this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    // using `call(..)`, we ensure the `this`
    // points at the function object (`foo`) itself
    foo.call(foo, i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(foo.count); // 4
```

Let's see what happens when you share reference of a function to
another variable and then call it:

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo; // function reference/alias!

var a = 'oops, global'; // `a` also property on global object

bar(); // "oops, global"
```

Right! So what does this mean? `bar === obj.foo`. These
variables are sharing the same reference to the same shared value.

Another example to show this problem from another side:

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // `fn` is just another reference to `foo`

  fn(); // <-- call-site!
}

var obj = {
  a: 2,
  foo: foo,
};

var a = 'oops, global'; // `a` also property on global object

doFoo(obj.foo); // "oops, global"
```

## Automatic Semicolon Insertion

One of the features that JavaScript offers is that semicolons are optional for programmers. However, you should be attentive with this! Sometimes missing the semicolons can result in errors or undesired results.

### Function return statements

Let's take a look at the function below. What will it return?

```js
const hello = function() {
  return
  ('How are you?')
};

hello() //undefined
```

Oops! It returns `undefined` instead of asking how are you. But why? Well, the reason is that it
added a semicolon after `return` which means you didn't mention what to return; thus, it's
undefined.

What if you want to return several things and it's not so comfortable to write it after the
`return`. You just need to add parentheses (see below).

```js
const hello = function() {
  return(
    "How are you?"
  )
}

hello(); //How are you?
```

### Starting a line with parentheses || angle brackets

Another tricky edge case in JavaScript is when you skip putting a semicolon and start the next line
with parentheses. Look at this code.

```js
const trickyVariable = 'I am a String'
(function() { console.log('Be Happy If You See Me') })()
// Uncaught TypeError: "I am a String" is not a function
```

To fix this error you should add a semicolon after defining a variable.

```js
const trickyVariable = 'I am a String';
(function() {
  console.log('Be Happy If You See Me');
})();

// Be Happy If You See Me
```

The same happens with `angle brackets [ ]`. Be careful in such cases!

## Other

This isn't even an edge case, but a lot of people make a mistake
right here:

```js
5 + '-5' === '5-5'; // true
```

number `5` is simply coerced (type casted, type converted) to
a string `"5"` and the concatenated to `"-5"`

The same case with `-` sign! As we know, there is no such
operation for string using `-`. This JS will coerce `"-5"` to
`-5` and then do a mathmatical operation `-`:

```js
5 - '-5' === 10; // true
```

A lot of beginner JS developers have a trouble with
understanding references in JS. As one of the biggerst issues
is this one:

```js
[] === []; // false
```

`===` sign compares two reference-values. And of course
references to 2 different arrays are different, thus the
compareson fails.

A very popular question for a JS developer! Take a minute and
try to understand why would this happen!

```js
{} + [] // 0
[] + {} // [object Object]
```

Ok, I hope you tried it! So here is the thing.

Let's start with the first line

When we do `{} + []`, JS first reads `{}` as a block scope,
run it and then immediately exits it because there is no
operation to do (It doesn't recognize `{}` as object in this
case!). And then we are left with `+ []` which means "change
the type of `[]` to a number" (Remember how we change a string
to a number with the same operation `+"5" === 5`).
So JS simply coerces `[]` to `0`

```js
Number([]) === 0; // true!
```

The second line!

In this case JS understands `+` as a concatenation sign
because on both sides of the operation we can see objects
(Array and object)! So `+` just coerces `[]` to `''` and `{}`
to `[object Object]`. After that it concatenates
`'' + [object Object]` which of course results in
`[object Object]`!

This is the case we've talked about on our slack channel!

```js
const x = [];
x == x; // true
x == !x; // true
```

As we all know the `==` operator doesn't preserve types of the
values on both sides. So it coerces those until it gets the same
type!

So let me describe you this case. On the second line where we have
`x == x`, we have an object (array) on both sides. We just check
if the reference of these objects are the same or not (of course
those are the same because it's the same variable). What's about
the 3rd line? On the left side we still have a reference to an
array, but on the right side we have (what?) a boolean value!!!
Why does that happen? EZ, `!` operator changes the type of any
value to boolean! So `==` operator will do coercion of both sides
to get the same type. Both are coerced to `number`. So `[] -> 0`
and `false -> 0`. That's it!

Let's now consider this funny case! Have you thought about
overwriting `undefined`? Sounds crazy, right? JS doesn't think so!

```js
var undefined = 2; // really bad idea!
```

NEVER DO THIS.

<!--
So to prevent this from happening use `'use strict'` (We will talk about it in the next lecture but for now just use it :D )!

```js
"use strict";
var undefined = 2; // TypeError!
``` -->

<!-- ```js
// just in case you don't want to add
// 'use strict' to the whole environment
foo();
function foo() {
	"use strict";
	undefined = 2; // TypeError!
}
``` -->

Thanks for reading! Hope you liked it! :D

### Reference

"You don't know JS": https://github.com/getify/You-Dont-Know-JS
"Mauro Bringolf": https://maurobringolf.ch/2017/06/automatic-semicolon-insertion-edge-cases-in-javascript/
