---
title: Simple Terminal Commands
tags: terminal, bash, Unix, development
author: Edgar Khanzadian
date: "2018-02-06"
description: How to use basic terminal commands
discussionId: "2018-02-06-simple-terminal-commands"
---

# Simple terminal commands

## Documentation
Readers, I spent a lot of time to add as many examples as I can to this documentation

So I will highly encourage to read this one day :D 

But I also advise you to first read Lecture notes 
section and then the Documentation one!

<details>
<summary>cd</summary>

## NAME
cd - Change Directory

## DESCRIPTION
change the current working directory to a specific Folder.

## SYNTAX
```bash
$ cd [Options] [Directory]
```
## OPTIONS
```
-P    Do not follow symbolic links
-L    Follow symbolic links (default)
```
## EXAMPLES

Move to the sybase folder:
```bash
$ cd /usr/local/sybase
$ pwd
/usr/local/sybase
```

Change to another folder:
```bash
$ cd /var/log
$ pwd
/var/log
```

Quickly get back:
```bash
$ cd - 
$ pwd
/usr/local/sybase
```

move up one folder:
```bash
$ cd ..
$ pwd
/usr/local/
```
```bash
$ cd (Back to your home folder)
```
</details>
<details>
<summary>pwd</summary>

## NAME 
pwd - Print Working Directory
## DESCRIPTION
print name of the current/working directory 
## SYNTAX
```bash
pwd [-LP]
```
## OPTIONS
```
-P  : The pathname printed will not contain symbolic links.
-L  : The pathname printed can contain symbolic links
```


The default action is to show the current folder as an absolute path.
All components of the path will be actual folder names - none will be symbolic links.

</details>
<details>
<summary>ls</summary>

## NAME
ls - list directory contents

## DESCRIPTION
List information about  the FILEs (the current directory by default).

## SYNTAX
the most common command:
```bash
$ ls
```
the same command in the general form:
```
$ ls [OPTION]... [FILE]...
```

## OPTIONS
```
-a, --all   List all entries including those starting with a dot.
-l   Use a long listing format (shows file or directory, size, modified date and time, file or folder name and owner of a file and it’s permission)
-lh   Same as -l, but shows sizes in human readable format.
-F     Add the ‘/’ Character at the end each directory.
-r  Display files and directories in reverse order.
-R  Recursively list Sub-Directories
-ltr (VERY USEFUL) Shows latest modification file or directory date as last.
-lS  (VERY USEFUL) Displays file size in order, will display big in size first.
--help  Show help page, not everything is described here!
```
## EXAMPLES
```bash
# List the contents of your home directory
$ ls ~

# list everything in a vertical list:
$ ls -al

total 109
drwxr-xr-x  18 root     root         4096 Jun  9 21:12 ./
drwxr-xr-x  18 root     root         4096 Jun  9 21:12 ../
drwxr-xr-x   2 root     root         4096 Jun  9 21:14 bin/
drwxr-xr-x   3 root     root         1024 Jun  9 20:32 boot/
drwxr-xr-x   6 root     root        36864 Jul 12 10:26 dev/
drwxr-xr-x  34 root     root         4096 Jul 12 10:25 etc/
^
# the first column is the file type 
# d = directory
# f = file

# List the directories in the current directory:
$ ls -d */

# list ALL subdirectories
$ ls *
# The default behavior of ls is to only pass color control codes to tty output --color=auto.
# To pipe the output to a second command complete with color codes then set --color=always

$ ls -lAXh --color=auto|less -R


```

</details>
<details>
<summary>mkdir</summary>

## NAME
    mkdir - make directories

## DESCRIPTION
Create the DIRECTORY(ies), if they do not already exist.

Mandatory  arguments  to  long  options are mandatory for short options
too.

## SYNTAX
```bash
$ mkdir [Options] folder...

$ mkdir "Name with spaces"
```
## OPTIONS

```
-m, --mode=MODE   set permission mode (as in chmod), not rwxrwxrwx - umask
-p, --parents     no error if existing, make parent directories as needed
-v, --verbose     print a message for each created directory
```

</details>
<details>
<summary>touch</summary>

