// ConvertCSV.js
// Utility function to convert data to CSV format (for the download data button on the Landscape page)

const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
  
    const replacer = (key, value) => value ?? '';
    const header = Object.keys(data[0]);
    const csv = [
      header.join(','),
      ...data.map(row =>
        header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
      )
    ].join('\r\n');
  
    return csv;
  };
  
  export default convertToCSV;
  
  