"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn-primary w-full" disabled={pending}>
      {pending ? "Шалгаж байна…" : "Нэвтрэх"}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Нууц үг
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="field" autoFocus />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}
      <Submit />
    </form>
  );
}
