import { Link } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import useHistorial from "../hooks/useHistorial";
import Cotizado from "./Cotizado";

const Historial = () => {
  const { historial } = useHistorial();

  return (
    <>
      <h2>Seguros del Hogar</h2>

      <nav>
        <Link className="boton" to={"/"}>
          Cotizador { }
          <BsHouse />
        </Link>
      </nav>
      <ul>
        {historial.map((elemento, indice) => (
          <Cotizado key={indice} {...elemento} />
        ))}
      </ul>
    </>
  );
};
export default Historial;
