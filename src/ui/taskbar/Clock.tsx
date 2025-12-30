import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { theme } from "../../theme";


const Root = styled.div`
    font-family: ${theme.font};
    font-size: 12px;

    & span{
        user-select: none;
    }
`

export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    const now = time
        .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
        .toUpperCase();

    return (
        <Root>
            <span>{now}</span>
        </Root>
    )
}