## NAME
touch - change file timestamps
## DESCRIPTION
Update the access and modification times of each FILE to the current time.

A FILE argument that does not exist is created empty, unless -c  or  -h is supplied.

A  FILE argument string - is handled specially and causes touch to change the times of the file associated with standard output.

## SYNTAX
```bash
$ touch [options]... File...
```
## OPTIONS
```
-a, change only the access time

-c, --no-create, do not create any files

-d, --date=STRING, parse STRING and use it instead of current time

-f, (ignored)

-h, --no-dereference, affect each symbolic link instead of any referenced file (useful only on systems that can change the timestamps of a symlink)

-m, change only the modification time

-r, --reference=FILE, use this file's times instead of current time

-t STAMP, use [[CC]YY]MMDDhhmm[.ss] instead of current time

--time=WORD, change the specified  time:  WORD  is  access,  atime,  or  use: 
equivalent to -a WORD is modify or mtime: equivalent to -m

--help display this help and exit

--version,  output version information and exit

```
Note that the -d and -t options accept different time-date formats.
## DATE STRING
The  --date=STRING  is  a mostly free format human readable date string
such as "Sun, 29 Feb 2004 16:21:42 -0800" or "2004-02-29  16:21:42"  or
even  "next  Thursday".

A date string may contain items indicating calendar date, time of day, time zone, a day of the week, relative time, relative date, and numbers. 

An empty string indicates the beginning of
the day. 

The date  string  format  is  more  complex  than  is  easily
documented here but is fully described in the info documentation.

</details>
<details>
<summary>cp</summary>

## NAME
cp - copy files and directories

## DESCRIPTION
Copy SOURCE to DEST, or multiple SOURCE(s) to DIRECTORY.

## SYNTAX
```bash
cp [OPTION]... [-T] SOURCE DEST
cp [OPTION]... SOURCE... DIRECTORY
cp [OPTION]... -t DIRECTORY SOURCE...
```

## OPTIONS
```
-b, make a backup of each existing destination file
-f, --force
if an existing destination file cannot be opened, remove it  and
try  again  (this  option  is ignored when the -n option is also
used)
-i, --interactive
prompt before overwrite (overrides a previous -n option)
-l, --link
hard link files instead of copying
-n, --no-clobber (VERY USEFUL)
do not overwrite an  existing  file  (overrides  a  previous  -i
option)
-p     same as --preserve=mode,ownership,timestamps

--preserve[=ATTR_LIST]
preserve       the      specified      attributes      (default:
mode,ownership,timestamps), if possible  additional  attributes:
context, links, xattr, all

--no-preserve=ATTR_LIST
don't preserve the specified attributes
-R, -r, --recursive
copy directories recursively
-u, --update
copy only when the SOURCE file is  newer  than  the  destination
file or when the destination file is missing
-v, --verbose
explain what is being done
```

## EXAMPLES
```bash
# Copy the file
$ ls
foo.txt
$ cp foo.txt bar.txt
$ ls
foo.txt bar.txt

# Copy multiple files
$ tree -F
.
├── bar.txt
├── baz.txt
├── foo/
└── foo.txt
$ cp foo.txt bar.txt baz.txt foo/
$ tree .
.
├── bar.txt
├── baz.txt
├── foo
│   ├── bar.txt
│   ├── baz.txt
│   └── foo.txt
└── foo.txt

# The same operation can also be achieved through pattern matching
$ cp *.txt foo/

# Copy the directory
$ cp -R directory/ foo

# Copy multiple directories
$ tree .
.
├── bar
│   └── bar.txt
├── baz
│   └── baz.txt
├── foo
│   └── foo.txt
└── some-directory
$ cp foo bar baz some-directory
$ tree .
.
├── bar
│   └── bar.txt
├── baz
│   └── baz.txt
├── foo
│   └── foo.txt
└── some-directory
    ├── bar
    │   └── bar.txt
    ├── baz
    │   └── baz.txt
    └── foo
        └── foo.txt

# Take a backup of a file
$ ls 
foo.txt bar.txt
$ cp -b foo.txt bar.txt
$ ls 
foo.txt bar.txt bar.txt~

# Specify backup's extension
$ ls 
foo.txt bar.txt
$ cp -S .bak foo.txt bar.txt
$ ls 
foo.txt bar.txt bar.txt.bak
$ ls
foo.txt bar.txt bar.txt.bak

# How to prompt for confirmation to overwrite file
$ ls
foo.txt bar.txt
$ cp -i foo.txt bar.txt
cp: overwrite 'bar.txt'? 

# Create hard link instead of copying
$ ls 
foo.txt
$ cat foo.txt
foo text
$ cp -l foo.txt bar.txt
$ echo 'bar text' > bar.txt
$ cat foo.txt
bar text

# Copy with preserving file attributes
$ ls -la
-rw------- 1 myUser users 0 Oct 13 09:14 foo.txt
$ cp --preserve foo.txt bar.txt
-rw-------  1 myUser users     0 Oct 13 09:14 bar.txt
-rw-------  1 myUser users     0 Oct 13 09:14 foo.txt

# Showing files that are being copied
$ cp -R -v foo bar
'foo' -> 'bar'
'foo/foo.txt' -> 'bar/foo.txt'
'foo/bar.txt' -> 'bar/bar.txt'
```

