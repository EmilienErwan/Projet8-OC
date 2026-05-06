export default function TagList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <section className="tag-section">
      <h2>{title}</h2>
      <div className="tags">
        {items.map((item) => (
          <span key={item} className="tag">{item}</span>
        ))}
      </div>
    </section>
  );
}