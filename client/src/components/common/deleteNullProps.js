export default function deleteNullProps(commonFields) {
  // Iterate over the keys of commonFields
  for (const key in commonFields) {
    // Check if the value is null
    if (commonFields[key] === null) {
      // Delete the key
      delete commonFields[key];
    }
  }
  return commonFields;
}
