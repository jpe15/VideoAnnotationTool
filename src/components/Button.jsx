import PropTypes from 'prop-types'



const Button = ({onClick, title}) => {
    return (
        <div>
            <button onClick={onClick} className='btn'>{title}</button>
        </div>
    )
}

Button.defaultProps = {
    title: 'Blank',
    color: 'black',
}

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
}

export default Button