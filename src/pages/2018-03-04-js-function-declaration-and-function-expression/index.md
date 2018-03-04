---
title: Function declaration and Function expression
tags: javascript, development
author: Zaven Snkhchyan
date: "2018-03-04"
description: Continuation of introduction of important coding topics using Javascript
discussionId: "2018-03-04-js-function-declaration-and-function-expression"
---

# Function declaration and Function expression

## Function declaration vs Function expression

As we know there are couple of ways to create functions in Javascript: you can store function in variable and declare it directly. The former is known as function expression and the latter is known as function declaration. First, let's take a look at function expression.

```js
const a = function() {
  //...do something
};
```

So we create a `const`, give it a name `a`, and afterwards can call the function by calling
`a()`. Works as we expected, we create something, and can use that afterwards. And what about
function expressions. Consider the following piece of code.

```js
function greet(name) {
  console.log('Hello, ' + name);
}
```

Here we cerate a `greet` function which outputs `Hello` and the argument we pass to it. However,
something strange happens when we call the greet function before it is declared.

```js
greet('void'); // Outputs `Hello, void`
function greet(name) {
  console.log('Hello, ' + name);
}
```

It just works. Why? Doesn't javascript read programs line by line, and shouldn't it throw an error ?
Well, not actually. Javascript engines and their execution process is quiet complicated, and to
understand why the very mentioned happens, we should get acquainted with a new concept, called
`Hoisting`.

## Hoisting

To understand hoisting we should first understand how the piece of code we write in Javascript is
executed. As already mentioned, it is not a trivial process, and to dumb it up, consists of two
general parts. First the piece of code that we wrote is "compiled" (not really), and then
interpreted. For example here.

```js
a = 2;
var a;

console.log(a); //logs 2;
```

Here is how the above code outputs 2 and not undefined when `var a` is redeclared on the second
line. First our program "compiles" the code, and declares known variables, in this case some `var a`, after, during interpretation it looks for value assignments and assigns `2` to it's already
known `var a`. So the declaration `var a` comes befor the assignment of `2`. Same is with the
function declarations. However, the hoisting noly affects the same scope, that is, it is immpossible
to access the declared function outside of the scope. It is important to remember, that only
function declarations are hoisted. Let's take a look at the following piece of code:

```js
someFunc(); // TypeError!

var someFunc = function() {
  //...
};
```

Here we can see, that the program doesn't throw a `ReferenceError`; but instead it throws a
`TypeError`, saying that `someFunc is not a function`. This happens for the following reason. The
`compiler` initializes `someFunc` as a variable, and, because there are no other declarations,
engine starts interpreting the program, when it gets to the first line, it sees `someFunc` being
called as a function, however, it sees `someFunc` initialized as a variable, and not a function.

## Summary

You would think, that we should be really carefull while writing declaring functions or variables in
JS. While it's mostly true, in the development you wouldn't be using `var`, but `let` and `const`,
which are block scoped and were introduced in
ES6. http://javascriptkit.com/javatutors/javascript-es6-let-const.shtml). Also, if for some bizzare
reasons you need to write ES5, then `"use strict"` comes to help
(https://johnresig.com/blog/ecmascript-5-strict-mode-json-and-more/).
