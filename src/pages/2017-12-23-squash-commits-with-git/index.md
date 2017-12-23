---
title: Squashing commits with git
tags: git, development
author: Robert Adamian
date: "2017-12-23"
description: git commit squashing with rebase
---

![alt text](https://i.imgur.com/Eh8FBP7.png "Git's logo")

>Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

>As with most other distributed version control systems, and unlike most client–server systems, every Git directory on every computer is a full-fledged repository with complete history and full version tracking abilities, independent of network access or a central server.

It's also a must-have in any software developer's toolchain. Using git for version control allows for powerful collaboration in tech teams. 

I won't delve into Git's history and the motivations behind it here as that's a post of its own. Instead, in this post we discuss a simple feature you might need: squashing commits.  

I needed to do this yesterday but forgot the command. First Stack Overflow answers were overly complicated for what I needed. So here is the simplified version. 

Let's say you've been working on a feature and just finished. With git, it's possible to squash previous commits into one. This helps you logically group commits together before sharing with others. Say you've been implementing [DFS](https://en.wikipedia.org/wiki/Depth-first_search) and this is your current `git log`:

```zsh
* 16e9bbd (HEAD -> master) depth-first search working
* 36ab519 fix vertex lookup
* aa264b1 label vertices
* bcd1838 recursive discovery
* 3a6eed3 isolate subgraph
* 7126d8e add topological sort
```

Now you want to squash your last 5 commits into one to have a nice history. 

```zsh
git rebase -i HEAD~5
```

After you run this command your terminal editor will open up with the following:  

```zsh
pick 3a6eed3 isolate subgraph
pick bcd1838 recursive discovery
pick aa264b1 label vertices
pick 36ab519 fix vertex lookup
pick 16e9bbd depth-first search working
```

Note that commits are displayed in reverse order.

Replace the words "pick" with "squash" next to the commits you want to squash into the commit before it. In our case:
```zsh
pick 3a6eed3 isolate subgraph
squash bcd1838 recursive discovery
squash aa264b1 label vertices
squash 36ab519 fix vertex lookup
squash 16e9bbd depth-first search working
```

Save and close the editor.

If you're too lazy to type that or you're operating on a Commodore 64 and desparately need those additional few bytes, it's also possible to write "s" for squash and "p" for pick. So the latest snippet is equivalent to:
```zsh
p 3a6eed3 isolate subgraph
s bcd1838 recursive discovery
s aa264b1 label vertices
s 36ab519 fix vertex lookup
s 16e9bbd depth-first search working
```

Git will now give you the opportunity to change your commit message into something more descriptive. For doing that, replace this: 
```zsh
# This is a combination of 5 commits.
# The first commit's message is:
isolate subgraph

# This is the 2nd commit message:

recursive discovery

# This is the 3rd commit message:

label vertices

# This is the 4th commit message:

fix vertex lookup

# This is the 5th commit message:

depth-first seach working
```

With just: 
```zsh
implement depth-first search
```

Note that your new commit message line shouldn't start with `#` as it'll be treated as a comment.

`git log` should then return:
```zsh
* bb26b9d (HEAD -> master) implement depth-first search
* ea1a7e8 add topological sort
```

That's it! Now you have your commits squashed into one with a neat-looking history.
