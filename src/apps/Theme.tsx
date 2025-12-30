import styled, { type DefaultTheme } from "styled-components";
import type { AppComponent, AppContext } from "./registry";
import { img } from "../ui/util/files";
import { Button } from "../ui/winform/Button";
import { DetailText } from "../ui/util/DetailText";
import { theme, themes } from "../theme";
import { ScrollPane } from "../ui/winform/ScrollPane";
import { DetailImg } from "../ui/util/DetailImg";
import { useThemeManager } from "../architexture/ThemeManager";
import { useState } from "react";
import { FlexSpacer } from "../ui/util/FlexSpacer";
import { useEnterKey } from "../architexture/UseEnterKey";

const Root = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`

const Border = styled.div`
    width: 386px;
    height: 380px;
    margin-top: 7px;
    margin-left:  6px;
    background-image: url(${img("apps/theme/border.png")});
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 237px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`

const Buttons = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    padding-right: 6px;
`

const Preview = styled.div.attrs<{$bg: string}>(({$bg}) => ({
    style:{ backgroundColor: $bg }
}))`
    display: flex;
    position: absolute;
    top: 39px;
    left: 23px;
    width: 352px;
    height: 190px;
`

const PreviewWinRoot = styled.div<{$focused?: boolean}>`
    pointer-events: none;
    position: absolute;
    box-sizing: content-box;
    border-style: solid;
    border-image-source: url(${ props => props.$focused ? theme.border.imageActive : theme.border.imageInactive });
    border-width: ${theme.border.top}px ${theme.border.right}px ${theme.border.bottom}px ${theme.border.left}px;
    border-image-slice: ${theme.border.top} ${theme.border.right} ${theme.border.bottom} ${theme.border.left};
    border-image-repeat: stretch;
`;

const GrabHandle = styled.div<{ $theme: DefaultTheme, $active: boolean }>`
    position: relative;
    width: 100%;
    top: ${-theme.border.gradTop}px;
    height: ${theme.border.gradHeight}px;
    background-image: linear-gradient(to right,
        ${({$theme, $active}) => $active ? $theme.activeTitleBar.join(", ") : $theme.inactiveTitleBar.join(", ") }
    );

    display: flex;
    box-sizing: border-box;
    padding-left: 2px;
    padding-right: 2px;
    gap: 2px;
    align-items: center;
`

const WindowTitle = styled.span<{$active: boolean}>`
    color: ${({theme, $active}) => $active ? theme.primaryText : theme.secondaryText};
    font-family: ${theme.font.family};
    font-weight: ${theme.titlebar.weight};
    font-size: ${theme.titlebar.size}px;
    font-smooth: never;
    -webkit-font-smoothing : none;
    user-select: none;
`

const WindowContent = styled.div < {$color: string} >`
    position: absolute;
    top: 0;
    left: 0;
    background: ${props => props.$color};
    width: 100%;
    height: 100%;
`

const PreviewWindow = ({style, theme: th, focused, title, children}: {style: React.CSSProperties, theme: DefaultTheme, focused: boolean, title:string, children: ReactNode}) => {

    return(
        <PreviewWinRoot style={{...style, backgroundColor: th.foregroundColor}}>
            <GrabHandle $theme={th} $active={focused}>
                <WindowTitle $active={focused}>{title}</WindowTitle>
                <FlexSpacer />
                <DetailImg src={focused ? theme.titlebar.close.active : theme.titlebar.close.inactive}/>
            </GrabHandle>
            {children}
        </PreviewWinRoot>
    );
}

export const Theme: AppComponent = ({ ctx }: { ctx: AppContext }) => {
    const {theme, setTheme} = useThemeManager();
    const [selected, setSelected] = useState<DefaultTheme>(theme);

    useEnterKey(ctx.focused, () =>{
        setTheme(selected);
    });
    
    return (
        <Root>
            <Border>
                <DetailText style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px"
                }}>Appearance</DetailText>

                <Preview $bg={selected.backgroundColor}>
                    <PreviewWindow style={{width: 256, height: 58, top:8, left:8}} theme={selected} focused={true} title="Active Window">
                        <WindowContent $color={selected.foregroundColor}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                padding: "4px",
                                boxSizing: "border-box"
                            }}>
                                <DetailText>This is an active window!</DetailText>
                                <FlexSpacer></FlexSpacer>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <Button>OK</Button>
                                </div>
                            </div>
                        </WindowContent>
                    </PreviewWindow>
                    <PreviewWindow style={{width: 256, height: 58, bottom:8, right:8}} theme={selected} focused={false} title="Inactive Window">
                        <WindowContent $color={selected.foregroundColor}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                                zIndex: 1
                            }}>
                                <DetailText>This is not!</DetailText>
                                <FlexSpacer></FlexSpacer>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <Button disabled>OK</Button>
                                </div>
                            </div>
                        </WindowContent>
                    </PreviewWindow>
                </Preview>


                <DetailText style={{marginBottom: "4px"}}>Select Theme:</DetailText>
                <ScrollPane style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%'}}>
                {Object.values(themes).map(th => (
                    <div 
                        key={th.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            paddingLeft: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                            backgroundColor: th === selected ? theme.secondaryColor : 'transparent'
                            }}
                        onMouseDown={() => {setSelected(th)}}
                        >
                        <DetailImg src={img("apps/theme/icon16.png")}></DetailImg>
                        <DetailText style={{
                            color: th === selected ? 'white' : 'black',
                            fontWeight: th === selected ? 'bold' : 'normal'
                            
                            }}>{th.name}</DetailText>
                    </div>
                ))}
                </ScrollPane>
            </Border>
            <Buttons>
                <Button onClick={() => {setTheme(selected); ctx.close()}}>Ok</Button>
                <Button onClick={() => ctx.close()}>Cancel</Button>
                <Button disabled={selected === theme} onClick={() => setTheme(selected)}>Apply</Button>
            </Buttons>
        </Root>

    );
}

Theme.app = {
    id: "theme",
    title: "Display Properties",
    defaultSize: { width: 398, height: 423 },
    showTab: true,
    icon16: img("apps/theme/icon16.png"),
}