import styled from "styled-components";
import { img } from "../util/files";
import React from "react";

const Root = styled.div<{$disabled?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    width: fit-content;
    height: fit-content;
    min-width: 75px;
    border-style: solid;
    padding: 3px;
    border-width: 1px 1px 2px 2px;
    border-image-slice: 1 1 2 2;
    border-image-repeat: stretch;
    border-image-source: url(${img("ui/button/button.png")});
    user-select: none;

    color: ${({$disabled}) => $disabled ? "gray" : "black"};

    & button{
        display: none;
    }

    &:hover{
        ${({ $disabled }) => !$disabled && `
            border-width: 2px 2px 3px 3px;
            border-image-slice: 2 2 3 3;
            border-image-source: url(${img("ui/button/button-hover.png")});
        `}
    }

    &:active{
        ${({ $disabled }) => !$disabled && `
            border-width: 2px 2px 2px 2px;
            border-image-slice: 2 2 2 2;
            border-image-source: url(${img("ui/button/button-pressed.png")});
        `}
    }
`

type ButtonProps = React.HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
};

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
    ({children, onClick, disabled, style, ...rest}, ref) => {
        return(
            <Root
                ref={ref}
                style={style}
                $disabled={disabled}
                onClick={disabled ? undefined : onClick}
                role="button"
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                {...rest}
            >
                {children}
            </Root>
        )
    }
)