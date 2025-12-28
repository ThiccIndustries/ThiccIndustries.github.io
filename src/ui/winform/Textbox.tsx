import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { img } from "../util/files";

const Root = styled.div`
    height: 21px;
    padding-left: 6px;
    padding-top: 3px;
    padding-bottom: 5px;
    padding-right: 6px;

    border-style: solid;
    box-sizing: border-box;
    border-image-source: url(${img("ui/textbox.png")});
    border-width: 2px 2px 2px 2px;
    border-image-slice: 2 2 2 2;
    border-image-repeat: stretch;
    background-color: WHITE;
`;

const Input = styled.input`
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    box-shadow: none;
    font-family: ${theme.font.family};
    font-size: 12px;
    width: 100%;
`;

type TextboxProps = React.InputHTMLAttributes<HTMLInputElement>;
export const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(
    ({ value, onChange, style, ...rest }, ref) => {
        return (
            <Root style={style}>
                <Input
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    {...rest} />
            </Root>
        );
    }
);