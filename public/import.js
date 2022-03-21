"use strict";
function importannoataions(filePath){
fetch('./data.json')
.then(function(resp){
    return resp.json()
})
.then(function importannoataions(data){
    console.log(data.metadata.name)
    console.log(data.metadata.videopath)
    console.log(data.metadata.imagepath)
    console.log(data.annotations)
})
}
module.exports= importannoataions;
    

