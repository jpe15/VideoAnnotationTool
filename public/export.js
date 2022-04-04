const { dialog } = require('electron')
const path = require('path')
const fs = require('fs')

async function exportData(projName, videoPath, annotatedFrames, images) {

    console.log('Annotated frames: ', annotatedFrames);
    
    // Using an array for when PNG exporting is added.
    let filesExported = []
    let directory = ''
    
    let options = {
        title: "Select folder to export to",
        buttonLabel: "Export",
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

        let outline = {
			'projectName': projName,
            'projectPath': directory,
			'videoPath': videoPath,
			'annotatedFrames': annotatedFrames
		};
        
        //function responsible for writing data on file
        //path will be resolved through path module the JSON will be converted to string and written on file using JSON.stringigy
        fs.writeFile(path.resolve(directory, `${projName}.json`), JSON.stringify(outline), (err) => {
            //error handling
            if (err){
                console.error(err);
                throw err;
            }
            else{
                //managing the data in array
                filesExported.push(filename)
            }
        });

        // Export images
        let keys = Object.keys(images);
        for(let key of keys){

            // strip off the data: url prefix to get just the base64-encoded bytes
            const img = images[key];
            const data = img.replace(/^data:image\/\w+;base64,/, "");
            const buf = Buffer.from(data, "base64");
            fs.writeFile(path.resolve(directory, `${projName}_${key}.png`), buf, (err) => {
                //error handling
                if (err){
                    console.error(err);
                    throw err;
                }
                else{
                    filesExported.push(filename)
                }
            });
        }

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