</details>
<details>
<summary>rm</summary>

## NAME
rm - remove files or directories

## DESCRIPTION
rm removes each specified file.  By default, it does not remove directories.

## SYNTAX
rm [OPTION]... [FILE]...

## OPTIONS
Remove (unlink) the FILE(s).
```
-f, --force, ignore nonexistent files and arguments, never prompt

-i, prompt before every removal

--no-preserve-root, do not treat '/' specially.
You don't need this unless you want to delete your OS (believe me, you don't)

--preserve-root, do not remove '/' (default)

-r, -R, --recursive, remove directories and their contents recursively

-d, --dir, remove empty directories

-v, --verbose, explain what is being done

```

## EXAMPLES
```bash

# Removing a file
$ ls
foo.txt bar.txt
$ rm foo.txt
$ ls
bar.txt

# Removing multiple files
$ ls 
foo.txt bar.txt
$ rm foo.txt bar.txt
$ ls

# or using patterns
$ ls
foo.txt bar.txt baz.zip
$ rm *.zip
$ ls
baz.zip

# Prompt for confirmation before removing smth
$ ls 
foo.txt bar.txt
$ rm -i foo.txt
rm: remove regular file 'foo.txt'?
$ ls 
bar.txt

# Show more information while removing smth
ls 
foo.txt bar.txt
rm -v foo.txt
removed 'foo.txt'
ls 
bar.txt

# Removing directories, use ls -F to show directaries with / on the end
$ ls -F
foo.txt bar/
$ rm -R bar/
$ ls -F 
foo.txt

# If you get permission denied, you most probably have to use sudo
$ sudo rm ~/Documents/smth.txt

# If you try to delete write-protected files, you'll be prompted for confirmation like this:
rm foo
rm: remove write-protected regular empty file 'foo'? y
# If you don't want the system to show this message, do force removal:
rm -f foo
# Also NEVER USE THIS COMMAND
# NEVER, IT DELETES ALL FILES ON YOUR MACHINE
rm -rf /

```
</details>
<details>
<summary>mv</summary>

## NAME
mv - move (rename) files
## DESCRIPTION
Rename SOURCE to DEST, or move SOURCE(s) to DIRECTORY.

## SYNTAX
```bash
mv [OPTION]... [-T] SOURCE DEST
mv [OPTION]... SOURCE... DIRECTORY
mv [OPTION]... -t DIRECTORY SOURCE...
```

## OPTIONS
```bash
-b, make a backup of each existing destination file

-f, --force
do not prompt before overwriting
                            
-i, --interactive
prompt before overwrite

-n, --no-clobber
do not overwrite an existing file

-u, --update
move  only  when  the  SOURCE file is newer than the destination
file or when the destination file is missing

-v, --verbose
explain what is being done
```

