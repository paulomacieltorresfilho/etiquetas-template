"use client";
import { TipoCookies } from "@/enum/tipo-cookies";
import { convertDateToISOString, convertDateToLocaleString } from "@/util/date";
import Link from "next/link";
import React, { useState } from "react";

export default function FormPage() {
  const [state, setState] = useState({
    fabricacao: convertDateToISOString(new Date()),
    validade: convertDateToISOString(new Date()),
    tipo: TipoCookies.BAUNILHA.toString(),
  });

  function handleFabricacaoChange(event: React.FormEvent<HTMLInputElement>) {
    setState({
      ...state,
      fabricacao: convertDateToISOString(event.currentTarget.valueAsDate ?? new Date()),
    });
  }

  function handleValidadeChange(event: React.FormEvent<HTMLInputElement>) {
    setState({
      ...state,
      validade: convertDateToISOString(event.currentTarget.valueAsDate ?? new Date()),
    });
  }

  function handleTipoChange(event: React.FormEvent<HTMLInputElement>) {
    setState({
      ...state,
      tipo: event.currentTarget.value,
    });
  }

  return (
    <div className="container">
      <h1>Etiqueta Cookies</h1>
      <form>
        <div className="grid">
          <label>
            Data de Fabricação
            <input
              value={state.fabricacao}
              onChange={handleFabricacaoChange}
              type="date"
              id="fabricacao"
            />
          </label>

          <label>
            Data de Validade
            <input
              value={state.validade}
              onChange={handleValidadeChange}
              type="date"
              id="validade"
            />
          </label>
        </div>

        <fieldset>
          Tipo de cookies:
          <label>
            <input
              value={TipoCookies.BAUNILHA}
              name="tipo-cookies"
              type="radio"
              onChange={handleTipoChange}
              checked={state.tipo === TipoCookies.BAUNILHA}
            />
            Baunilha
          </label>
          <label>
            <input
              value={TipoCookies.CACAU}
              name="tipo-cookies"
              type="radio"
              onChange={handleTipoChange}
              checked={state.tipo === TipoCookies.CACAU}
            />
            Cacau
          </label>
        </fieldset>

        <Link
          href={{
            pathname: `/print/${state.tipo}`,
            query: {
              validade: state.validade,
              fabricacao: state.fabricacao,
            },
          }}
          target="_blank"
          role="button"
        >
          Ir para página de impressão
        </Link>
      </form>
    </div>
  );
}
