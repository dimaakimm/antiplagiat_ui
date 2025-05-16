import React, { MouseEventHandler, SVGProps } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface ButtonProps {
    children?: React.ReactNode
    Img?: React.FC<SVGProps<SVGSVGElement>>
    type?: 'primary' | 'secondary' | 'white'
    form?: 'default' | 'round'
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    actionType?: 'submit' | 'reset' | 'button'
    disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    form = 'default',
    disabled = false,
    onClick,
    Img,
    children,
    className,
    actionType,
}) => {
    return (
        <button
            disabled={disabled}
            type={actionType}
            onClick={onClick}
            className={classNames(
                styles.wrapper,
                styles[form],
                styles[type],
                className
            )}
        >
            {Img && <Img />}
            {children}
        </button>
    )
}

export default Button
