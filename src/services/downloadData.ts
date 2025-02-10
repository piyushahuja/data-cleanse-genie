import { getApiUrl } from '@/config/api';

interface CleanupOperation {
  id: string;
  description: string;
}

interface CleanDataResponse {
  status: 'success' | 'error';
  new_file_id: string;
  changes_made?: string[];
}

export const cleanData = async (
  masterFileId: string, 
  dataFileId: string, 
  operations: CleanupOperation[]
): Promise<CleanDataResponse> => {
  const response = await fetch(getApiUrl('/cleanup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      schema_file_id: masterFileId,
      data_file_id: dataFileId,
      cleanup_operations: operations
    }),
  });

  if (!response.ok) {
    throw new Error('Data cleaning failed');
  }

  return response.json();
};

export const downloadFile = async (fileId: string, filename: string): Promise<void> => {
  const response = await fetch(getApiUrl(`/download/${fileId}`));

  if (!response.ok) {
    throw new Error('Download failed');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}; 