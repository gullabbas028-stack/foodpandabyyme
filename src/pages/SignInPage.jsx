import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import "./BrowsePages.css";

export default function SignInPage() {
  const { signIn, setPage, showToast, user } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = (event) => { event.preventDefault(); if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.password.length < 6) { setError("Enter your name, a valid email, and a password of at least 6 characters."); return; } signIn(form.name.trim(), form.email); showToast(`Welcome, ${form.name.trim()}!`); setPage("home"); };
  if (user) return <main className="signin-page"><section className="signin-card"><p className="page-kicker">ACCOUNT</p><h1>You're signed in</h1><p>Welcome back, {user.name}.</p><button className="primary-action" onClick={() => setPage("home")}>Browse restaurants</button></section></main>;
  return <main className="signin-page"><form className="signin-card" onSubmit={submit}><p className="page-kicker">WELCOME BACK</p><h1>Sign in to foodpanda</h1><p>Save your details and make ordering faster.</p><label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" /></label><label>Email address<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" /></label><label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimum 6 characters" autoComplete="current-password" /></label>{error && <p className="form-error">{error}</p>}<button className="primary-action" type="submit">Sign in</button><button className="text-action" type="button" onClick={() => setPage("home")}>Continue as guest</button></form></main>;
}
