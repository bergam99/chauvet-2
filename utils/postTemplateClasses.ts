export function getImageSize(size: string) {
  console.log("Received size:", size);
  switch (size) {
    case "Horizontal_Full":
      return { className: "horizontal-full", height: 0, width: 0 };
    case "Vertical_Full":
      return { className: "vertical-full", height: 0, width: 0 };
    case "Horizontal_Small":
      return { className: "horizontal-small", height: 0, width: 0 };
    case "Horizontal_Medium":
      return { className: "horizontal-medium", height: 0, width: 0 };
    case "Vertical_Small":
      return { className: "vertical-small", height: 0, width: 0 };
    default:
      return { className: "", height: 0, width: 0 };
  }
}
