let fs=require("fs");  //node module for helping functionalities in file system
let path=require("path");
function viewFn(dirPath,mode){
    if(mode=="tree"){
        printTree(dirPath,"");
        // console.log("view tree displayed");
    }
    else if(mode=="flat"){
        printFlat(dirPath);
        // console.log("view flat displayed");
    }
    else{
        console.log("Invalid type of display");
    }
}

function printTree(dirPath,indent){
    let isFile=checkFileOrFolder(dirPath);
    if(isFile==true){
        let nameOfFile=path.basename(dirPath);
        console.log(indent,nameOfFile+"*");  //this will gave the file/folder's+fileType name out of whole path
    }else{
        let nameOfFolder=path.basename(dirPath);
        console.log(indent,nameOfFolder);
        let content=contentReader(dirPath);
        for(let k=0;k<content.length;k++){
            let pathOfChild=path.join(dirPath,content[k]);
            printTree(pathOfChild,indent+'\t');
        }
    }
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
        let childrenNames=contentReader(dirPath);  //reading folder's content so childrenDir will be an array of string
        for(let i=0;i<childrenNames.length;i++){
            let childDirPath=path.join(dirPath,childrenNames[i]);  //as this will add dirPath+"\\"+childrenDir name to path=advance function call 
            //childDirPath is same as dirPath+"\\"+childrenNames, childDirPaht is childrens path 
            printFlat(childDirPath);  //childrens call or advance call is 
        }
    }
}   

function checkFileOrFolder(dirPath){
    return fs.lstatSync(dirPath).isFile();   //return true or false
}
function contentReader(dirPath){
    return fs.readdirSync(dirPath);  //google kra hai...it will return array of content elements(element in string form)
}

module.exports={
    fn:viewFn
}
viewFn(process.argv[2],process.argv[3]);