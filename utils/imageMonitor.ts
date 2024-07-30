interface ImageLoadProgress {
    url: string;
    status: boolean;
}

function monitorImageLoadProgress(): Promise<ImageLoadProgress[]> {
    const divsWithBackgroundImages = Array.from(document.querySelectorAll('div[style*="background-image"]')) as HTMLDivElement[];
    const imagePromises: Promise<ImageLoadProgress>[] = [];

    divsWithBackgroundImages.forEach(div => {
        const backgroundImageURL = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
        const imagePromise = new Promise<ImageLoadProgress>((resolve, reject) => {
            const image = new Image();
            let loaded = false;

            // Timeout handling
            const timeout = setTimeout(() => {
                if (!loaded) {
                    resolve({
                        url: backgroundImageURL,
                        status: true  // Assuming true means loaded
                    });
                }
            }, 3000); // 3 seconds timeout

            image.onload = () => {
                loaded = true;
                clearTimeout(timeout);
                resolve({
                    url: backgroundImageURL,
                    status: true
                });
            };

            image.onerror = () => {
                loaded = true;
                clearTimeout(timeout);
                console.log(`Failed to load image: ${backgroundImageURL}`);
                resolve({
                    url: backgroundImageURL,
                    status: false
                });
            };

            image.src = backgroundImageURL;
        });

        imagePromises.push(imagePromise);
    });

    return Promise.all(imagePromises);
}

export {
    monitorImageLoadProgress
};
