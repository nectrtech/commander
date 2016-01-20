# commander
Multiple entry + search input field directive built in angular - configurable.

## Description
This is a basic directive designed to be used as a multi-part entry input field with support for typeahead at each 
command/entry segment within one box. Picture the old Amazon.com search input box, but with the ability to specify 
multiple command segments within one box, each command segment having its own typeahead hint dropdown within the same 
control. If you can't picture this, picture multiple typeahead boxes, each for a different input command/field, but all
 in one.
 
## The Directive
The directive is called dbCommander and its use is documented within the ngDoc. You can build this using the gulp ngDoc 
command. This project contains some examples of its use with different command structures (entry field elements are 
viewed as commands in this context). The directive separates the command segments using a configurable delimiter, which 
cues it to look up the next search term list.
 
## Getting Started
1. clone the repo:
  git clone https://github.com/nectrtech/commander
2. run npm install and bower install
3. type gulp serve

You may need to install gulp and bower with the npm install -g switch if you don't' have them installed globally.

For best results, run it in a virtual machine environment, like nodeenv: https://github.com/ekalinin/nodeenv

## TO DOs
This is a new project that I created over the last week as I was challenged to do it during a job interview. This is a 
first cut and I was testing out the direction. There are some todos listed in the code (yes, I put them in there until 
I export them via WebStorm as issues in git and, since I just popped this up, bear with me). Here are some major todos:

1. The typeahead/templates aren't functional yet. The basic infrastructure is ready, but I haven't gotten to it yet. 

2. Key binding and support. I have the code for this, I just need to add it and bind it in.

3. Verify the approach. I did this based on my experience with commands in general. 

4. Test cases! Yes, the ones that are there are broken and I need to create ones specifically for this directive.

5. ...That's enough for now. Once I get some feedback and take some time, I'm sure this list will grow.

## Known Issues
There are a few things that I know are broken right now.

1. When a new command is initiated (the delimiter is typed), the next list for search terms for that new command segment
 doesn't fire off properly.
 
2. ...
