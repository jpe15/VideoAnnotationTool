const { dialog } = require('electron')
const path = require('path')
const fs = require('fs')

async function exportData(projName, data) {

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
        
        fs.writeFile(path.resolve(directory, `${filename}.json`), JSON.stringify(data), (err) => {
            if (err) throw err;
            else{
                filesExported.push(filename)
            }
        });

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