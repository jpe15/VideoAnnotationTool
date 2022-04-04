const { dialog } = require('electron')
const path = require('path')
const fs = require('fs')

async function exportData(projName, data, metadata, videoPath) {

    // Using an array for when PNG exporting is added.
    let filesExported = []
    let directory = ''
    
    let options = {
        title: "Export JSON file",
        defaultPath: `${projName}.json`,
        buttonLabel: "Export",
        filters: [
            { name: 'JSON (*.json)', extensions: ['json'] }
        ],
        properties: ['openDirectory']
    }

    let res = await dialog.showSaveDialog(options)
    
    //failed
    if(res.canceled){
        return {
            value: 1,
            files: filesExported,
            folder: directory
        }
    }

    try {

        directory = res.filePath
        let parts = directory.split('\\')
        let filename = parts[parts.length - 1]

        directory = directory.replace(filename, '')
        filename = filename.split('.')[0]

        let Json_obj = JSON.parse('{"projectName": "", "projectPath": "", "VideoPath": "", "annotatedFrames": "" }')

        let metadata_obj = JSON.parse('{"metadata":{"imageName": "" ,"timestamp": "", "comment": ""}}')


        let annotation = JSON.parse('{"annotation" : ""}') ;
        annotation["annotation"] = data;


        let aDataFaram = [metadata_obj,annotation];
        Json_obj["annotatedFrames"] = aDataFaram

       //let unique = [... new Set(data.map(i => i.timestamp))];



        //assigning data to main JSON object
        Json_obj["projectName"] = projName
        Json_obj["projectPath"] = directory
        Json_obj["VideoPath"] = videoPath
       
        Json_obj["annotatedFrames"]["annotations"] = data
        
        //function responsible for writing data on file
        //path will be resolved through path module the JSON will be converted to string and written on file using JSON.stringigy
        fs.writeFile(path.resolve(directory, `${filename}.json`), JSON.stringify(Json_obj), (err) => {
            //error handling
            if (err) throw err;
            else{
                //managing the data in array
                filesExported.push(filename)
            }
        });
        //success
        return {
            value: 0,
            files: filesExported,
            folder: directory
        }

    } catch (err) {
        
        console.error(err)
        return {
            value: -1,
            files: filesExported,
            folder: directory
        }

    }
}

module.exports = exportData