## EXAMPLES
```bash
# Move a file
$ ls
foo.txt
$ mv foo.txt bar.txt
$ ls 
bar.txt

# Move file in a directory
$ tree -F .
.
├── bar/
└── foo.txt
$ mv foo.txt bar
$ tree -F 
.
└── bar/
    └── foo.txt

# Move multiple files into a directory
$ mv file1.txt file.2.txt file3.txt folder
# Or
$ mv *.txt folder

# Move a directory, use ls -F to list directories with/on the end
$ ls -F 
foo/
$ mv foo bar
$ ls -F
bar/

# Prompt before overwriting the file
$ ls 
foo.txt bar.txt
$ mv -i foo.txt bar.txt
mv: overwrite 'bar.txt'?

# How not to overwrite existing files
$ ls 
foo.txt bar.txt
$ mv -n foo.txt bar.txt
$ ls
foo.txt bar.txt

# Making a backup of an existing file
$ ls 
foo.txt bar.txt
$ mv -b foo.txt bar.txt
$ ls
bar.txt  bar.txt~

# To change the backup extension do:
$ ls
foo.txt bar.txt
$ mv -S .bak -b foo.txt bar.txt
$ ls
bar.txt  bar.txt.bak

```


</details>
<details>
<summary>nano</summary>

## NAME
nano - Nano's ANOther editor, an enhanced free Pico clone

## DESCRIPTION
nano is a  small and friendly editor.

## SYNTAX 
```bash
nano [options] [[+line[,column]] file]...
```

## REFERENCE
Ubuntu man pages: http://manpages.ubuntu.com/manpages/artful/en/man1/nano.1.html

</details>
<details>
<summary>cat</summary>

## NAME
cat - concatenate files and print on the standard output

## DESCRIPTION
Concatenate FILE(s) to standard output.
With no FILE, or when FILE is -, read standard input.

## OPTIONS
```
-A, --show-all
equivalent to -vET

-E, --show-ends
display $ at end of each line

-n, --number
number all output lines

-s, --squeeze-blank
suppress repeated empty output lines

-T, --show-tabs
display TAB characters as ^I

-v, --show-nonprinting
use ^ and M- notation, except for LFD and TAB

```

## EXAMPLES
```bash

# Show contents of file
$ cat foo.txt
Hello world

# How to write contents of one file to another one
$ cat foo.txt > bar.txt
$ cat bar.txt
Hello world

# To append the contents of one file to another, use:
$ cat wine.txt >> beer.txt
$ cat beer.txt

# Combine contents of few files into one:
$ cat *.txt > combined.txt

# To add line numbers to the output use -n:
cat -n foot.txt
     1  asd
     2  asdgfasdg
     3  adgd
     4    adfsd
         ...

# Show end of lines using -E
$ cat -E example.txt
This line has no space at the end.$
This one does. $

# To squeze repeatable blank lines use -s:
cat blanks.txt
Line one

Line two


Line three
cat -s blanks.txt
Line one

Line two

Line three

# Show tabs in the file
cat -T tabs.txt
^IOne Tab
^I^ITwo tabs
^I^I^IThree tabs

```
</details>
<details>
<summary>less</summary>

## NAME
less - opposite of more

## DESCRIPTION
Less is a program similar to more (1), but it has many more features.

Less  does  not  have to read the entire input file before starting, so
with large input files, it starts up faster than text  editors  like  vi

## SYNTAX
```
less [-[+]aABcCdeEfFgGiIJKLmMnNqQrRsSuUVwWX~]
            [-b space] [-h lines] [-j line] [-k keyfile]
            [-{oO} logfile] [-p pattern] [-P prompt] [-t tag]
            [-T tagsfile] [-x tab,...] [-y lines] [-[z] lines]
            [-# shift] [+[+]cmd] [--] [filename]...
```
## REFERENCE
Ubuntu man pages: http://manpages.ubuntu.com/manpages/artful/en/man1/less.1.html


</details>
<details>
<summary>apt-get</summary>

</details>
<details>
<summary>man</summary>

</details>
<!-- <details>
<summary>sl</summary>

</details> -->
Special thanks to: https://shapeshed.com/
## Lecture notes:

### cd
cd - Change Directory

This command lets you navigate through your filesystem directories.

First, Let's open the terminal and try this:
```bash
cd ~
```
Now we are in the user's home directory.

