# yerevancoder.com

**READ**:

Basic usage

Steps to add a new post:

0. git clone the project to your local machine (if doing for the first
   time, make sure to `yarn` install the dependencies). Make sure you
   are on the **build** branch.
1. Go to `src/pages` and add a new directory with `mkdir`. Format of
   the directory should be `<YEAR>-<MONTH>-<DAY>-<POST-NAME>`.
2. Inside that newly created directory, create an `index.md`
   file. This is a markdown file and you can use 
   <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'>markdown</a>
3. In the root of the project, run `yarn dev`, this starts up a local
   development server with hot reloading, so you can see the changes
   and posts you make in realtime on `localhost:8000`
4. If you forked this repo, make a new Pull Request. If you are a
   project collaborator with commit access, then you can 
   just do `yarn deploy`.
5. Share the post!

## Advanced usage

This is a gatsby project so you can use any JavaScript you want. If
you want to do styling changes, please open a PR rather than pushing
to the repo so that we can review the styling and project structure changes.
