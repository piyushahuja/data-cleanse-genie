export interface UploadResponse {
  file_id: string;
}

export const uploadFile = async (file: File, type: 'master' | 'data'): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  const response = await fetch('http://127.0.0.1:8000/upload', {
    method: 'POST',
    body: formData,
  });

  try {
    const data = await response.json();
    console.log("response", data);
    return data;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    throw new Error('Failed to upload file');
  }
  
}; 