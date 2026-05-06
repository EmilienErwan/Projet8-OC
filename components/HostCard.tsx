import Image from "next/image";
import { Star } from "lucide-react";
import { Host } from "@/types/property";
import { getImageUrl } from "@/services/api";

export default function HostCard({ host }: { host?: Host }) {
  return (
    <aside className="host-card">
      <h2>Votre hôte</h2>

      <div className="host-info">
        <Image
          src={getImageUrl(host?.picture)}
          alt={host?.name || "Hôte du logement"}
          width={80}
          height={80}
          className="host-picture"
        />

        <p>{host?.name || "Hôte Kasa"}</p>

        <span className="rating">
          <Star size={18} fill="currentColor" />
          3
        </span>
      </div>

      <a href="/messages" className="primary-btn">Contacter l’hôte</a>
      <a href="/messages" className="primary-btn">Envoyer un message</a>
    </aside>
  );
}