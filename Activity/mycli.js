#! /usr/bin/env node 

//1)npm init to make json file which contains metadata .Do it at path of mycli  
//2)which language will this cmd runs so after running in cmd node runs this cli
//3)make bin in json to tell the cmd what package refers to what file
//4)npm link to link to cmd.If any changes made so use npm unlink and again do npm link
let input=process.argv.slice(2);
let command=input[0];
let helperFile=require("./commands/help");  //path of provider file
let viewfile=require("./commands/view");    //path of provider file
let organizeFile=require("./commands/organize");    //path of provider file
switch(command){
    case "view" : 
        viewfile.fn(input[1],input[2]);
        break;
    case "organize":
        organizeFile.fn(input[1]);
        break;
    case "help":
        helperFile.fn();
        break;
    case "any":
        console.log("wrong command typed.Type help for instructions of using this file system");
        break;
}