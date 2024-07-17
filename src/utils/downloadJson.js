export const downloadJson = (items) => {
  const itemsInJson = JSON.stringify(items, null, 2);
  const blob = new Blob([itemsInJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "list.json";
  link.click();
  URL.revokeObjectURL(url);
};
