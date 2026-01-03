import styled from "styled-components";
import { useWindowManager } from "../../architexture/context/WindowManager";
import { type AppProperties } from "../../apps/registry";
import { DetailImg } from "../util/DetailImg";
import { DetailText } from "../util/DetailText";

const Root = styled.div<{$height: number}>`
    display: flex;
    height: ${({$height}) => $height === 16 ? 20 : 32}px;
    width: 100%;
    user-select: none;
    background-color: transparent;
    align-items: center;
    gap: 8px;
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;

    &:hover{
        background-color: ${({theme}) => theme.primaryColor}
    }

    &:hover ${DetailText}{
        color: WHITE;
    }
`

export const StartmenuItem = ({ height, app, icon, command }: { height: 16 | 32, app: AppProperties, icon?: string, command?: string}) => {
    const wm = useWindowManager();

    const launch = () => {
        wm.open(app.id, command);
        wm.setShowStart(false);
    }

    const iconRes = icon ?? height === 16 ? app.icon16 ?? undefined : app.icon24 ?? app.icon32 ?? undefined;

    return (
        <Root $height={height} onClick={launch}>
            <DetailImg src={ iconRes }></DetailImg>
            <DetailText style={{ whiteSpace: "nowrap" }}>{app.title}</DetailText>
        </Root>
    )
}