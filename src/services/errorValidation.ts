export type ErrorType = "Duplicate Records" | "Missing Values" | "Inconsistent Dates" | "Invalid Product Codes";

export interface ValidationError {
  type: ErrorType;
  count: number;
  description: string;
}

export interface CleaningOption {
  id: string;
//   label: string;
  description: string;
//   count: number;
//   errorType: ErrorType; // Link to corresponding error
}

export interface ValidationResult {
  errors: ValidationError[];
  cleaningOptions: CleaningOption[];
}

// Mock data for development - remove when API is ready
const mockValidationResult: ValidationResult = {
  errors: [
    {
      type: "Duplicate Records",
      count: 15,
      description: "Records sharing the same key identifiers",
    },
    {
      type: "Missing Values",
      count: 8,
      description: "Required fields with no data",
    },
    {
      type: "Inconsistent Dates",
      count: 5,
      description: "Dates not following the standard format",
    },
    {
      type: "Invalid Product Codes",
      count: 3,
      description: "Codes not found in master data",
    },
  ],
  cleaningOptions: [
    {
      id: "duplicates",
    //   label: "Remove Duplicates",
      description: "Automatically remove duplicate records based on key identifiers",
    //   count: 15,
    //   errorType: "Duplicate Records",
    },
    // {
    //   id: "missing",
    //   label: "Fix Missing Data",
    //   description: "Fill missing values with appropriate defaults or remove records",
    //   count: 8,
    //   errorType: "Missing Values",
    // },
    // {
    //   id: "dates",
    //   label: "Standardize Dates",
    //   description: "Convert all dates to YYYY-MM-DD format",
    //   count: 5,
    //   errorType: "Inconsistent Dates",
    // },
    // {
    //   id: "products",
    //   label: "Validate Product Codes",
    //   description: "Check and correct product codes against master data",
    //   count: 3,
    //   errorType: "Invalid Product Codes",
    // },
  ],
};

export const validateFiles = async (masterFileId, dataFileId) => {
    

  const response = await fetch('http://127.0.0.1:8000/detect_errors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ schema_file_id: masterFileId, data_file_id: dataFileId }),
  });
  
//   Uncomment when API is ready
  if (!response.ok) {
    console.error('Failed to validate files');
    throw new Error('Failed to validate files');
  }
  const result = await response.json();
  console.log('Validation result:', result);
  return result;

  // Remove this when API is ready
//   return mockValidationResult;
}; 