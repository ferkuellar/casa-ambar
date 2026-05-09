import { useEffect, useState } from "react";

import { getHealth, type HealthResponse } from "../lib/api";
import { cn } from "../lib/cn";


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
    loading: "border-amber-gold/40 bg-amber-gold/10 text-amber-gold",
    connected: "border-emerald-700/30 bg-emerald-700/10 text-emerald-800",
    error: "border-red-700/30 bg-red-700/10 text-red-800",
  }[health.status];

  return (
    <section
      className="w-full rounded-brand border border-amber-line bg-amber-cream p-5"
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-gold">
            Backend API
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-amber-black">
            Estado de conexión
          </h2>
        </div>

        <span className={cn("w-fit rounded-brand border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]", statusStyles)}>
          {health.status === "loading" && "Consultando"}
          {health.status === "connected" && "Conectado"}
          {health.status === "error" && "Error"}
        </span>
      </div>

      <div className="mt-5 border-t border-amber-line pt-4 text-sm text-amber-stone">
        {health.status === "loading" && (
          <p>Validando disponibilidad de la API local.</p>
        )}
        {health.status === "connected" && (
          <dl className="grid gap-3 sm:grid-cols-3">
            <div>
              <dt className="text-amber-muted">Status</dt>
              <dd className="mt-1 text-amber-black">{health.data.status}</dd>
            </div>
            <div>
              <dt className="text-amber-muted">Servicio</dt>
              <dd className="mt-1 text-amber-black">{health.data.service}</dd>
            </div>
            <div>
              <dt className="text-amber-muted">Fase</dt>
              <dd className="mt-1 text-amber-black">{health.data.phase}</dd>
            </div>
          </dl>
        )}
        {health.status === "error" && (
          <p>
            No se pudo confirmar el healthcheck. Revisa que Django esté activo
            en <span className="text-amber-black">http://localhost:8000</span>.
          </p>
        )}
      </div>
    </section>
  );
}
