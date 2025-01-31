export type SchemaIssue = string;

export const schemaIssues: SchemaIssue[] = [
  "Column 'customer_id' missing in data file",
  "Expected date format YYYY-MM-DD for 'purchase_date'",
  "Invalid data type in 'quantity' column (expected number)",
];

export const validateSchema = async (masterFile: File, dataFile: File): Promise<SchemaIssue[]> => {
  const formData = new FormData();
  formData.append('masterFile', masterFile);
  formData.append('dataFile', dataFile);
  
  const response = await fetch('/api/validate-schema', {
    method: 'POST',
    body: formData,
  });
  
  // if (!response.ok) {
  //   throw new Error('Failed to validate schema');
  // }
  
  // return response.json();
  return schemaIssues
}; 