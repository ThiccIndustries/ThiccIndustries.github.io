import styled from "styled-components";

export const DetailText = styled.span.attrs({
    draggable: false,
})`
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
`;
