const images = import.meta.glob("/src/assets/images/**/*.png", {
    eager: true,
    query: '?url',
    import: 'default'
});

export const img = (path: string) =>
    images[`/src/assets/images/${path}`] as string;