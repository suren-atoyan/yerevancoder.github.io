
Primitives 2
============
This blog post is part of the posts series done for iterate hackerspace, explaining some of basic programming concepts implemented in JavaScript.

##### Table of contents
[Logical Operators](#logical-operators)
  * [AND](#and-ampamp)
  * [OR](#or-)
  * [NOT](#not-)
  * [Truthiness and Falsiness](#truthy-falsey)
  * [Short-circuit evaluation](#short-circuit)

[`if` statements](#if-else)
[Switch](#switch)
[Further reading]()

Logical Operators
-----------------
In programming as in real life, you will usually find yourself in a situation when some decision changes the flow of things. The program may do something instead of doing something else depending on some `condition`. Usually those conditions are evaluated to a `boolean` value either `true` or `false` Let's think of a real life example to understand this. Let's say you want to wear your short sleeve T-shirt today. As you don't want to catch cold or something you will probably wear it only `if` the temperature outside is greater than 10 degrees celsius. Otherwise you will wear your hoodie instead. In this case the condition is the following.
```
Temperature >= 10
```
This will be either true or false, depending on the temperature.
In programming terminology these decisions, depending on some values are called `logical expressions` or `boolean expressions`. As we mentioned before, those expressions will evaluate to a `Boolean` - `true` or `false`.

Now let's take the same example and make it a little bit more complicated. Suppose you also want to wear sunglasses to look cooler. Now, if you wear sunglasses when it's rainy it may make you look cooler but a little bit strange instead :laughing: So that's why you may want to wear sunglasses only if there's sunny weather.

Now the question. In which case you may want to wear **both** your favorite T-Shirt and sunglasses. The answer is

```
Temperature >= 10 AND Weather === "Sunny"
```
As you might have guessed already, those **_connecting_** operators, such as AND, OR and so on, also have a special name. Those are called `logical operators` or sometimes referred as `boolean operators`. We will learn about three of them - AND **(&& in JS)**, OR **(|| in JS)** and NOT **(! in JS)**. Those notations are usually the same for the majority of languages but it is subject of change depending on the language

Before diving into code, let's bring some other examples to make this clearer.
Most people know, that computers do calculation by adding bunch of 0s and 1s. It's like having a room full of people, where each person evaluates only one value, giving one result, `true` or `false`. Having only one person doing this is not quiet usefull, but add more people, and the 'computational power' of the room will grow exponentially. Moreover, assign a person a specific way of evaluation, and you will have powerful, yet simple way of calculating different results. This lays in the basis of computer architecture and is based on so called `boolean algebra`.
We do this kind of comparisons every day. For example, when searching for a hotel, we filter results by certain criteria, like we want the hotel to have 5 `or` 4 stars, `not` to allow smoking`and` be kid-friendly. The search result will give all 5 and 4 star hotels, will include kid friendly hotels, but won't show hotels where smoking is allowed.
Now let's take a look at how these logical operations are represented and implemented in JavaScript.

### AND (&&)
AND operator returns `true` only if both operands are true, otherwise, it returns `false`.


|  Value 1 |   Value 2     | Returns |
|:----------|:-------------|:------|
| true |    true   | `t && t` - true |
| true | false | `t && f` -  false |
| false | false | `f && f` - false |
|false | (3 > 5 ) | `f && f` - false |
|'str1' | 'str2' | `t && t ` - str2 (wierd JS)
|'str' | false | `t && f` - false

### OR (||)
OR operator `true` in all cases of comparing boolean operands except `false && false`.

|  Value 1 |   Value 2     | Returns |
|:----------|:-------------|:------|
| true |    true   | `t || t` - true |
| true | false | `t || f` -  true |
| false | false | `f || f` - false |
|false | (3 > 5 ) | `f || f` - false |
|'str1' | 'str2' | `t || t ` - str1 |
|false | 'str' | `t || f` - 'str' |
|'str' | true | `t || t` - 'str' |

### NOT (!)
NOT operator returns `true` in all cases, except the case if its single operand can be converted to `true`.

`!true ` - returns `false`
`!false` - returns `true`
`!'str'` - returns `false`

### Truthiness and Falsiness
In case of `NOT` operand we saw a weird thing. We called !'str' and got the value `false`. This may suggest, that there is a "hidden" boolean value connected to 'str'. How can you get that using ! operator? You can use it twice, to negate the opposite boolean value given by !'str'. So, in case of 'str' it's "hidden" boolean value is true. How does this happen? It's because JS `!` operator `converts` the type of it's `operand` to Boolean and then negates that resulting value. That's why some of values in JS are `truthy`, which means they are corresponding to boolean value `true` and some of them are `falsy`. Usually, emptiness corresponds to `false` while any other value corresponds to `true`. Let's look at some examples.
```
!!'' === false // '' is falsy
!!'a' === true // 'a' is truthy
!!0 === false // 0 is falsy
!!-4 === true // -4 is truthy, even if it's negative, because it's not empty
!!NaN === false // NaN is falsy
!!null === false // null is falsy
!!{} === true // null means emptiness, the absence of the object, while empty object is still an object. it's just empty.
!![] === true // This can be more treated like {}
!!undefined === false // Not defined, not there => falsy
```

So as you see, usually the values that are used to describe the absence are falsy and the others are truthy. It's a bit philosophical and this is how programming is beautiful. :smile:

_NOTE::: The return values of the `&&` and `||` operators are **not** necessarily `Boolean` values, as they can be used with operands that are not booleans, however they can still be considered `Boolean` operators since their return values can always be converted to `truthy/falsey` values.
This means that in some cases we may use && but get results of other type. Some examples are_
```
false || 'I will be evaluated'
true && 'I will be evaluated'
```

### Short-circuit evaluation

Let's suppose we have a long chain of boolean operators combined.
```
Condition1 && Condition2 && Condition3 && ... && Condition N
```
As you know already, `AND` evaluates to true if and only if both values are true. It's easy to understand that in the general case, like the one shown above, that means that the expression will evaluate to `true` if and only if **ALL** the presented boolean values are true. Let's again bring a real life analog for this.
Suppose a kid is happy if a kid has got a candy. Now suppose we have N kids in a row and we want to know if all of them are happy. What will you do as a human? You will go one by one starting from the first and ask if the current kid has a candy. What if you noticed a kid in the middle somewhere with no candy? Does it have any meaning to continue with the other kids or seeing just this one with no candy means that our assumption of all kids having a candy is wrong (or, as programmers may say, evaluated to `false`).
So seing just 1 kid not having a candy is already enough to end the search. This is exactly how the program will evaluate the long chain of boolean values connected with `&&`-s. It may as well just stop searching as soon as it sees some `falsy` value in the chain and return that `falsy` value. If there is no any `falsy` value it will evaluate to the last value presented in chain. Let's take a look at some code to get this clearer.
```
true && true && true && false && true && true // returns false, stops evaluation as soon as sees the false value
'Truthy value' && 0 && true // returns 0 because it's falsey
undefined && null && 1 && 0 && 'xoxo' // stops as soon as sees the very first undefined, look how the all unnecessary long calculation is left behind.
```

Now your turn!

```
true && true && '' && true && true
'I am the first' && 'I am the second' && 'Latter the greater'
'Some string' && 5 && null && undefined
10 && 9 && 8 && 7 && 6 && 5 && 4 && 3 && 2 && 1 && 0
10 && 9 && 8 && 7 && 6 && 5 && 4 && 3 && 2 && 1
0 && 9 && 8 && 7 && 6 && 5 && 4 && 3 && 2 && 1 && 0
```

The same logic applies to OR operator, as it evaluates to true if **at least one** of the `operands` is true. Can you explain how will OR work?
Can you also answer those correctly?
```
false || undefined || 'Haha' || 0
'false' || 'Don't be tricked' || 0 || undefined || 'many others'
'I am the first' || 'I am the second' || 'Latter the greater?'
0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10
1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10 || 0
```

### if statements

Now, after we got so far with boolean expressions, we can put them into usage in the actual code. Remember the example of wearing a T-Shirt and sunglasses. You may notice that with the two conditions we have we can create different `boolean expressions` and change the flow of the program depending on those. One question remaining is where to put those boolean expressions exactly. There are several places where you need to insert boolean expressions and the simplest two of them are `if` and `switch` `statements`.

Let's start with `if` statements. It's as simple as you may guess.
```
if (Some boolean expression here) {
    // Things that need to be done if the expression evaluates to true
}
```
So we use the keyword `if` and then after it we put parantheses and write our boolean expression there. Then we open the body of the statement with `{` and close it with `}`. In case of our T-Shirt sunglass example it will be something like:
```
if (temperature >= 10 && weather === 'sunny') {
    wear(cool_tshirt);
    wear(sunglasses);
}
```

Now, this is too limited. Usually you make decision for both cases, not only if the condition is true. You do something `else` if the condition is not true. In case of JS, you can do this by using the word? `else` :smile:
So now we can make the example more complete including the case of wearing hoodie.
```
if (temperature >= 10 && weather === 'sunny') {
    wear(cool_tshirt);
    wear(sunglasses);
} else {
    wear(warm_hoodie);
}
```

Okay, this is cool but it's also limited. What if I want to make more than 2 choices depending on the conditions. What if it's below -15 outside? Warm hoodie is not enough to not freeze in that situation. We need some other case. How to do it? Just add onther if after else to get `else .. if` statement. Using `else .. if` we can specify as many cases as we want.
```
if (temperature >= 10 && weather === 'sunny') {
    wear(cool_tshirt);
    wear(sunglasses);
} else if (temperature <= -15) {
    wear(warm_coat);
    wear(warm_hoodie);
    wear(scarf);
    wear(hat);
    wear(warm_socks); // Granny was here :)
} else {
    wear(warm_hoodie);
}
```

Okay, let's take a look at another example. You remember Teenage Mutant Ninja Turtles right? Now we want to write a program that will output the corresponding Turtle name given the color of its mask. For those who don't know Teenage Mutant Ninja Turtles, here is the list.
```
Leonardo is wearing a blue mask
Raphael is wearing a red mask
Michelangelo is wearing an orange mask
Donatello is wearing a purple mask
```
Okay let's do this.
```
if (color === 'blue') {
    console.log('Leonardo');
} else if (color === 'red') {
    console.log('Raphael')
} else if (color === 'orange') {
    console.log('Michelangelo')
} else {
    console.log('Donatello');
}
```

This code works, but it has a small bug. Can you spot it? The more correct code would be.
```
if (color === 'blue') {
    console.log('Leonardo');
} else if (color === 'red') {
    console.log('Raphael')
} else if (color === 'orange') {
    console.log('Michelangelo')
} else if {
    console.log('Donatello');
}
```

This piece of code is long and hard to read. That's why we have `switch` statement, which is used exactly for cases like this one.


 ### Switch

 So, as we've already said, `switch` provied a better way to write the better readable code doing the same thing as the example above does. `switch` is useful when you have some variable and for each `case` of the value you want to do something. It won't work with and or anything, it's used to branch the program depending just on a value of a single variable. Look how much the readability is increased, keeping the same functionality as the above code.
 ```
 switch(color) {
    case 'blue':
         console.log('Leonardo');
         break;
    case 'red':
         console.log('Raphael');
         break;
    case 'orange':
         console.log('Michelangelo');
         break;
    case 'purple':
         console.log('Donatello);
         break;
    default:
        console.log('Have you even seen TMNT???');
        break;
 }
 ```

 Let's see what's new in this code.
 1. Keyword switch - we put the keyword and then again open parantheses. This time in paranteses we specify the `variable` for which we will switch the cases.
 2. Keyword case - in the body of the switch (the block starting with `{` and ending with `}`) we see multiple `case` statements. We use `case` to specify a certain probable value, a guess of the value of the variable.
 3. Logic after the case - after the case value is specified, we put `:` and start to write the logic of the things that needs to be done if the value of the variable matches with that certain case.
 4. break statement - The thing is that JS kinda does not differentiate the cases, so whenever some cases matches, it will start to execute the code of **ALL** the cases below the match case (You are adviced now to try to delete the break-s and see what happens). To prevent this we use `break` keyboard to exit the switch statement. Sometimes that auto-executing thing may be useful, sometimes it creates problems. We will see a case when it's useful a little bit later.
 5. default case - This is a special case using the keyword `default` that will handle the case when none of the "guesses" of the value were right. In this case, if the color is something else than 'red', 'blue', 'orange' or 'purple', it will execute the code inside default case.

It may happen that you want to do the same thing in multiple cases. Let's say we get the name of the month and we want to output the weather of that month. So 'july' will output 'summer', 'december' will output 'winter' and so on. Instead of writing 12 case bodies, we can take advantage of that auto-execution of cases and write just 4 like this.
```
switch(monthName) {
    case 'December':
    case 'January':
    case 'February':
        console.log('It's winter');
        break;
    case 'March':
    case 'April':
    case 'May':
        console.log('It's spring');
        break;
    case 'June':
    case 'July':
    case 'August':
        console.log('It's summer');
        break;
    case 'September':
    case 'October':
    case 'November':
        console.log('It's autumn');
        break;
    default:
        console.log('There is no such month!');
}
```

So this is the basics of branching the program. Next time we will learn about loops, one of the most powerful things that computer and programming languages provide.
