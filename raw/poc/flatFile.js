function printGTree(node,nsp){
    console.log(nsp+node.name);
    for(let i=0;i<node.children.length;i++){
        let child=node.children[i];
        printGTree(child,nsp+"\t");
    }
}
printGTree(node,"");
let fs=require("fs");
let path = require("path"); //Module from node which helps in joining path.join(dirName,childrenDir[i]) 

function checkFileOrFolder(dirPath){
    return fs.lstatSync(dirPath).ifFile();   //return true or false
}
function contentReader(dirPath){
    return fs.readdirSync(dirPath);  //google kra hai...it will return array of content elements(element in string form)
}
function printFlat(dirPath){
    //check file or dirPath 
    //true if file else false if folder
    let isFile=checkFileOrFolder(dirPath);
    if(isFile==true){ //file
        console.log(dirPath+"*");
    }
    else{//folder
        console.log(dirPath);
        let childrenDir=contentReader(dirPath);  //reading folder's content so childrenDir will be an array of string
        for(let i=0;i<childrenDir.length;i++){
            let childDirPath=path.join(dirPath,childrenDir[i]);  //as this will add dirPath+"\\"+childrenDir name to path=advance function call 
            printFlat(childDirPath);  //childrens call or advance call is 
        }
    }
}
let input=process.argv.slice(2);
printFlat(input[0]);  //we have to use double backward slash instead of single slash