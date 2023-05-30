import "@emotion/react";
import { Theme as DefaultTheme } from "@mui/material";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends DefaultTheme {}
}
