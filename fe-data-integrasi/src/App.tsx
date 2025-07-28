import Router from "./routes/index";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
