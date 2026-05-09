import { useEffect, useState } from "react";

import { getHealth, type HealthResponse } from "../lib/api";


type HealthState =
  | { status: "loading" }
  | { status: "connected"; data: HealthResponse }
  | { status: "error"; message: string };

export function HealthCheck() {
  const [health, setHealth] = useState<HealthState>({ status: "loading" });

  useEffect(() => {
    let isMounted = true;

    getHealth()
      .then((data) => {
        if (isMounted) {
          setHealth({ status: "connected", data });
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setHealth({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "No fue posible conectar con el backend.",
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const statusStyles = {
    loading: "border-amberGold/40 bg-amberGold/10 text-amberGold",
    connected: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    error: "border-red-400/40 bg-red-500/10 text-red-200",
  }[health.status];

  return (
    <section
      className="w-full max-w-xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20"
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">
            Backend
          </p>
          <h2 className="mt-2 font-display text-2xl text-ivory">
            Estado de conexión
          </h2>
        </div>

        <span className={`w-fit border px-3 py-1 text-sm ${statusStyles}`}>
          {health.status === "loading" && "Consultando"}
          {health.status === "connected" && "Conectado"}
          {health.status === "error" && "Error"}
        </span>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4 text-sm text-white/65">
        {health.status === "loading" && (
          <p>Validando disponibilidad de la API local.</p>
        )}
        {health.status === "connected" && (
          <dl className="grid gap-3 sm:grid-cols-3">
            <div>
              <dt className="text-white/40">Status</dt>
              <dd className="mt-1 text-ivory">{health.data.status}</dd>
            </div>
            <div>
              <dt className="text-white/40">Servicio</dt>
              <dd className="mt-1 text-ivory">{health.data.service}</dd>
            </div>
            <div>
              <dt className="text-white/40">Fase</dt>
              <dd className="mt-1 text-ivory">{health.data.phase}</dd>
            </div>
          </dl>
        )}
        {health.status === "error" && (
          <p>
            No se pudo confirmar el healthcheck. Revisa que Django esté activo
            en <span className="text-ivory">http://localhost:8000</span>.
          </p>
        )}
      </div>
    </section>
  );
}
