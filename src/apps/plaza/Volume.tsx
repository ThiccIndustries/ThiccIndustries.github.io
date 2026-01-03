import { useRef, type CSSProperties } from "react"
import styled from "styled-components"
import { DetailImg } from "../../ui/util/DetailImg"
import { img } from "../../ui/util/files"

const Root = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 4px;
`

const SliderRoot = styled.div`
    position: relative;
    flex: 1;
    height: 21px;
`

const SliderBG = styled.div`
    position: absolute;
    top: 10.5px;
    width: 100%;
    background-color: gray;
    height: 1px;
`

const Slider = styled.div<{$left: string}>`
    position: absolute;
    top: 0;
    left: ${({$left}) => $left};
    width: 8px;
    height: 21px;
    border-style: solid;
    box-sizing: border-box;
    border-image-source: url(${img("ui/scrollpane/scrollbar-slider.png")});
    border-width: 2px 2px 2px 2px;
    border-image-slice: 2 2 2 2;
    border-image-repeat: stretch;
    background-color: ${({theme}) => theme.foregroundColor};
`;

export const Volume = ({volume, setVolume, style}: {volume: number, setVolume: (val: number) => void, style?: CSSProperties}) => {
    const ref = useRef<HTMLDivElement>(null);

    const dragging = useRef(false);

    const clamp = (v: number) => Math.max(0, Math.min(1, v));

    const updatePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!ref.current) return;
        if(!dragging.current) return;

        const rect = ref.current.getBoundingClientRect();

        dragging.current = true;
        const x = e.clientX - rect.left;
        const v = (clamp(x / rect.width));

        setVolume(v);
    }

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        dragging.current = true;
        updatePosition(e);
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        updatePosition(e);
    }

    const onMouseUp = () => {
        dragging.current = false;
    }

    return(
        <Root style={style}>
            <DetailImg draggable={false} src={img("apps/plaza/volume.png")}/>
            <SliderRoot
                ref={ref}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                <SliderBG/>
                <Slider $left={`${volume * 100}%`}></Slider>
            </SliderRoot>
        </Root>
    )
}