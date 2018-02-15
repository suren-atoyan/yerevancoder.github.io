---
title: JavaScript. Functions scopes and var.
tags: javascript, development
author: Robert Gevorgyan
date: "2018-02-15"
description: Learn about functions, scopes and var.
discussionId: "2018-02-10-js-functions-scopes-and-var"
---

# Functions and scope

## What the function?

Alright, we already know the very basic statements that are enough for writing some reasonable, somewhat useful programs. The next thing to do is studying functions. So what exactly are functions?

So all of you tried to solve a jigsaw puzzle right? There is a "strategy" of doing that. If you have tried to do it with your friends, usually each one of you solves just one part of the puzzle and then at the end you connect all the parts together. 

In programming world, all the problems are interesting puzzles that need to be solved. And usually, the same strategy works -- divide the puzzle into smaller pieces, solve them getting bigger pieces, and then merge those bigger pieces together. These bigger pieces that contain some smaller things, like `for`'s and `if`'s are called functions. For example, usually when solving puzzle we start with connecting the edges because the edges are simpler to find and locate correctly.
```javascript
const solveEdges = (puzzle) => {
    for(let piece in puzzle) {
        if(piece === 'edge') {
            locatePiece();
            addToPuzzle(puzzle, piece);
        }
    }
}
```
How many new things do you see?
1. Function declaration - There are several ways to define a function in JS and we will talk about them in 10 minutes. However, nowadays, the most popular and advised way of creating a function is using the syntax below.
```javascript
const anyFunctionName = (putArgumentsHere) => {
    // body
} 
```
The syntax is straigtforward. The arrow basically says "take whatever inside the parantheses before me, give them to where I point and do whatever it says until you see a return"

2. Function call to locatePiece - We see a function call and the syntax is pretty easy. You put the name of the function you want to call and then parantheses. In parantheses you can put ANY number of arguments (values that will be passed to the function).
3. Function call to addToPuzzle - This is the logical continuation of #2 here. We put 2 arguments inside the parantheses. 

In a sense, functions in math and functions in programming are pretty close syntax-wise. We specify how it will behave, and after that we give some arguments to them and get back values after applying the rules we specified.

To make this more clear, let's imagine my friend Edgar is a function. I told him that when I call his name and say a number to him, he should shout back my number times 2. So if I shout Edgar 5 he will get back saying 10. Edgar in this case, is a function which takes one argument - a number and returns a number.

So now a question, what if we shout Edgar and instead of a number tell, let's say a word. Will it work or not?

Challenge, can you write the Edgar function now?

So how many ways are there to create a function. Well let's just count them but we will use just one of those types for now.

1. Normal function. - Defining a function as a function.
```javascript
function something(someArg) {
    return someArg + 1;
}
```
2. Anonymous function - Not the best way to do it.
```javascript
const sum = function(num1, num2) {
    return num1 + num2
}
```
3. Arrow (or sometimes called Fat Arrow) functions - Modern clear and preferable way to create functions.
```javascript
const sayHello = (name) => {
    const text = "Hello " + name;
    return text;
} 
```

There are some differences between these three declarations, but those are a out of scope of today's discussion because they are a bit more advanced.

### Nesting the functions. 

As functions are just like numbers and strings, you can put them in any variable almost at any place. This means that even in some function, you can still create functions inside of them. Let's take a look.
```javascript
const a = () => {
    const b = (aaa) => {
        const c = (bbb) => 
            // So on.
        }
    }
}
```

This is called nesting and this will be useful for explaining scopes.


## Scopes

Scope is a topic that is closely related to functions. We will discuss it now. 

Question. What do we usually do if we are looking for remote control or for a sock to make a pair? :smile: We start with the couch (under the bed) and then after not finding it there we start looking around the table and then in the room and then in the whole house and then maybe, if you desperately need it, outside (with a bloody rage in your eyes already :sweat_smile:) So what if a computer needs something like a remote control? How does it work? Let's have a look at a code
```javascript
const a = 5;
const b = () => {
  const c = () => {
    console.log(a);
  }
}
```

So how does the computer find the variable `a` to console.log it. Just like you try to locate the remote control! When the computer is already informed that it is asked to print a, it will start looking for it. The first search is done within the first pair of curly braces the statement is in, then the second one is done in a bigger body, and this grows bigger until global `scope`.  If it manages to find one, it will run the program, if not, it will give undefined.


There are 3 types of scopes. `Functional`, `global` and `block` scopes. Before `let` and `const`, there was no notion of block scope. let and const brought the idea of block scopes to the JS. So what's the difference. The names may suggest some things but let's talk about it in detail. 

* Functional scope - This means that the search area widens function by function. If you call `a`, it will look inside a function, and then if not found, maybe in the function that original function was declared in and so on. If it cannot find `a` in any level though, it will go out to global scope.
* Block scope - This means that the search area widens block by block. As you may remember, block is anything that starts with `{` and ends with `}`.

_NOTE: The variables get destroyed as soon as the execution of the program leaves its scope. This means that if the `for` loop is finished, all the `const`s and `let`s that were declared inside it (including the one declared in the parantheses after the keyword for) will be deleted.

Let's take a look at the examples to see how it works.

```javascript
const a = 15;
const someFunction = () => {
  const a = 8
  if(5 < 6) {
    const b = 10;
  } else if (10 > 9) {
    const c = 15;
    console.log(b);
  } else {
    const b = 5;
    console.log(b);
    console.log(a);
    console.log(c);
    }
  console.log(a)
}

console.log(a);
console.log(b);
console.log(c);
```

Imagine this as going into rooms. For example here outside we have a box with `a` written on it. We put 15 in it and move into someFunction room. In this room we also have a box with `a` written on it. We put 8 in it. Now suppose a guy who was not outside wants to find an `a`. Which one do you think it will find. The same logic applies to all the scopes, but the notion of room changes -- in case of function -- functions are rooms in case of blocks any `{}` block is a room.

Let's figure out this example the same way. Keep in mind that `const`s are block scoped. 

## Var

Now we have `const` and `let`, both are block scoped. There should be another way of declaring a variable for a functional scope. That way is called `var`. The name `var` comes from the word...  variable. The only difference is that it's functionally scoped. Usually using `let`s and `const`s is better as it makes the code more readable and clear. Generally, for any variable, you need to keep its scope as small as possible. Not doing that will cause confusion and maybe some unwanted side effects. Have a soul, write good code please. 

Whatever, we need to talk about var anyways, as there is a bunch of legacy code that needs to be supported. Maybe one day you will encounter such code and work on it.
```javascript
var b = 4;
function somefunction() {
  var a = 5;
  console.log(a);
}
console.log(a);
console.log(b);
```

