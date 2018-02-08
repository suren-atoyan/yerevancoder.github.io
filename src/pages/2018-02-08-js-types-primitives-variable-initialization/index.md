---
title: Javascript. Types, Primitives and Variable Initialization
tags: javascript, development
author: Edgar Khanzadian
date: "2018-02-08"
description: What is a data type What are primitives in JS? How to initialize a variable
discussionId: "2018-02-08-js-types-primitives-variable-initialization"
---

## Primitives

What is data type? 

A data type is a classification that specifies which type of value
a `variable` has and what type of operations
can be applied to it without causing an error.

You can read it a few times to understand. Anyway, it is fine
if you'll not understand it now :D

So we can store and use different data types in our program: strings,
numbers and etc.

Let's list those!

Primitives:
* number
* string
* boolean
* null
* undefined
* symbol (new to ES6)

Object:
* object

The examples of objects are:
* Function
* Array
* Map
* Set


So basically, everything that is not an object is considered as a
Primitive data type. Smart right? :D There are a lot of differences
between those and we're going to understand everything together! For
today, we'll focus our attention on primitive types.

Let's get some practice already!

if you've been on our installation day, then most probably you have
UNIX-based Operating System (Ubuntu, MacOS, Debian, Kali, BSD, etc.).
You already should have `atom` and `node`. Let's setup our workplace.
```bash
# go to Documents directory
cd ~/Documents
# create js file
touch file.js
# open that file with Atom
atom file.js
# now we are going to edit that file
# with atom. After edit, you can run that
# file with
node file.js
```
OR

Open your Unix terminal and type `node`. However, this is not convenient
for writing everything that is bigger than a few lines:

```bash
# open node
node
# now you should this kind of "arrow"
# that means you can write js here
# then push "enter" to evaluate the code
>
# to quit it simply do 2 times CTRL+C
# or write .exit
```

OR

open `developer tools` in the browser and open console there.

So now let's start with numbers. To use those you simply have to type a
number in the console:

### `number`

```js
> 5
5
// evaluated to: 5
```
---
I'm using a symbol `//` called `comments`. Basically, JS doesn't
evaluate everything that is after `//` on the line. It is a very useful
thing when you want to describe what your code does.

JS is not going to evaluate this:
```js
// yo, I'm not evaluated
// :(
```
---

So we tried to evaluate 5 and JS evaluated that to 5. Simple!

let's try to do some math operations! To use those you have to just
type mathematical operation symbols:

```js
// sum
> 5 + 5
10
// evaluated to: 10

// substraction
> 7 - 10
-3
// evaluated to: -3

// deletion
> 10 / 2
5
// evaluated to: 5
> 7 / 2
3.5
// evaluated to 3.5

// multiplication
> 5 * 4
20
// evaluated to: 20
> 3.5 * 2.5
// evaluated to: 8.75
```

JS also has a special value called `NaN` which basically means `Not A
Number`. We are going to discuss it later in the course.

### `string`

But you'll not be able to do a lot of things with only numbers!
Let's try to use text. The data type responsible for that in JS is
called `string`.

There are few ways of declaring a string. We will only review 2 of
those:

```js
> 'Hello world!'
// evaluated to: 'Hello world!'
```
and
```js
> "Hello world!"
// evaluated to: 'Hello world!'
```

There are also some operations which are performed on strings. Here is
the one called `concatenation`. Basically, that means adding one string
to another:

```js
// concatenation
> 'Hello ' + 'world!'
// evaluated to: 'Hello world!'
```

### `boolean`

Next data type I want to talk about is very simple. It's called
`boolean`. It only has values `false` and `true`.

```js
> false
// evaluated to: false
> true
// evaluated to: true
```

In JS and in the majority of other programming languages you are able
to compare different values and get a `boolean` value as a result of
evaluation:

```js
// equal
> 5 === 5
// evaluated to: true

// equal
> 5 === -3
// evaluated to: false

// not equal
> 5 !== 3
// evaluated to: true

// not equal
> 5 !== 5
// evaluated to: false

// less than
> 5 < 6
// evaluated to: true

// less than
> 5 < 5
// evaluated to: false

// less than or equal
> 5 <= 5
// evaluated to: true

// less than or equal
> -5 <= 343
// evaluated to: true

// greater than
> 5 > 3
// evaluated to: true

// greater than
> -5 > -3
// evaluated to: false

// greater than or equal
> 10 >= 10 
// evaluated to: true
```

