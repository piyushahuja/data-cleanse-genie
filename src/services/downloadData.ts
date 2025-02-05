interface CleanupOperation {
  id: string;
  description: string;
}

interface CleanupResponse {
  status: 'success' | 'partial' | 'failed';
  new_file_id: string;
  changes_made: any[]; // Update this type based on your changes array structure
}

export const cleanData = async (
  masterFileId: string, 
  dataFileId: string, 
  cleanupOperations: CleanupOperation[]
): Promise<CleanupResponse> => {
  const response = await fetch('http://127.0.0.1:8000/cleanup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      schema_file_id: masterFileId,
      data_file_id: dataFileId,
      cleanup_operations: cleanupOperations 
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to clean data');
  }

  return response.json();
};

export const downloadFile = async (fileId: string, filename: string) => {
  const response = await fetch(`http://127.0.0.1:8000/download/${fileId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to download file');
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