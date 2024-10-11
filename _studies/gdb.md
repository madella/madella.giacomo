---
title: "GDB"
excerpt: ""
layout: single
author_profile: false
share: false
header:
  image: /assets/images/gdb.png
  teaser: /assets/images/gdb.png
sidebar:
  - title: "Project Type"
    text: "Personal"
number: 10
toc: false
classes: wide
---
## VARIABLES and FUNCTIONS
- info frame :shows you information about stack frame
- info locals :prints all variables
- info args :prints all argument passed
- info registers :prints all registers
- print <var> :shows values of variables ($##)
- set <var> = <value> : allows you to change the value of var

## BREAKPOINTS
- break :insert a breakpoint
- tbreak :breakpoint but only once
- info breakpoints :shows all brkpts
- disable <#> :disable one or more of them
- ingore <#> :skip one or more of them
- with <SPACE> (cgdb) you can insert breakpoint

## WATCHPOINTS
- They work as breakpoints for variables instead of funct/lines of code
- watch <var> :stops the execution when variable(in current scope) is changed
- rwatch <var> :as before but stop on read
- awatch <var> :as before but stop on both read and write

## MEM inspect
- x <> :inspect memory
- there are many option here, press x to see infos

## OTHER  
- list :shows line of code above breakpoint
- backtrace :shows you where u are in function calls 
- next :go over function call on next instr.
- step :step into function call
- frame :you can change a stack frame (you can pass the # in backtrace)
- call <your/sys_funct> : allows you to call functions
- finish :terminate function and shows you the returned value




Useful example in C for gbd:
``` C
#define N 10
#define PI 3.14
// (cgdb) with <ESC> i enter in the right side
//     -  you can move with _arrows_
static int d = 124; //you can watch d with awatch

int insideFun(){
   int a = 16;      // backtrace here
   d++;             // info locals
   a+= ++a + a++;;  // if watch d you will end up here  
   return a;
}

float myFunct(int d){ // info args
   int a = insideFun();   // step into
   return (float)(PI * a - d) ;
}

int main () {
   int a,b,c;   // add breakpoint here

   a = 10;      // inspect a 
   b = 20;      // try to set b
   c = 30 + N;  // N will not be seen in gdb (Preprocesso instr.)

   myFunct(d);  // step into

   return 0;
}
```