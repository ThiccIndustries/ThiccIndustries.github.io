import styled from "styled-components";
import { img } from "../util/files";

export const ContentPane = styled.div`
    border-style: solid;
    box-sizing: border-box;
    border-image-source: url(${img("ui/contentPane.png")});
    border-width: 2px 2px 2px 2px;
    border-image-slice: 2 2 2 2;
    border-image-repeat: stretch;
    background-color: white;
`;
