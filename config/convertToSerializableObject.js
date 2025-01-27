export function convertToSerializableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    // Check if the property has both `toJSON` and `toString` methods
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      // Replace the value of the property with its string representation
      leanDocument[key] = leanDocument[key].toString();
    }
  };

  return leanDocument;
}