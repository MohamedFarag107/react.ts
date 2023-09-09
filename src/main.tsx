import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import App from "./App.tsx";
import { store } from "./api/store.ts";
import "./translations/i18n.ts";
import "./index.css";
// Import Swiper styles
import "swiper/css";
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(29, 46, 162)",
    },
    secondary: {
      main: "#1565c0",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </>
);
