---
 title: Javascript Loops
 tags: javascript, development
 author: Robert Gevorgyan
 date: "2018-02-13"
 description: Learn about for, while and do .. while loops.
 discussionId: "2018-02-13-js-loops"
---

# Loops

This blog post is part of the posts series done for iterate hackerspace, explaining some of basic programming concepts implemented in JavaScript.

#### Table of Contents

1. [What are loops](#Introduction-What-are-loops)
2. [For Loop](#For-loop)

   2.1 [Special for loops in JS](#Special-for-loops-in-JS)

3. [While Loop](#While-loops)
   ## Introduction: What are loops?

What computers excel at is doing a lot of repetitive things in a short amount of time. Like imagine counting to 1000. While it will take you more than 5 minutes to do so, computers are able to do it in a small fraction of a second. Let's see how long will it take to count to 1000 for a computer.

```javascript
for (let i = 0; i < 1000; i++) {
  console.log(i);
}
```

We will return to this code 10 minutes later.

So as we saw, computers are fast when doing the same action over and over. Besides being fast, usually you have a lot of similar data and you will find you in a situation where you want to change something on every or some elements of some "set" of data. These are just some of the use-cases of loops.

There are different ways in different languages to create a loop. The most primitive one was `goto` command. You can find it in ancient and low-level languages. Roughly speaking it just changed the line from where the code should execute after.

In modern languages, there are other, better types of loops. The ones we have in JS are `for`, `while`, `do ... while` loops. There are also special loops for some data types. We will talk about those loops one by one. Allright, let's get started.

## For loop

For loop is probably the most common type of loop used in the actual code. The "classic" for loop consists of 3 parts - **_Initialization_**, **_Condition_** and **_Increment_**.

As an analogy let's pick a gym. Let's say you went to the gym and you are doing squats. After doing one squat you add one to the number in your mind. Say you wanted to do 30 of them. You start counting from 1 and after each successful squat you add one to the count. In you mind you are doing exactly 3 things. You are starting a counter - in your memory you start counting from 1, thinking of a condition of stopping - that's when the number reaches 30 and also you give an increment by adding one.

Let's make this into a code.

```javascript
for (let i = 0; i < 30; i++) {
  do_squat();
}
```

The one little difference between a computer and a human is that computer(or better to say programmers) start counting from 0. This is more convenient as you will se later on.

As you can see, there are 3 different parts inside the parantheses after the keyword `for`. Each of those parts is divided from the others by ;-s
In the first part we see

```javascript
let i = 0;
```

Here, as you may know, we initialize the variable. It's like when you start your count from 1. In your memory you basically create a variable. This variable is used later to determine when the loop will stop exactly. After that we see:

```javascript
i < 30;
```

So this, as you can see, is a condition and is evaluated into either `true` or `false`. This condition is used to determine when exactly loop should stop. In our case it will stop as soon as i-s value is 30, which means we did 30 squats. The last part says:

```javascript
i++;
```

This is used for incrementing the value of i (hence the name). It adds 1 to i after executing the **body** of the for loop once, and makes sure that value of i will reach from 0 to 30 sooner or later. This is like when you stand up after a successful squat and add one to the number you were memorizing.

_NOTE:: Of course, we could have anything here that changes the value of i, like `i += 2`, `i--`, `i = i * 3` etc._

We used the word **body**. So what's the body of this loop? It's the part inside curly braces that are put after the parantheses. So in this particular case, the body is:

```javascript
{
  do_squat();
}
```

We can put any legal operation inside those curly braces.
Let's take a look at some legal but a little bit unusual for loops:

1. Forever loop
   We can leave all the 3 parts of the for loop empty, thus not giving any condition of ending it. This creates a forever loop.

```javascript
for (;;) {
  console.log('I will not end');
}
```

This loop will do the same forever, which is as long as program runs.

2. Loop with 2 or 3 variables used
   You can put as many initializations as you want in the first part, as many boolean expressions as you want in the second part, and as many increments in the third part as you want. Just don't forget to seperate them by commas!

```javascript
for (let i = 0, j = 500; i > j; i++, j--) {
  console.log('Look, I have two variables to use');
}
```

This loop has 2 initializations, 1 condition using those 2 and _increment_ for i plus _decrement_ for j;

### Special for loops in JS

In 2015, 2 new versions of for loops were added to JS: `for .. in` and `for .. of` loops. This loops have only one part and this part includes initialization and the name of the list it will **_iterate over_**. Let's take a look at them too:

```javascript
theList = [10, 15, 89, 30];
for (let i in theList) {
  console.log(i);
}
// The output of this one will be:
// 0 1 2 3
```

As you may notice, `for .. in` loops over any Iterateable (Something that has executive, countable items) and on each step _assigns_ the key of the item to the variable. I think now you already have guessed what `for .. of` will do.

```javascript
theList = [10, 15, 89, 30];
for (let i in theList) {
  console.log(i);
}
// The output of this one will be:
// 10 15 89 30
```

This loop does the same as `for .. in` except instead of the keys it assigns the values to the variable.

#### A little tip

As you may have noticed, the special for loops are more human-readable and understandable. In almost all cases, you can change the old-style for loops with those `for .. in` and `for .. of` loops. This will make the code a little bit better for later maintenance. We will get back to optimizing the code a little bit later, after we get acquainted with special loops that are built-in for you in JS.

## While loops

Today I am more into gym examples I guess :smile:
Let's say you are still in the gym. It's the last 15 minutes and you challenged yourself. You want to do push ups. How much? Well, as much as you can. Do you know how much exactly you can? I don't think you know. You want to do push ups **while** there is energy left in your hands to push you up. So there are cases when you need some other kind of loop, which only takes a condition and repeats the thing **while** the condition is true. You don't need to be too creative to guess the name that loop has.

```javascript
while (forceLeft !== 0) {
  push_up();
}
```

If only doing push-ups was this easy! :smile:

As we already said, `while` loop will loop over its _body_ **while** some condition is true. It has the same syntax as `if` conditional, which is:

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

The one thing worth mentioning here is that it will check the condition first, **before** executing whatever is in its body. In contrary, there is a `do .. while` loop, which will execute the body first and only **after** doint that, check the condition. Roughly speaking, `do .. while` will execute its body at least **once**. Try executing this code:

```javascript
let i = 5;
do {
  console.log(i);
} while (i < 0);

// this will log 5
```

#### Same code, a bunch of different ways.

Take a look at those 2 snippets:

First one:

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

Second one:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

As you can see, those two do exactly the same. So what's better. In this particular case, if we were forced to choose between two cases, we should choose the second version, because this particular case is a perfect fit for the `for` loop. While is more likely to be used when the iteratable is not strictly determined, when you know that it only depends on some condition. You may use `while` loop, for example, when getting data from the server. You don't know exactly how much data you will get or when incoming data will stop. You just want to get it **while** there is data left. To not really get too technical let's write some non-real code to understand the use case of the `while` loop;

```javascript
while(there is some data left on the server) {
    console.log(the data we have got)
}
```

We will turn this into actual code after we have some experience ;)

We wrap it up here. Loops are a powerful concept and evey programmer should know it. It may be a little tough for complete beginners, but once you have a little experience, you slowly start to get it and do it more easily. Hope you enjoyed the post.

The next post will be in 2 days!
