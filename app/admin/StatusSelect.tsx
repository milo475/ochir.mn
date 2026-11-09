"use client";

import { useRef } from "react";
import { STATUS_LABEL } from "@/lib/status";
import { updateStatus } from "./actions";


export function StatusSelect({ id, status }: { id: string; status: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={`st-${id}`}>
        Статус
      </label>
      <select
        id={`st-${id}`}
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className="min-h-[40px] rounded-lg border border-line bg-bg px-2.5 text-sm text-ink focus:border-ink focus:outline-none"
      >
        {Object.entries(STATUS_LABEL).map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <noscript>
        <button className="ml-2 text-xs link">Хадгалах</button>
      </noscript>
    </form>
  );
}
