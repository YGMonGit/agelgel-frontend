import { useState } from 'react';
import * as Bytescale from "@bytescale/sdk";

const useFileUpload = () => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize the upload manager with API key
    const uploadManager = new Bytescale.UploadManager({
        apiKey: process.env.REACT_APP_BYTESCLE ?? ""
    });

    // Function to handle file upload
    const uploadFile = async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            const { fileUrl } = await uploadManager.upload({ data: file as any });
            setFileUrl(fileUrl);
            return fileUrl;
        } catch (err) {
            setError("Failed to upload file. Please try again.");
            console.error(err); // Log error for debugging
        } finally {
            setLoading(false);
        }
    };

    return { fileUrl, uploadFile, loading, error };
};

export default useFileUpload;
