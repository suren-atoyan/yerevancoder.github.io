---
title: JavaScript Objects and Arrays
tags: javascript, development
author: Robert Gevorgyan
date: "2018-02-21"
description: A little talk about arrays, objects and useful methods associated with them.
discussionId: "2018-02-21-js-arrays-and-objects"
---

# A lists of things

This blog post is part of the posts series done for iterate hackerspace, explaining some of basic programming concepts implemented in JavaScript.

##### Table of contents

[Introduction to arrays](#intro-array)
[Basic array operations](#array-operations)

* [The ways we know](#we-knew)
* [Push](#push)
* [Pop](#pop)
* [Map](#map)
* [Other methods](#others)
  [Introduction to objects](#intro-obj)
  [Iterating over objects](#obj-operations)
  * [The ways we know](#we-knew)
  * [Object,keys()](#keys)
  * [Object,values()](#values)
  * [Others](#others)
    [Some fun stuff: Bugs ](#bugs)
    [Aftermath ](#aftermath)

## Introduction to arrays

Allrighty then, we already know the primitive data types such as `numbers`, `booleans`, `strings` etc. Usually though, we need not only one of them, but a whole list in a certain order. Like, for example, when you have average wind speed data by days and you want to make some statistical analyze. Obviously, having data about only just 1 day is not enough, you will need at least the data of 1 month, which is 30-31 numbers in a list, in a specific order. In JavaScript, those lists are called **_arrays_**. Here's how you declare an array;

```javascript
const a = [1, 2, 4, 5, 10, 49, 14];
```

You can have as many elements as you want. Those elements will be given indices. Every element will have an index, starting from 0. So to get the data of the first `member` of the array you write.

```javascript
a[0];
```

In the same manner, to get the data of the 4th `member`.

```javascript
a[3];
```

You can do a lot of stuff with arays, and some of the operations will be discussed now.

## Basic array operations

### The ways we know

Usually, you will not only need data, but also need to do some specific things for every item of the array. Of course, we already know some ways to do it, as Array type is also Iterateable (has countable, discrete items). We can use `for loops`

```javascript
const a = [1, 3, 5];
for (let i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```

OR

```javascript
const a = [1, 3, 5];
for (let i of a) {
  console.log(i);
}
```

OR

```javascript
const a = [1, 3, 5];
for (let i in a) {
  console.log(a[i]);
}
```

Let's talk a little about this code. The first unknown thing here is `a.length`. However, as common sense may suggest, it just gives back the `length` of the array. Second thing is that in case of `for .. of` loop we just logged `i` but in case of `for .. in` we logged `a[i]`. Can you answer why?

### The ways that are better

See, we know some ways already to deal with arrays. Bud do we usually need those ways in case of some common operations, like finding a specific item that satisfies the condition, or doing some operation on every item of the array and so on.
**_The answer is no_**
Why? Because kind people working on improving JS have created a bunch of `methods` (special synonym for the word `function`, in case that those collection of functions are specified for in conjuction with a certain data type), which will do almost everything you need for you. Let's take a look at some array `methods`

#### 1. Push

You can use push to append one or many elements at the end of the array. Try it yourselves.

```javascript
const a = [1, 2, 3, 5];
a.push(6);
console.log(a);
```

As you may notice, the a is now `[1, 2, 3, 5, 6]`. Remember: You can add one or more items using push.

#### 2. Pop

This is the reverse of `push`. It takes out the last element of the array. Try it.

```javascript
const a = [1, 2, 3, 5];
console.log(a.pop()); // will log 5;
console.log(a); // a is now [1, 2, 3]
```

**_Warning_**: Using pop in some places may cause bugs and loss of data; If you need to access just the data without removing the item use:

```javascript
a[a.length - 1]; // Gets the last element of the array w/out removing
```

#### 3. Map

We reached the interesting part :smiley:

The function `map` is used to do something on every item of the array. It gets 1 argument -- a function which will be applied on the every element. It will return a new array -- the resultant array without changing anything in the original one. The function that map will get has 3 arguments.

1. The current item
2. The index of the current item
3. The whole array.

We usually don't need the 3rd one though, we can just leave it missing.
Let's check out an example.

```javascript
const a = [1, 2, 3, 5];
const b = a.map((currentItem, currentItemIndex) => {
  console.log(currentItem, currentItemIndex);
  return currentItem * 2;
});
console.log(a, b);
```

### Other functions.

Let's take a look at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) to see some other functions. Also you can use [Sarah Drassner's array explorer](https://sdras.github.io/array-explorer/) which is probably the easiest way to find the method you want to use.

## Introduction to Objects.

Okay, now we know about arrays. They are used when we have a lot of things of the same types. But let's imagine for example the table. Can you name some characteristics of the table? Do they all have the same type? Do, for example, color and width both have the same type? No, because one of them is a color name -- a string and the other one is a number.

This example shows that we don't only need primitive data types and arrays, we also need some containers to keep different kinds of data about the same object in one place.

That's why we have `objects`. You may remember them from the lecture about loops, where we had a row of people each memorising a number.

Let's take a look at some object.

```javascript
const table = { width: 15, height: 10, length: 30, material: 'wood' };
```

As you can see, we have some correspondence. There is a `key` and corresponding `value`. Multiple of those pairs are divided from each other by commas. So this is the data about a wooden table with width 15, height 10 and length 30.

What if we want to know it's height given the object?

```javascript
console.log(table.height);
```

The `.` is called `property accessor operator`, because `height` is the property of the table (makes sense in English right?).

Let's do some brain damage! We can have objects inside objects. Let's say we have a box and inside it we have some glove.

```javascript
const box = {
  height: 30,
  width: 50,
  glove: {
    material: 'silk',
    fingers: 5,
    beautiful: true,
  },
};
```

So the glove is the property of the box, but glove has its own properties. Now how do we know if the glove is beautiful or not?

```javascript
console.log(box.glove.beautiful);
```

This is just getting the property of the property.

### Iterating over the Objects.

#### The ways we know

We already know that we can use 'for .. in' loop to iterate over the object. In that case, the iterator variable will have the key in it.

```javascript
const someObj = { a: 1, b: 2, c: 3 };
for (let i in someObj) {
  console.log(i, someObj[i]);
}
```

Do you see something strange here? We used another syntax other than the `property accessor operator` to get the value associated with the current key. That's because in case of writing
`someObj.i` JS will literally try to find the property `i`. It won't understand that `i` is a
varable and that it needs to change that `i` with the key value. So we use array like syntax to get
the value associated with the key. In this case, whatever is inside `[]` is treated like a
string. So we could do something like.

```javascript
const table = { width: 15, height: 10, length: 30, material: 'wood' };
console.log(table['width']);
```

This is a legal syntax, but it is usually used only in cases when the name of the property is stored
in the variable and the `.` operator can't be used.

Getting back to the topic. Using `for .. in` loop we can iterate over the object, but just like in
case of the arrays, we can use some methods and make our code cleaner and the job of others easier.

There are 2 main methods that we will need, if we need to iterate over the object. Those 2 will give
back an array given the object. Let's take a look.

#### The ways that are better.

##### Object.keys()

This method will give back the keys of the object in the array. The argument of this `method` should be an object. Here's an example

```javascript
const someObj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(someObj));
```

Now, after having an array we can use `any` array method. On the object. Try experimenting with this at home.

##### Object.values()

Guess what this method does?

```javascript
const someObj = { a: 1, b: 2, c: 3 };
console.log(Object.values(someObj));
```

_NOTE: The order of the properties is not guaranteed. This means that if you have the object created
like `{a: 1, b: 2, c: 3}`, those methods won't necessarily return `["a", "b", "c"]` or `[1, 2, 3]`. It can be `["b", "a", "c"]` or `[3, 1, 2]` or any other order._

##### Other methods

Again, our best friend [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) will come to help. By the way Sarah also has created the [Object explorer](https://sdras.github.io/array-explorer/), so you can use it too.

## Some fun stuff: Bugs

Try this in some interpreter.

```javascript
const a = [1, 2, 3];
a['lol'] = 'haha';
console.log(a);
```

The result is something that is out of logic. This is a somewhat bug, because in JS `Arrays` and `Objects` are almost the same. This is a proof of it.

Now try this.

```javascript
const a = [1, 2, 3];
const b = [4, 5, 6];

console.log(a + b);
```

What do you see? Do you like the result?

Challenge. Try to make the resulting string have a comma between 3 and 4.

It won't work if you add a comma after the 3, because the comma of the last element is ignored by the JS interpreter, just like the semicolons for example.

## Aftermath

This is probably just 10% of all the things connected with Arrays and Objects. Talking about everything connected with them will take a lot of time, and makes no sense. The lot of stuff that will be needed can be Googled. The other 90% is on you, and on experience, as you will learn them on the go, when you will need them.
