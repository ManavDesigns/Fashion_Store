"use client";

import { useState } from "react";
import { customerApi } from "../../lib/bagisto";
import Button from "../common/Button";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    if (!form.firstName.trim() || !form.lastName.trim()) return "First name and last name are required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) return "Password and confirm password must match.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await customerApi.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        subscribedToNewsLetter: false,
      });
      setMessage("Welcome to The Atelier. Your account has been created.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">First Name</span>
          <input
            type="text"
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            className="input-field bg-surface border-transparent focus:bg-white"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Last Name</span>
          <input
            type="text"
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            className="input-field bg-surface border-transparent focus:bg-white"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Email Address</span>
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="input-field bg-surface border-transparent focus:bg-white"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Password</span>
        <input
          type="password"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
          className="input-field bg-surface border-transparent focus:bg-white"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Confirm Password</span>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(event) => updateField("confirmPassword", event.target.value)}
          className="input-field bg-surface border-transparent focus:bg-white"
        />
      </label>

      {error && <p className="text-[11px] font-black uppercase tracking-[0.1em] text-error p-3 bg-error/5 border border-error/20 mt-2">{error}</p>}
      {message && <p className="text-[11px] font-black uppercase tracking-[0.1em] text-primary p-3 bg-primary/5 border border-primary/20 mt-2">{message}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-14 mt-4 shadow-xl shadow-black/5"
      >
        {isSubmitting ? "Processing..." : "Create Account"}
      </Button>
    </form>
  );
}
