const { dialog } = require('electron')
const path = require('path')
const fs = require('fs')

async function exportData(projName, videoPath, annotatedFrames, images) {
    
    // Using an array for when PNG exporting is added.
    let expImages = [];
    let directory = '';

    // Get directory to export to.
    try {
        directory = await getExportDir(projName);
    } catch(err){
        console.error(err);
    }

    // If directory is empty, user cancelled out of the dialog.
    if(directory === ''){
        return {
            value: 1,
            images: expImages,
            folder: directory
        }
    }

    let data = {
        'projectName': projName,
        'projectPath': directory,
        'videoPath': videoPath,
        'annotatedFrames': annotatedFrames
    };

    // Export JSON and images.
    try {
        await exportProjJSON(projName, data, directory);
        expImages = await exportProjImages(projName, images, directory);
    } catch (err) {
        console.error(err);
        return {
            value: -1,
            images: expImages,
            folder: directory
        }
    }

    //success
    return {
        value: 0,
        images: expImages,
        folder: directory
    }
}

async function getExportDir(projName){
    let options = {
        title: "Select folder to export to",
        buttonLabel: "Export",
        defaultPath: projName,
        properties: ['openDirectory']
    }

    let res = await dialog.showSaveDialog(options);
    
    // User cancelled out of the dialog.
    if(res.canceled){
        return '';
    }

    try {
        let directory = path.dirname(res.filePath);
        return directory;
    } catch (err) {
        throw err;
    }
}

async function exportProjJSON(projName, data, dir){
    let json = JSON.stringify(data);
    let fileName = `${projName}.json`;

    fs.writeFile(path.resolve(dir, fileName), json, (err) => {
        //error handling
        if (err){
            console.error(err);
            throw err;
        }
    });

    return fileName;
}

async function exportProjImages(projName, images, dir){
    
    let expImages = [];

    let keys = Object.keys(images);
    for(let key of keys){

        let imgName = `${projName}_${key}.png`;
        let newImage = {
            "name": imgName,
            "timestamp": key
        }

        // Only need to export if the image doesn't already exist.
        if(!fs.existsSync(path.resolve(dir, imgName))){
            
            // strip off the data: url prefix to get just the base64-encoded bytes
            const img = images[key];
            const data = img.screenshot.replace(/^data:image\/\w+;base64,/, "");
            const buf = Buffer.from(data, "base64");

            fs.writeFile(path.resolve(dir, imgName), buf, (err) => {
                //error handling
                if (err){
                    console.error(err);
                    throw err;
                }
            });
        }

        expImages.push(newImage);
    }

    return expImages;
}

module.exports = exportData