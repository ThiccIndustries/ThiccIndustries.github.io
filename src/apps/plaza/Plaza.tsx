import { img } from "../../ui/util/files";
import type { AppComponent, AppContext} from "../registry";
import styled from "styled-components";
import { ContentPane } from "../../ui/winform/ContentPane";
import { DetailText } from "../../ui/util/DetailText";
import { DetailImg } from "../../ui/util/DetailImg";
import { useEffect, useRef, useState } from "react";
import { useWindowManager } from "../../architexture/context/WindowManager";
import { Button } from "../../ui/winform/Button";
import { Spacer } from "../../ui/winform/Spacer";
import { ProgressBar } from "../../ui/winform/ProgressBar";
import { Volume } from "./Volume";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SectionFrame = styled(ContentPane)`
    background-color: ${({theme}) => theme.foregroundColor};
`

const SongInfo = styled(SectionFrame)`
    display: flex;
    flex: 1;
`
const Artwork = styled(ContentPane)`
    width: 96px;
    height: 96px;
    margin: 4px;
`;

const Buttons = styled.div`
    display: flex;
    flex: 1;
    gap: 4px;
    align-items: center;
`;

export const Plaza: AppComponent = ({ctx} : {ctx: AppContext}) => {
    const wm = useWindowManager();

    const [title, setTitle] = useState("Song Title");
    const [artist, setArtist] = useState("Artist");
    const [cover, setCover] = useState(" ");

    const [duration, setDuration] = useState(0);
    const [elapsed, setElapsed] = useState(0);

    const [playing, setPlaying] = useState(false);
    
    const [volume, setVolume] = useState(0.25);

    const audio = useRef<HTMLAudioElement>(null);
    
    const playPause = () => {
        setPlaying(!playing);

        if(!playing)
            audio.current?.play();
        else
            audio.current?.pause();
    }

    const formatMMSS = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }

    useEffect(() => {
        const id = setInterval(() => {
            fetch('https://api.plaza.one/status')
                .then((response) => response.json())
                .then((data) => {
                    setTitle(data.song.title);
                    setArtist(data.song.artist);
                    setCover(data.song.artwork_src);

                    setDuration(data.song.length);
                    setElapsed(data.song.position);

                }).catch((err) => {
                    wm.error("Plaza One API error: " + err.message);
                    ctx.close();
                })
        }, 1000);

        return () => {
            clearInterval(id);
        }
    }, []);
    
    //why can't I set this through the dom???
    useEffect(() => {audio.current!.volume = volume}, [volume]);

    return (
        <Root>
            <SongInfo>
                <Artwork>
                    <DetailImg style={{width: '100%', height: '100%'}} src={cover}></DetailImg>
                </Artwork>
                <div style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    margin: '8px',
                    gap: 4
                }}>
                    <DetailText style={{fontWeight: 'bold'}}>{title}</DetailText>
                    <DetailText>By: {artist}</DetailText>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        marginBottom: 2,
                    }}>
                        <DetailText>{formatMMSS(elapsed)}/{formatMMSS(duration)}</DetailText>
                        <ProgressBar progress={(elapsed / duration) * 100} style={{flex: 1}}></ProgressBar>
                    </div>
                    
                    <Spacer />
                <Buttons>
                    <Button disabled={playing} onClick={() => {playPause()}}>Play</Button>
                    <Button disabled={!playing} onClick={() => {playPause()}}>Stop</Button>
                    <Volume style={{pointerEvents: !ctx.focused ? 'none' : undefined}} volume={volume} setVolume={setVolume}></Volume>
                </Buttons>
                </div>
            </SongInfo>
            <SectionFrame style={{
                minHeight: 20,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8px'
                }}>
                <a draggable={false} href="https://plaza.one" target="_blank">Support Plaza One</a>
            </SectionFrame>
        <audio ref={audio} hidden src="https://radio.plaza.one/mp3"></audio>    
        </Root>
    );
}

Plaza.app = {
    id: "plaza",
    title: "Plaza One Radio",
    defaultSize: { width: 400, height: 131 },
    showTab: true,
    showInStart: 'programs',
    icon16: img("apps/plaza/icon16.png"),
}