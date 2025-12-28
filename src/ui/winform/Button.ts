import styled from "styled-components";
import { img } from "../util/files";

export const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    width: fit-content;
    min-width: 75px;
    border-style: solid;
    padding: 3px;
    border-width: 2px 2px 3px 3px;
    border-image-slice: 2 2 3 3;
    border-image-repeat: stretch;
    border-image-source: url(${img("ui/button/button.png")});
    user-select: none;
    &:active{
        border-width: 2px 2px 2px 2px;
        border-image-slice: 2 2 2 2;
        border-image-source: url(${img("ui/button/button-pressed.png")});
    }
`