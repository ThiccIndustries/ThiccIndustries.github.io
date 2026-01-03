import styled from "styled-components";
import { DetailImg } from "../../ui/util/DetailImg";
import { DetailText } from "../../ui/util/DetailText";
import { img } from "../../ui/util/files";

const Root = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 1px;
    &:hover{
        background-color: ${({theme}) => theme.primaryColor};
        color: white;
    }
`

type Props = {title: string, file: string}
export const ExplorerItem = ({title, file} : Props) => {

    const ext = (title.split('.').pop() || "").toLowerCase();
    const archiveExts = ["zip", "rar", "7z", "tar", "gz", "bz2"];
    const iconMap : Record<string, string> = {
        iso: "iso.png",
        img: "img.png",
        exe: "exe.png",
        archive: "archive.png"
    };
    
    let iconFile;

    if (archiveExts.includes(ext)){
        iconFile = iconMap.archive;
    } else {
        iconFile = iconMap[ext] ?? "default.png";
    }

    const icon = `apps/explorer/icons/${iconFile}`;

    const download = () => {
        const link = document.createElement("a");
        link.href = `https://drive.google.com/uc?export=download&id=${file}`
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = title;
        link.click();
    }

    return (
        <Root onClick={download}>
            <DetailImg src={img(icon)}></DetailImg>
            <DetailText>{title}</DetailText>
        </Root>
    )
}