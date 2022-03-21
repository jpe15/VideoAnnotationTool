import React from "react"
import Button from "./Button"
import "../styles/App.css"
import PropTypes from 'prop-types'

const Toolbar = () => {

    return(
        <div className = 'toolbar'>
        <Button title='Square'></Button> 
        <Button title='Polygon'></Button>
        <Button title='Line'></Button>
        </div>
    )
}



export default Toolbar