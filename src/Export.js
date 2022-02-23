// import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
const electron = window.require('electron')

const Export = ({ data }) => {
    
    const [isExported, setIsExported] = useState(false)

    useEffect(() => {
        setIsExported(false)
    }, [])
    
    return (
        <div>
            <button onClick={(e) => {
                const args = {
                    message: 'Hello there!',
                    data: data
                }
                electron.ipcRenderer.send('export', args)
                setIsExported(true)
            }}>Export</button>
            
            { isExported && <p>Exported!</p> }
        </div>
    );
}
 
export default Export;