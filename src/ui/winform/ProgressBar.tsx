import type { CSSProperties } from "react";
import styled from "styled-components";
import { ContentPane } from "./ContentPane";

const Fill = styled.div.attrs<{$progress: number}>(props => ({
    style:{
        width: `${props.$progress}%`,
        height: 12
    }
}))`
    background-color: ${({theme}) => theme.primaryColor};
`;
export const ProgressBar = ({progress, style}: {progress: number, style?: CSSProperties}) => {
    return (
        <ContentPane style={style}>
            <Fill $progress={progress}></Fill>
        </ContentPane>
    )
}
