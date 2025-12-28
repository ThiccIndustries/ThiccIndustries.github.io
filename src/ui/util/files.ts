const images = import.meta.glob("/src/assets/images/**/*.png", {
    eager: true,
    as: "url",
});

export const img = (path: string) =>
    images[`/src/assets/images/${path}`];