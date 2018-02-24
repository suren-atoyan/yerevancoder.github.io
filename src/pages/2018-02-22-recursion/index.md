---
 title: Javascript: Recursion
 tags: javascript, development
 author: Robert Gevorgyan
 date: "2018-02-22"
 description: Continuation of introduction of important coding topics using Javascript
 discussionId: "2018-02-22-recursion"
---

# Using the function inside itself.

This blog post is part of the posts series done for iterate hackerspace, explaining some of basic programming concepts implemented in JavaScript.

##### Table of contents
[Introduction to recursion](#intro-recursion)
[Practical examples](#practical)
  * [Factorial](#factorial)
  * [Fibonacci](#fibonacci)
  * [Triangle example](#triangle)



## Introduction to recursion.

Today we have only one topic to talk about, however this topic is very important to understand. I don't want to scare you but it's also kinda scary. Just listen carefully and I am sure you will get it.

So we talked about loops and running the same code repeteadly many times. We know at least 3 ways of doing so. However there is one cooler way to do it.

The most primitive example to start from is factorial. What is factorial of five? It's the product of all number up until 5.

```javascript
factorial(5) === 1 * 2 * 3 * 4 * 5
```

Now if you notice, this product can be represented as

```javascript
factorial(5) === factorial(4) * 5
```

So what's this? We used factorial to define factorial. It may not make sense, but in programming this is an important notion called recursion.

Let's just Google recursion. What do you see? This is just a small example of recursion.

Another cool example. So GNU is the developer community thanks to which we have free Linux distributions. Now try to find out what acronym GNU stands for. It stand's for "GNU's Not Unix".

This is a cool and wit example of recursion, we use the term to describe that term.

Here is also a graphical recursion.


![Recursive Image](https://upload.wikimedia.org/wikipedia/commons/b/b3/Screenshot_Recursion_via_vlc.png "Recursion")

Here are also recursion memes to make it more clear and funny :smile:

![Drake Recursion](https://i.redd.it/md4l7yy3rgly.jpg "Drake recursion")
Aaaand another one

![Recursion under my bed](https://pics.me.me/dad-there-is-a-recursion-under-my-bed-oad-there-29924251.png "Recursion under my bed")

3D printer printing 3D printer

![3D Printer](http://wiki.secretgeek.net/Image/3d_printer_factory.jpg)


So now you know that for understanding recursion you need to know what recursion is. It is main event time! Let's write some code.

## Practical examples.

As you see in those programs, recursions are infinite. What do you think will happen if you do something like this in JS? It will go on forever, or cause an error like "I don't have memory for doing all this stuff". Now let's find out how to avoid this in an actual example.

### Factorial

Let's start with the most famous example -- factorial. It's just a function inside of which we call a function. Forget that it's the function we are going to call is the function we are defining.

```javascript
const factorial = n => {
    if (n <= 1) {
        return 1;
    }
    return factorial(n - 1) * n;
}
```

So how this code works exactly. First we define the **_termination case_**. We need at least one of those so the recurison won't go on forever. For this current case we say that it should stop the recursion and return just a number `1` if n reaches 1 or 0. Can you say why?

So this means that the recursion will stop when it's called with n being 1 or 0. This means we were able to stop the infinite recursion monster!

After the termination case we have the **_recursive definition_** of factorial. We say that it's the factorial of the number preceding our number times the current number.

So let's visualize the stuff JS will do to get the factorial(6) for example.

![Recursion explained](http://1.bp.blogspot.com/-ezSpp0vDQSo/VerVHxsgY8I/AAAAAAAADtg/VAKkf_HYJdk/s1600/factorial%2Bin%2BJava.gif)

### Fibonacci game

Now let's play a little game. Let's assign numbers to you and recursively compute the Fibonacci numbers! People who will be assigned numbers bigger than 0 and 1 know just 1 fact -- they need to call the people with numbers `n - 2` and `n - 1`, wait them to get the numbers, and then shout out the sum of those two numbers.

Try to manage your "calls" to do this in a managed way.

Now, help me to write the code calculating fibonacci numbers.

```javascript
const fib = n => {
    if(n <= 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}
```

### Triangle example

Do you remember the triangle example? Let's also implement it using recursion. Before writing the code let's analyze the problem.

So on every call we have the triangle with 1 less width plus a newline character (As you may remember it's `'\n'`) and a line of `n` asterisks. So we know we should have something like.

```javascript
stars(n) === stars(n - 1) + line
```

What about the termination case? Can you say a termination case for stars function?

Now as you can see, only the line part remains. Can you write a recursive function that prints n asterisks side by side and returns that line?

```javascript
const printStarLine = n => {
    if(n === 1) {
        return '*';
    }
    return printStarLine(n - 1) + '*';
}

const stars = n => {
    if(n === 0) {
        return '\n';
    }
    return stars(n - 1) + printStarLine(n) + '\n'
}
```

So this is it for today. This topic is not for explaining a lot, as you can see I just showed a bunch of examples. It's more about questions and experience, which means that you need to ask your questions now and do the tasks so you can grasp this topic better.
