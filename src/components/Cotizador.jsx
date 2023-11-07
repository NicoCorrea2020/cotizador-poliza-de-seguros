import { Link } from "react-router-dom";
import { BsClipboard } from "react-icons/bs";
import Opciones from "./Opciones";
import { useEffect, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import Swal from "sweetalert2";
import useHistorial from "../hooks/useHistorial";

const Cotizador = () => {
  const costoMetroCuadrado = 35.86;
  const [precio, setPrecio] = useState(0);
  const [datos, setDatos] = useState([]);
  const { elementos, setElementos } = useCotizador();
  const { historial, setHistorial } = useHistorial();

  const realizarCotizacion = () => {
    console.log(elementos);
    const { metrosCuadrados, propiedad, ubicacion } = elementos;
    if (metrosCuadrados < 20 || propiedad == 0 || ubicacion == 0) {
      Swal.fire("Oops", "Debes completar los datos", "error");
    }
    const cuenta = costoMetroCuadrado * metrosCuadrados * propiedad * ubicacion;
    setPrecio(cuenta);
  };
  const guardar = () => {
    setHistorial([
      ...historial,
      {
        fecha: new Date().toDateString(),
        ...elementos,
        cuenta:
          (costoMetroCuadrado *
          elementos.metrosCuadrados *
          elementos.propiedad *
          elementos.ubicacion).toFixed(2)
      },
    ]);
    setPrecio(0);
  };

  useEffect(() => {
    const leer = async () =>
      setDatos(await (await fetch("/datos.json")).json());
    leer();
  }, []);

  return (
    <>
      <h2>Seguros del Hogar</h2>

      <nav>
        <Link className="boton" to={"/historial"}>
          Historial { }
          <BsClipboard />
        </Link>
      </nav>

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <Opciones
          datos={datos.filter(({ categoria }) => categoria == "propiedad")}
          label={"Tipo de Propiedad"}
          tipo={"propiedad"}
        />
        <Opciones
          datos={datos.filter(({ categoria }) => categoria == "ubicacion")}
          label={"Ubicación"}
          tipo={"ubicacion"}
        />
        <label htmlFor="metrosCuadrados">Cantidad de metros cuadrados</label>
        <input
          type="number"
          id="metrosCuadrados"
          min={20}
          defaultValue={20}
          onInput={(e) =>
            setElementos({
              ...elementos,
              metrosCuadrados: isNaN(parseInt(e.target.value))
                ? 20
                : parseInt(e.target.value) < 20
                ? 20
                : parseInt(e.target.value),
            })
          }
        />
        <button type="button" onClick={realizarCotizacion}>
          Cotizar
        </button>
      </form>

      {precio != 0 && (
        <>
          <p>La poliza estimada es de ${precio.toFixed(2)}</p>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <button type="button" onClick={guardar}>
              Guardar
            </button>
          </form>
        </>
      )}
    </>
  );
};
export default Cotizador;
