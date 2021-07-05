const baseUrl = "http://localhost:3000";

async function getImageInfo() {
    const response = await fetch( `${baseUrl}/wallpapers/random?forceRefresh=false&lang=en-US`);
    return response.json();
}

export {
    getImageInfo
}