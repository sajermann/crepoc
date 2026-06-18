import JsonView from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";

interface JsonViewerProps {
  value?: object;
  collapsed?: boolean | number;
  shortenTextAfterLength?: number;
}

export function JsonViewer(data: JsonViewerProps) {
  const theme = { ...lightTheme };
  return <JsonView {...data} style={{ ...theme, width: "100%" }} />;
}
