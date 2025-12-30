import type { AppComponent, AppContext } from "./registry";

export const MattGame: AppComponent = ({ ctx }: { ctx: AppContext }) => {

    return (
        <iframe style={{width: "100%", height: "100%"}}src="https://thearst3rd.com/games/clickpond-hexaflexagon/"></iframe>
    );
}

MattGame.app = {
    id: "mattgame",
    title: "Matt's Game",
    defaultSize: { width: 640, height: 480 },
    showTab: true,
}