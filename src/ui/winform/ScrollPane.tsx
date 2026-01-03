import styled from "styled-components";
import { ContentPane } from "./ContentPane";
import React, { useEffect, useRef, useState } from "react";
import { img } from "../util/files";
import { useMergeRefs } from "../../architexture/hooks/UseMergeRefs";

//Scrollbar
const ScrollbarRoot = styled.div`
  height: 100%;
  width: 16px;
  background-color: ${({theme}) => theme.foregroundColor};
  background-image: url(${img("ui/scrollpane/scrollbar-bg.png")})
`;

const ScrollbarButton = styled.div<{$bottom?: boolean}>`
  position: absolute;
  background-color: ${({theme}) => theme.foregroundColor};
  background-image: url(${({$bottom}) => $bottom ? img("ui/scrollpane/scrollbar-down.png") : img("ui/scrollpane/scrollbar-up.png")});
  width: 16px;
  height: 16px;
  
  top: ${({$bottom}) => $bottom ? "auto" : "0"};
  bottom: ${({$bottom}) => $bottom ? "0" : "auto"};

  &:active{
    background-image: url(${({$bottom}) => $bottom ? img("ui/scrollpane/scrollbar-down-pressed.png") : img("ui/scrollpane/scrollbar-up-pressed.png")});
  }
`;

const ScrollbarSlider = styled.div<{$top: number}>`
    position: absolute;
    top: ${({$top}) => $top}px;
    width: 16px;
    height: 32px;
    border-style: solid;
    box-sizing: border-box;
    border-image-source: url(${img("ui/scrollpane/scrollbar-slider.png")});
    border-width: 2px 2px 2px 2px;
    border-image-slice: 2 2 2 2;
    border-image-repeat: stretch;
    background-color: ${({theme}) => theme.foregroundColor};
`;

const Root = styled(ContentPane)`
  position: relative; // allows overlay elements
  overflow: hidden;   // hide native scrollbars if needed
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; 
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`;

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const ScrollPane = React.forwardRef<HTMLDivElement, DivProps>(
  ({ children, style, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs(ref, contentRef);
    
    const [sliderTop, setSliderTop] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startScrollTop = useRef(0);

const updateSlider = () => {
  const content = contentRef.current;
  const slider = sliderRef.current;
  if (!content || !slider) return;

  const scrollTop = content.scrollTop;
  const scrollHeight = content.scrollHeight;
  const clientHeight = content.clientHeight;

  const buttonsHeight = 16 * 2; // up + down buttons
  const root = slider.parentElement!;
  const trackHeight = root.offsetHeight - buttonsHeight;

  let sliderHeight: number;
  let top: number;

  if (scrollHeight <= clientHeight) {
    // all content fits, slider fills track
    sliderHeight = trackHeight;
    top = 16;
  } else {
    // compute slider height proportional to visible content
    sliderHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 16);

    // map scrollTop to slider top
    top = (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - sliderHeight) + 16;
  }

  slider.style.height = `${sliderHeight}px`;
  setSliderTop(top);
};

    useEffect(() => {
      const content = contentRef.current;
      if (!content) return;
      updateSlider(); // initialize
      content.addEventListener("scroll", updateSlider);
      return () => content.removeEventListener("scroll", updateSlider);
    }, []);

    const scrollStep = 8; // pixels per tick
    const scrollInterval = 50; // ms per tick

    const scrollHold = (val: number) => {
      const content = contentRef.current;
      if (!content) return;

      // scroll immediately once
      content.scrollTop += val;

      // then start interval
      const interval = setInterval(() => {
        if (!content) return;
        content.scrollTop += val;
      }, scrollInterval);

      const stop = () => clearInterval(interval);

      // stop when mouse released or leaves button
      window.addEventListener("mouseup", stop, { once: true });
      window.addEventListener("mouseleave", stop, { once: true });
    };

    const onSliderMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      startY.current = e.clientY;
      startScrollTop.current = contentRef.current?.scrollTop ?? 0;

      // attach listeners to window so we can track even if mouse leaves slider
      window.addEventListener("mousemove", onSliderMouseMove);
      window.addEventListener("mouseup", onSliderMouseUp);
    };

    const onSliderMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const content = contentRef.current;
      const root = sliderRef.current?.parentElement; // ScrollbarRoot
      if (!content || !root) return;

      const deltaY = e.clientY - startY.current;
      const contentHeight = content.clientHeight;
      const scrollHeight = content.scrollHeight;

      const sliderHeight = sliderRef.current!.offsetHeight;
      const buttonsHeight = 16 * 2; // up + down buttons
      const availableSpace = root.offsetHeight - buttonsHeight - sliderHeight;

      // map slider movement to scrollTop
      const scrollDelta = (deltaY / availableSpace) * (scrollHeight - contentHeight);
      content.scrollTop = startScrollTop.current + scrollDelta;
    };

    const onSliderMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onSliderMouseMove);
      window.removeEventListener("mouseup", onSliderMouseUp);
    };

    return (
      <Root style={style} {...rest}>
        <Content ref={mergedRef}>
          {children}
        </Content>
        <Overlay>
          <ScrollbarRoot>
            <ScrollbarButton onMouseDown={() => scrollHold(-scrollStep)}></ScrollbarButton>
            <ScrollbarSlider
              ref={sliderRef}
              $top={sliderTop}
              onMouseDown={onSliderMouseDown}
            />
            <ScrollbarButton onMouseDown={() => scrollHold(scrollStep)} $bottom></ScrollbarButton>
          </ScrollbarRoot>
        </Overlay>
      </Root>
    );
  }
);