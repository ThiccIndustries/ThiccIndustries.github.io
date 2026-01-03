import { useEffect } from "react";
import { img } from "../../ui/util/files";
import type { AppComponent, AppContext } from "../registry";
import { useWindowManager } from "../../architexture/context/WindowManager";
import styled from "styled-components";
import { DetailText } from "../../ui/util/DetailText";
import { DetailImg } from "../../ui/util/DetailImg";
import { Textbox } from "../../ui/winform/Textbox";
import files from "../../downloads.json";
import { ExplorerItem } from "./ExplorerItem";
import { ScrollPane } from "../../ui/winform/ScrollPane";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding-left: 4px;
    padding-right: 2px;
    gap: 4px;
    min-height: 26px;
    max-height: 26px;
    box-sizing: border-box;
    border-style: solid;
    border-width: 2px 2px 2px 2px;
    border-image-slice: 2 2 2 2;
    border-image-repeat: stretch;
    border-image-source: url(${img("apps/explorer/header-border.png")});
`;

const AddressBar = styled(Textbox).attrs({
    disabled: true,
})`
    &::placeholder{color: black}
`;

const ContentBorder = styled.div`
    width:100%;
    height: 1px; //CSS is made up why the fuck does this make it work.
    display: flex;
    flex: 1;
    background-color: white;
    box-sizing: border-box;
    border-style: solid;
    border-width: 6px 3px 2px 2px;
    border-image-slice: 6 3 2 2;
    border-image-repeat: stretch;
    border-image-source: url(${img("apps/explorer/content-border.png")});
`;

const Content = styled(ScrollPane)`
    display: flex;
    flex-direction: column;
    flex: 1;
    border: none;
    max-height: calc(100%);
`

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 184px;
    height: 100%;
`

const SidebarSep = styled.div`
    background-color: #F2242E;
    width: 100%;
    height: 2px;
`

const SidebarText = styled(DetailText)`
    padding: 8px;
`
export const Explorer: AppComponent = ({ctx}: {ctx : AppContext}) => {
    const wm = useWindowManager();
    const array = files[ctx.command as "games" | "software" | "windows" | "mac"];

    useEffect(() => {
        if(ctx.command === ""){
            wm.error("Specify folder name.");
            ctx.close();
        }
    },[]);
    
    return (
        <Root>
            <Header>
                <DetailImg style={{height: 18}} src={img("apps/explorer/vertical.png")}></DetailImg>
                <DetailText>Address:</DetailText>
                <AddressBar style={{height: "100%", flex: 1}} placeholder={"thiccindustries://downloads/" + ctx.command + "/"}></AddressBar>
                <DetailImg style={{height: 16}} src={img("apps/explorer/global.png")}></DetailImg>
                <DetailImg style={{height: 18}} src={img("apps/explorer/vertical.png")}></DetailImg>
            </Header>
            <ContentBorder>
                <Sidebar>
                    <DetailImg style={{width: 117, height: 47}} src={img("apps/explorer/decor.png")}></DetailImg>
                    <DetailText style={{
                        marginLeft: "8px",
                        marginTop: "4px",
                        marginBottom: "4px",
                        fontSize: 14,
                        fontWeight: 'bolder'
                        }}>{wm.windows.find(w => w.id === ctx.windowId)?.title}</DetailText>
                    <SidebarSep/>
                    <SidebarText>Files available for download: {array.length}</SidebarText>
                    <SidebarText>Select an item to download to your computer.</SidebarText>
                </Sidebar>
                <Content style={{
                    pointerEvents: ctx.focused ? undefined : 'none'
                    }}>
                    {
                        array.sort((a, b) => {
                            const exta = a.title.split(".").pop()?.toLocaleLowerCase() || "";
                            const extb = b.title.split(".").pop()?.toLocaleLowerCase() || "";
                            const extdiff = exta.localeCompare(extb);

                            if(extdiff !== 0) return extdiff;
                            
                            const titlea = a.title.toLocaleLowerCase();
                            const titleb = b.title.toLocaleLowerCase();

                            return titlea.localeCompare(titleb);
                        }).map(f => <ExplorerItem title={f.title} file={f.file}></ExplorerItem>)
                    }
                </Content>
            </ContentBorder>
        </Root>
    );
}

Explorer.app = {
    id: "explorer",
    title: "Explorer",
    defaultSize: { width: 541, height: 334 },
    showTab: true,
    icon16: img("apps/explorer/icon16.png")
}