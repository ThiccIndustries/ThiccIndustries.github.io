import styled from "styled-components";
import type { AppComponent, AppContext } from "./registry";
import { FlexSpacer } from "../ui/util/FlexSpacer";
import { img } from "../ui/util/files";
import { Button } from "../ui/winform/Button";
import { Spacer } from "../ui/winform/Spacer";
import { DetailImg } from "../ui/util/DetailImg";
import { useEnterKey } from "../architexture/hooks/UseEnterKey";
import { DetailText } from "../ui/util/DetailText";

const Root = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-end;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 11px;
    padding-top: 15px;
    padding-right: 11px;
    width: 100%;
    box-sizing: border-box;
`
export const Winver: AppComponent = ({ ctx }: { ctx: AppContext }) => {
    useEnterKey(ctx.focused, () => ctx.close());
    
    return (
        <Root>
            <DetailImg src={img("apps/winver/logo.png")}></DetailImg>
            <Info>
                <DetailText style={{ lineHeight: "1.25em" }}>
                    ThiccIndustries 2000<br></br>
                    Copyright (c) Thicc Industries 2025<br></br>
                    <Spacer></Spacer>
                    Use the Start Menu to select a downloads page.<br></br>
                    <br></br>
                    <b>Games</b>: Imma assume you know what games are.<br></br>
                    <b>Operating Systems</b>: OS install images for virtual machines or computers.<br></br>
                    <b>Development</b>: Thicc Industries Development page.<br></br>
                    <b>Hmm?</b>: Your guess is as good as mine.<br></br>
                </DetailText>
                <Spacer></Spacer>
                <DetailText>Physical memory available to ThiccIndustries: 128,000 KB</DetailText>
            </Info>
            <FlexSpacer></FlexSpacer>
            <Button style={{marginRight: "8px", marginBottom: "8px"}} onClick={ctx.close}>
                Ok
            </Button>
        </Root>
    );
}

Winver.app = {
    id: "winver",
    title: "About ThiccIndustries",
    defaultSize: { width: 413, height: 304 },
    icon16: img("apps/winver/icon16.png"),
    icon24: img("apps/winver/icon24.png"),
    icon32: img("apps/winver/icon32.png"),
    showTab: true,
}