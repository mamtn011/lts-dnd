export const validateJsonFile = (items) => {
  if (!Array.isArray(items)) return false;

  for (const item of items) {
    if (typeof item !== "object" || item === null) return false;
    const keys = Object.keys(item);
    if (keys.length !== 1) return false;
    const type = keys[0];
    if (!["wait", "fill", "delay", "click"].includes(type)) return false;

    // check items property type
    switch (type) {
      case "wait":
        if (typeof item[type] !== "string") return false;
        break;
      case "fill":
        if (
          typeof item[type].selector !== "string" ||
          typeof item[type].delay !== "number" ||
          typeof item[type].text !== "string"
        )
          return false;
        break;
      case "delay":
        if (typeof item[type] !== "number") return false;
        break;
      case "click":
        if (typeof item[type] !== "string") return false;
        break;
      default:
        return false;
    }
  }
  return true;
};
