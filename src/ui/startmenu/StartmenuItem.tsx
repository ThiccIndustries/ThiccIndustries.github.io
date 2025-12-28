import styled from "styled-components";
import { theme } from "../../theme";
import { useWindowManager } from "../../architexture/WindowManager";
import { type AppProperties } from "../../apps/registry";
import { DetailImg } from "../util/DetailImg";
import { DetailText } from "../util/DetailText";

const Root = styled.div`
    display: flex;
    height: 32px;
    width: 100%;
    user-select: none;
    background-color: transparent;
    align-items: center;
    gap: 4px;
    padding-left: 2px;
    padding-right: 32px;
    box-sizing: border-box;

    &:hover{
        background-color: ${theme.startmenu.itemHoverColor}
    }

    &:hover ${DetailText}{
        color: WHITE;
    }
`

export const StartmenuItem = ({ app }: { app: AppProperties}) => {
    const wm = useWindowManager();

    const launch = () => {
        wm.open(app.id);
        wm.setShowStart(false);
    }

    return (
        <Root onClick={launch}>
            <DetailImg src={app.icon24 ?? app.icon32 ?? ""}></DetailImg>
            <DetailText style={{ whiteSpace: "nowrap" }}>{app.title}</DetailText>
        </Root>
    )
}