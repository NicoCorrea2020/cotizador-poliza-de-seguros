import { useContext } from "react";
import HistorialContext from "../context/HistorialContext";

const useHistorial = () => useContext(HistorialContext);

export default useHistorial;
