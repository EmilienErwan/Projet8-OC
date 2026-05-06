import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-intro">
        <h1>À propos</h1>

        <p>
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se
          sentir bien.
        </p>

        <p>
          Depuis notre création, nous mettons en relation des voyageurs en quête
          d’authenticité avec des hôtes passionnés qui aiment partager leur
          région et leurs bonnes adresses.
        </p>
      </div>

      <div className="about-main-image">
        <Image
          src="/about-house-1.png"
          alt="Maison en bois entourée d’arbres"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 980px"
          className="cover-image"
        />
      </div>

      <div className="about-mission">
        <div className="about-mission-text">
          <h2>Notre mission est simple :</h2>

          <ol>
            <li>Offrir une plateforme fiable et simple d’utilisation</li>
            <li>Proposer des hébergements variés et de qualité</li>
            <li>
              Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </li>
          </ol>

          <p>
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </p>
        </div>

        <div className="about-secondary-image">
          <Image
            src="/about-house-2.png"
            alt="Chalet chaleureux avec grande baie vitrée"
            fill
            sizes="(max-width: 768px) 100vw, 430px"
            className="cover-image"
          />
        </div>
      </div>
    </section>
  );
}