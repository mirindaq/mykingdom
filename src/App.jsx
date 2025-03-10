import { Toaster } from "sonner";
import useRouteElements from "./routes/useRouteElements";
function App() {
  const element = useRouteElements();
  return (
    <>
      {element}
      <Toaster
        toastOptions={{
          style: {
            color: "green",
            padding: "22px",
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}

export default App;
