import { Toaster } from "sonner";
import useRouteElements from "./routes/useRouteElements";
function App() {
  const element = useRouteElements();
  return (
    <>
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