Let's go to the Documents directory!
```bash
cd Documents/
```
And then back to the home directory using ```..``` (parent directory is ```..```, all directories have it)
```bash
cd ..
```
or the command that basically means undo the previous cd:
```bash
cd -
```

### pwd
Okay, we know how to travel in the filesystem,
but every traveler should have their own compass!

This command (!compass!) lets you see where you are now in the filesystem
```bash
pwd
```
the output should be something like this:
```bash
/Users/myUsername/Documents
```

### ls
YAS! Now we, as travelers, should sense everything that is near us!

For that reason, we will use command ```ls```. It lets us find out what is in the current directory!
```bash
ls
```
### mkdir

We've got a long trip in this OS, thus we need to prepare some place to store our stuff!

We are going to create a directory and ```mkdir``` command will help us!

Let's create a new directory in ```~/Documents```
```bash
cd ~/Documents
mkdir MyDirectoryName
```

### touch

We've created a directory and now let's create a file in MyDirectoryName!
```bash
cd MyDirectoryName
touch myCustomFile.js
```

### cp

Copying code is something that every developer should know on the professional level!

Now we have to prepare our workspace for that amazing command!

Let's go back to the parent's directory and create one more directory
```bash
cd ..
mkdir MyPrettyDirectory
```
Here is the fan part! Let's copy the file ```myCustomFile.js``` from ```MyDirectoryName``` to ```MyPrettyDirectory``` using this command:
```bash
cp MyDirectoryName/myCustomFile.js MyPrettyDirectory/
```
So now we have a file called ```myCustomFile.js``` in both ```MyDirectoryName``` and ```MyPrettyDirectory``` directories! Voila!
### rm
Oh, we did the copy of the file by mistake?! We need to delete the second file right now! The ```rm``` command is going to save us all! So we should be in the ```~/Documents``` directory now!

```bash
rm MyPrettyDirectory/myCustomFile.js
```
whew, we've deleted this unnecessary file!
### mv
What if we didn't want to actually copy it, we wanted to move the file from one directory to another (something like cut & paste!!!). Again, I'm assuming that we are currently in the ```~/Documents``` directory.
```bash
mv MyDirectoryName/myCustomFile.js MyPrettyDirectory/
```
So now we don't have anything in ```MyDirectoryName``` and have ```myCustomFile.js``` in ```MyPrettyDirectory```
### nano

Every programmer should be able to write code, right?!

nano is a small and friendly editor, it's going to help us write our first
(well, maybe not) lines of Javascript!

So now ```myCustomFile.js``` file is in the ```MyPrettyDirectory``` directory. Let's open it with ```nano```!
```bash
nano MyPrettyDirectory/myCustomFile.js
```
Wow, this may seem confusing! But it's much simpler than it seems!

Here we can edit the file. Let's add this line of code:
```javascript
const year = 2018;
```
Later in this course, you will understand what each of these characters means!

Nice! Let's save it and move on to another terminal command! Do this:
```
ctrl + X    # command for exiting nano
Y                 # it asks if you want to save changes or no
enter            # submit your answer!
```

### cat 
You are in the terminal and you want to read a small file without opening any editor?

NOT A PROBLEM!

```cat``` is going to help you! let's go to ```MyPrettyDirectory``` from ```~/Documents``` directory with
```bash
cd MyPrettyDirectory
```
And let's print the content of ```myCustomFile.js``` to the terminal!
```bash
cat myCustomFile.js
```
Voila :D 
### less
There is also another way of looking into file's content! Try:

```bash
less myCustomFile.js
```
### apt-get
Now let's learn a little bit about installing packages to your computer using the terminal!
```
apt-get install sl
```
### man
So if you want to find the manual for any built-in terminal command, you can run something like:
```bash
man cd
```
Developers of Linux has written these manuals for you to learn without even using the internet!
### sl
And now let's try the package that we installed earlier :D
```bash
sl
```

---

Thanks for reading!

Don't forget that you can always reach members of the iterate community, ask questions, fix issues and bugs, also just talk about random things in the iterate Slack [channel](https://iterate-hackerspace.slack.com/messages).