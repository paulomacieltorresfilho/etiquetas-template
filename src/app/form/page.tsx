"use client";
import { TipoCookies } from "@/enum/tipo-cookies";
import { convertDateToISOString } from "@/util/date";
import React, { useEffect, useState } from "react";

export default function FormPage() {
  const [state, setState] = useState({
    fabricacao: convertDateToISOString(new Date()),
    validade: convertDateToISOString(new Date()),
    tipo: TipoCookies.BAUNILHA.toString(),
    loading: false,
  });

  function downloadPDF() {
    setState({
      ...state,
      loading: true
    })
    fetch(`/api/create-pdf?url=print/${state.tipo}&fabricacao=${state.fabricacao}&validade=${state.validade}`)
      .then(response => response.arrayBuffer().catch(() => response.json())      )
      .then(buffer => {
        if (typeof buffer == 'string') {
          let warning = document.createElement('p');
          warning.innerHTML = buffer
        }
          var bytes = new Uint8Array(buffer);

          var blob = new Blob([bytes], { type: "application/pdf" });

          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${state.fabricacao}${state.tipo}.pdf`;
          link.click();
        })
      .finally(() => {
        setState({
          ...state,
          loading: false
        })
      })
  }

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

        <button
          type="button"
          onClick={downloadPDF}
          disabled={state.loading}
          aria-busy={state.loading}
          aria-label={"Baixando"}
        >
          {state.loading ? "" : "Salvar como PDF"}
        </button>
      </form>
    </div>
  );
}
