import { getApiUrl } from '@/config/api';

export interface UploadResponse {
  file_id: string;
}

export const uploadFile = async (file: File, type: 'master' | 'data'): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(getApiUrl('/upload'), {
    method: 'POST',
    body: formData,
    headers: {
      'X-File-Type': type,
    },
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}; 