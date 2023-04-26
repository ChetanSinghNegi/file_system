let fs=require("fs");
let path=require("path");
function organize(dirPath){
    if(dirPath==undefined){
        dirPath=process.cwd();
    }
    organizePath=path.join(dirPath,"organizedFolder");
    if(fs.existsSync(organizePath)==false){ //checking organized folder is there or not?
        fs.mkdirSync(organizePath); // if not then making it
    }
    organizer(dirPath,organizePath);
}
function organizer(dirPath,organizePath){
    let isFile=isFileOrFolder(dirPath);
    if(isFile==true){
        let type=getType(dirPath);   //get type like media/archive/docs/exe etc
        let folderToMakePath=path.join(organizePath,type);//path to send out file
        sendFile(dirPath,folderToMakePath);
    }
    else{
        let childrenDir=readContent(dirPath); //getting folders/files name in array of string form
        for(let i=0;i<childrenDir.length;i++){ //making children calls
            let childrenDirPath=path.join(dirPath,childrenDir[i]);
            organizer(childrenDirPath,organizePath);
        }
    }
}
function sendFile(dirPath,folderToMakePath){
    if(fs.existsSync(folderToMakePath)==false){ //checking organize folder for the media/exe/.. folders present or not
        fs.mkdirSync(folderToMakePath);
    }
    let fileToMakePath=path.join(folderToMakePath,path.basename(dirPath));
    fs.copyFileSync(dirPath,fileToMakePath);
}
function isFileOrFolder(dirPath){
    return fs.lstatSync(dirPath).isFile();   //return true or false
}
function readContent(dirPath){
    return fs.readdirSync(dirPath);  //google kra hai...it will return array of content elements(element in string form)
}
function getType(dirPath){
    let list ={
        media:['mkv','mp4',"mp3"],
        archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
        documents:['docs','doc','pdf','xlsx','xls','odt','odp','odf','txt'],
        app:['exe','dmg','pkg','deb']
    }
    let type=dirPath.split('.').pop();
    for(let folder in list){
        for(let i=0;i<list[folder].length;i++){
            if(list[folder][i]==type){
                return folder;
            }
        }
    }
    return "other";
}

// organize(process.argv[2]);  to test only this code of organize we can give input and test
module.exports = {
    fn:organize
}