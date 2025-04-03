import { Toaster } from "sonner";
import useRouteElements from "./routes/useRouteElements";
import ScrollToTop from "./utils/ScrollToTop";
import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400
import "@fontsource/plus-jakarta-sans/400.css"; // Specify weight
import "@fontsource/plus-jakarta-sans/400-italic.css"; 

function App() {
  const element = useRouteElements();
  return (
    <>
      <ScrollToTop />
      {element}
      <Toaster
        richColors={true}
        toastOptions={{
          style: {
            padding: "22px",
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}

export default App;
