function ensureArray(value) {
   if (Array.isArray(value)) {
      return value;
   }
   if (value === undefined || value === null) {
      return [];
   }
   if (typeof value === "string") {
      return value.split(",").map((item) => item.trim());
   }
   return [value];
}

export default ensureArray;
