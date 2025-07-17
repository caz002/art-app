    export const blobFromBase64 = (base64DataUrl: string): Blob => {
        const [prefix, base64] = base64DataUrl.split(',');
        if (!base64) throw new Error("Invalid base64 data URL");

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const mimeMatch = prefix.match(/data:(.*);base64/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';

        return new Blob([byteArray], { type: mimeType });
    };