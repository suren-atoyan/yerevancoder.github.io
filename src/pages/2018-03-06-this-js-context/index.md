---
title: this variable in JavaScript
tags: javascript, development
author: Edgar Aroutiounian
date: "2018-03-05"
description: this context in JavaScript
discussionId: "2018-03-05-js-this-js-context"
---

# Execution Context (Aka the `this` variable)

---

One of the hardest things to understand in JavaScript is the `this` variable, also known as the
execution context. The `this` variable refers to the current `object` of which the called method is
currently associated with.

```javascript
const obj = {
  name: 'mari',
  speak: function() {
    console.log(this.name);
  },
};
obj.speak();
```

**Try it!**

<iframe height="400px" width="100%"
src="https://repl.it/@fxfactorial/SomberPositiveDebugging?lite=true" scrolling="no" frameborder="no"
allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups
allow-same-origin allow-scripts allow-modals"></iframe>

The `this` variable is **dynamically** scoped, this means that it's changed and doesn't use the data
that you might think it does when you use it.

### _the this variable_

---

The `this` variable is a part of the `EcmaScript` spec, that means that it's part of the language
but its implementation depends on what environment you're running your JavaScript code in. In the
browser it refers to the `window` object, in `node` it refers to the global object. Open the `node`
repl and type `this`, you'll see the global object printed.

```bash
$ node
> this
{ DTRACE_NET_SERVER_CONNECTION: [Function],
  DTRACE_NET_STREAM_END: [Function],
  DTRACE_HTTP_SERVER_REQUEST: [Function],
  DTRACE_HTTP_SERVER_RESPONSE: [Function],
  DTRACE_HTTP_CLIENT_REQUEST: [Function],
  DTRACE_HTTP_CLIENT_RESPONSE: [Function],
  global: [Circular],
  process:
  process {
    title: 'node',
```

### _Some important methods on functions_

---

JavaScript functions also have methods on them and the most important ones are `bind`, `call`, and
`apply`, see another way to call a function:

```javascript
const f = function(g) {
  console.log(g);
};
// call just takes all the arguments you give it
// and passes it to the function you are calling with .call
f.call(null, 'hello');
```

You can also use `.apply` but for apply you need to give an array of arguments.

```javascript
const f = function(g, h) {
  console.log(g + h);
};
f.apply(null, ['hello', 'world']);
```

<iframe height="400px" width="100%"
src="https://repl.it/@fxfactorial/CalculatingWickedReciprocal?lite=true" scrolling="no"
frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms
allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### _Controling execution context_

---

Notice that for both `.call` and `.apply` we gave `null`. This means that we aren't going to provide
a custom execution context, that the function will get to use whatever the `this` variable would
have been. Now we will control the execution context:

```javascript
const obj = {
  name: 'mari',
  speak: function() {
    console.log(this.name);
  },
};
const other_obj = { name: 'nane' };
obj.speak.call(other_obj);
```

Run this code and you'll see that `nane` is printed to the screen, not `mari`.

<iframe height="400px" width="100%" src="https://repl.it/@fxfactorial/PhonyMinorBloatware?lite=true"
scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms
allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### _Binding a context for a function_

---

Now we will talk about the most powerful and important method on functions, `.bind`. The big
annoyance in JavaScript is that the execution context, the `this` variable that you end up using at
runtime is not always the one you think will be used. This is because the `this` variable is
`dynamically` scoped, not `lexically` scoped. To make sure that our function uses the execution
content that we want used we have to use `.bind`, `.bind` creates a new function that uses the
execution context that you provide.

```javascript
const obj = {
  name: 'aram',
};
// At the top level this refers to the global object
this.name = 'gohar';
const g = function(last_name) {
  // This is using ES6 string interpolation, aka the ${}
  return `${this.name.toUpperCase()} ${last_name}`;
};
const f = g.bind(obj);
console.log(f('baz'));
```

<iframe height="400px" width="100%" src="https://repl.it/@fxfactorial/LowestFrugalAnalysts?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

So `f` is a new function which is bound, we did a bind on g, to the JavaScript object `obj`, we can
also do other wacky things with `.bind` like partial function application.

### _Useful for Partial function application_

---

Partial function application is like making a new function from another function but where some of
the arguments are used with other values; its clearer with an example.

```javascript
const obj = {
  name: 'aram',
};
// At the top level this refers to the global object
this.name = 'gohar';
const g = function(last_name, age) {
  return `${this.name} ${last_name} ${age}`;
};
// The first argument must always be the new execution context
// and the other arguments end up being the
// arguments of the original function
const f = g.bind(obj, 'baz');
console.log(f(22));
```

<iframe height="400px" width="100%" src="https://repl.it/@fxfactorial/ClassicFondNumber?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

See how `'baz'` ends up taking the argument value of `last_name`, this is positional.

[**Be sure to read over and over, MDN article on this variable**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
