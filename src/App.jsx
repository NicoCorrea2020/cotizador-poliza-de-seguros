import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cotizador from "./components/Cotizador";
import Historial from "./components/Historial";
import CotizadorContext from "./context/CotizadorContext";
import HistorialContext from "./context/HistorialContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState } from "react";

const App = () => {
  const [elementos, setElementos] = useState({
    metrosCuadrados: 20,
    propiedad: 0,
    ubicacion: 0,
  });
  const [historial, setHistorial] = useLocalStorage("historial", []);
  return (
    <>
      <HistorialContext.Provider value={{ historial, setHistorial }}>
        <CotizadorContext.Provider value={{ elementos, setElementos }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<Cotizador />}></Route>
              <Route path="/historial" element={<Historial />}></Route>
            </Routes>
          </BrowserRouter>
        </CotizadorContext.Provider>
      </HistorialContext.Provider>
    </>
  );
};
export default App;
