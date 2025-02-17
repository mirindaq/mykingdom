import { MailOpen } from "lucide-react";
import { Button } from "./components/ui/button";
import useRouteElements from "./routes/useRouteElements";

function App() {
  const element = useRouteElements();
  return (
    <>
      {element}
    </>
  );
}

export default App;
