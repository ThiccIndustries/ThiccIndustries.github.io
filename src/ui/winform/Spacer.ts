import styled from "styled-components";
import { img } from "../util/files";

export const Spacer = styled.div`
    margin-top: 4px;
    margin-bottom: 4px;
    padding-left: 4px;
    padding-right: 4px;
    width: 100%;
    height: 2px;
    box-sizing: border-box;
    background-image: url(${img("ui/spacer.png")});
`;