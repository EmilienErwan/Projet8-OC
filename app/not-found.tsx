import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>
        Il semble que la page que vous cherchez ait pris des vacances... ou
        n’ait jamais existé.
      </p>

      <div className="not-found-actions">
        <Link href="/">Accueil</Link>
        <Link href="/">Logements</Link>
      </div>
    </section>
  );
}