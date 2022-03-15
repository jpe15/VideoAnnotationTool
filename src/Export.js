// This is an example of how to export files, but will likely not be it's own component.

import { useEffect, useState } from "react";
const electron = window.require('electron')

// Takes props, but these may eventually be changed to global context values
const Export = ({ projName, data }) => {
    
    const [isExported, setIsExported] = useState(false)

    const sendExport = () => {
        const args = {
            projName: projName,
            data: data
        }
        
        electron.ipcRenderer.send('export', args)
        electron.ipcRenderer.once('exported', (e, ret) => {
            if(ret.value === 0){
                setIsExported(true)
            }
            else if(ret.value === 1){
                setIsExported(false)
            }
            else{
                setIsExported(false)
            }
        })
    }

    useEffect(() => {
        setIsExported(false)
    }, [])
    
    return (
        <div>
            <button onClick={(e) => sendExport()}>Export</button>
            { isExported && <p>Exported!</p> }
        </div>
    );
}
 
export default Export;