Javascript also has `==` as an equality operator. It's a convention to
say that `==` is a loose-equal and `===` is a strict-equal. For now just
don't use `==`, use `===` for checking equality. We will describe the
difference later in the course.

### `undefined` and `null`

We also can use it for any other data type, but that's something that
we would like to discuss later in the course :D 

JS also has data types that basically mean `nothing`.

`undefined` and `null`

The first one, `undefined`, means the absence of the value, whereas
`null` means that value is nothing. It maybe confusing at first but
you'll get used to it!

We can also use boolean operators on these data types:

```js
undefined === undefined // true

'hello' === 'hello' // true

```

### `symbol`

We are not going to cover `symbol` data type now. It's a little bit
advanced topic that we'll talk about in a few weeks.

Great, so now we know how Primitive data types look and we also know a
few basic operations on those!

## Variable initialization

### `let`

Now we need to understand where we can store that value. Imagine a
`box` where you can put anything you want. That `box` in JS is called a
`variable`. You basically can put any JS data type in it. There are a
few ways of initializing a variable. The first way is using `let`:

```js
// initialized a variable called a
let a;
```
Now we just initialized a `variable` which has a value of nothing. As
we've already discussed, a value of nothing in JS is represented as
`undefined`.

```js
> let a;
> a === undefined
// true
```

Now let's put some value in it:

```js
> a = 5;
// 5
> a;
// 5
```

Congratulations! Now we have `number` 5 in the `variable` `a`.
We can also change the value of `a` to string.

```js
> a = 'string';
```

In the majority of programming languages, you are actually not able to
do so. There you initialize a `variable` and tell it to ONLY store one
data type. It is also possible in Javascript, but for that, you have to
use `TypeScript` or `Flow`. We are going to cover it later in the
course. For now, you can just google it! :D 

### `const`

As you've already found out, when we initialize a `variable` with `let`
we are able to change the value that is stored in the `variable`!! In
this course, we are going to mostly learn Functional Programming. And
functional programming doesn't like mutatable (changeable) variables!
Thus it's always better to use `const`, which stands for `constant`:

```js
const b = 5;
// 5
b = 7;
// TypeError: Assignment to constant variable.
```

and using `let`:

```js
let c = 6;
// 6
c = 8;
// Totally fine, evaluated to: 8
```

This helps you to keep your mind organized and get fewer bugs in the
program later in the development process!

### `typeof`

Also, Javascript provides a special operator called `typeof` that
describes you what type is in the variable right now. The output of
that operator is always `string`. This is how to use it:

```js
const first;
typeof first;                // "undefined"

const second = "hello world";
typeof second;                // "string"

const third = 42;
typeof third;                // "number"

const fourth = true;
typeof fourth;                // "boolean"

const fifth = null;
typeof fifth;                // "object" -- weird, bug

const sixth = undefined;
typeof sixth;                // "undefined"

// this is object, hence not a Primitive data type
// we will study it in the upcoming lectures
const seventh = { b: "c" };
typeof seventh;                // "object"
```

### `console.log()`

Sometimes you want your program output something on the screen. For
that, you can use `console.log()`. It is a `function call` (will get to
it later), which lets you output the value to the screen. Let's try
this:

```js
const hello = 'helloWorld!';
let hey = 'Yo!';

console.log(hello);
console.log(hey);
console.log('OMG');
```
and the output is something like:

```bash
helloWorld!
Yo!
OMG
```

### Assignment operator shortcuts

The majority of programming languages have some kind of `shortcuts` for
arithmetic operations. Let's review some of those:

```js
let a = 5;
a = a + 1; // add 1 to a
console.log(a); // 6

let b = 10;
// here you can use any arithmetic operation in cooperation with =
// e.g. += , -=, /=, *=, etc...
b += 1; // add 1 to the value of b and put the updated value back to b
console.log(b); // 11

let c = 2;
++c; // increments c by 1
console.log(c); // 3

// we also can do 
// c++;
// that increments the value of c by 1
// but it does it in the other way.
// We will describe it later in the course!
```

---

Thanks for reading!

Don't forget that you can always reach members of the iterate community
ask questions, fix issues and bugs, also just talk about random things
in the iterate Slack [channel](https://iterate-hackerspace.slack.com/messages).
