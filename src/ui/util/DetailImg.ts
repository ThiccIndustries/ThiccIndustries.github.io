import styled from "styled-components";

export const DetailImg = styled.img.attrs({
    draggable: false,
})`
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
`;
