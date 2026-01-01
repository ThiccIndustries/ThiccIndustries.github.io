const images = import.meta.glob("/src/assets/images/**/*.png", {
    eager: true,
    query: '?url',
    import: 'default'
});

const sounds = import.meta.glob("/src/assets/sounds/**/*.mp3", {
    eager: true,
    query: '?url',
    import: 'default'
});

export const sound = (path: string) =>
    sounds[`/src/assets/sounds/${path}`] as string;
export const img = (path: string) =>
    images[`/src/assets/images/${path}`] as string;