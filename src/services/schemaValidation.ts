import { getApiUrl } from '@/config/api';

export interface SchemaValidationResponse {
  status: 'success' | 'error';
  is_valid: boolean;
  errors: string[];  // Changed from SchemaIssue[] to string[]
}

export const schemaIssues: string[] = [
  "Column 'customer_id' missing in data file",
  "Expected date format YYYY-MM-DD for 'purchase_date'",
  "Invalid data type in 'quantity' column (expected number)",
];

export const validateSchema = async (schemaFileId: string, dataFileId: string): Promise<SchemaValidationResponse> => {
  const response = await fetch(getApiUrl('/validate_schema'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      schema_file_id: schemaFileId,
      data_file_id: dataFileId
    })
  });

  if (!response.ok) {
    throw new Error('Schema validation failed');
  }

  return await response.json();
}; 