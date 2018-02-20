---
title: Elm, beauty of functional programming to frontend
tags: elm, frontend
author: Grigori Aramyan
date: "2017-12-31"
description: Intro to Elm
discussionId: "2017-12-31-elm-intro"
---

_By Grigori Aramyan_,
catch me on <a href='https://twitter.com/@griaram'>twitter</a>

Elm is a strongly-typed functional programming language for
frontend. It has simplicity and maintainability of functional
programming paradigm in general, but exposes beauty of it's own
architecture as well. It's a compiled language and compiler makes max
efforts to ensure bug-free runtime code, which, on the other
hand-side, means your code won't compile, if there's a mistype, use of
undefined variable or similar stuff. Elm's error messages are one of
the "proud points" of Evan's team though (creator of Elm, Evan
Czaplicki). Compiler produces nice, human-readable messages with
hints, pointing exactly to where/what is wrong with code, assisting
devs as much as machines can probably do.

## The Elm Architecture

Workflow of any Elm application is pretty straightforward: user fires a message (read event) by interacting with UI (text input, button click etc.), `update` function handles it by pattern matching on type of message and modifying model accordingly, `view` function re-renders UI using it's virtual dom, so only minimal required render is performed. If you're familiar with React/Redux, this architecture won't be confusing. (Redux workflow was partially inspired by the elm architecture, according to Dan Abramov, author of Redux) Otherwise, it won't be confusing after you play with it a bit. I made a simple todo app for this post, showing the very basics of Elm application, like module structure, code conventions, syntax, UI component styling, interop with JavaScript etc. You can find it under this repo: https://github.com/grigor-aramyan/todo-elm. Read the Readme, it explains how you can run the app and make changes to elm code itself. I made a skeleton boilerplate of `Main.elm` as well, that can get you up-and-running in seconds. You can play with it also, or just copy/paste it's content in every Main.elm of your projects (main Elm module, from which compiler starts running, is called `Main.elm`). Here's the boilerplate gist: https://gist.github.com/grigor-aramyan/b29a6272f5656d9ddc56f591a3e03063.

Elm has it's own REPL. You'll get that after installing Elm on your
local machine from official website http://elm-lang.org/. After
installing, type `elm` in shell to see what you've got.

## Type and type aliases

You can define your own types in Elm.

```elm
type Visualize =
    All
    | Completed
    | Active
```

This chunk defines "Visualize" type, which can have 3 values, either `All`, `Completed` or `Active`. One use case for custom types is dispatch events/messages - by having enum-like data, `update` function can precisely pattern match fired message and perform tasks accordingly. Also, it helps compiler to help us by warning, that not all possible type values are covered in `update`. Actually, it's not warning us, it just won't compile.

Type aliases make possible to combine primitive types into more
complex structures.

```elm
type alias TodoItem =
    { title : String
    , completed : Bool
    , id : Int
    }
```

The above chunk defines `TodoItem` custom type (read, record or
object or class), that has 3 fields. Type aliases are often used to
define application model structure. Here's an example of it:

```elm
type alias Model =
    { todoItems : List TodoItem
    , currentTodo : String
    , show : Visualize
    , currentIndex : Int
    }
```

## Interop, Encode/Decode

Elm application can communicate with JavaScript modules through ports
(and flags, actually, but ports are more flexible, so get to know them
from the beggining). Elm is strongly typed language, JavaScript - is
not, so there's need of encoders and decoders, that will explain to
JavaScript modules what particular Elm values mean and vice
versa. Decoders have another major role - they want let data to pass
through port and into Elm, if it doesn't comply to type defined in
decoder, so JavaScript side bugs will stay there only.

The above mentioned Todo application has Encoders/Decoders and interop
with Javascript implemented, so you can check them at work. Also,
(actually, in first place) look up the `Get Started` guide in Elm
official website docs. For community discussions, join Elm's page on
Reddit: https://www.reddit.com/r/elm/

## Partial function

Maybe one of the most challenging parts in Elm application are type
annotations. Here's an example:

```elm
update : Msg -> Model -> (Model, Cmd Msg)
```

It says, function "update" receives 2 parameters of types "Msg" and
"Model", then returns a type "Model, Cmd Msg". Here's the question -
why arrows, instead of commas. And here's the answer - because Elm has
the idea of "partial functions" built within.

Example:

```elm
someFunc : String -> Int -> Int -> Bool
```

If you give "someFunc" all 3 declared parameters, it will return a
"Bool" type value. On the other hand, if you give it just "String", it
will return an anonymous function whith following type annotation
`Int -> Int -> Bool` (the former "String" is excluded, because
it's matched already with one-parameter function call). That's the
reason why there is no clear separation of function arguments and it's
return value - argument values can become return values, if partial
functions are in play.

Hope this post will help to get some feel of Elm beauty.

Happy hacking ;)
