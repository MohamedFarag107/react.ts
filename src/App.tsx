import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import Private from "./layout/Private";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* public */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* private */}
            <Route element={<Private />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
