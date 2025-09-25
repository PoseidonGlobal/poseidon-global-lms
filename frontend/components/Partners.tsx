export default function Partners() {
  const partners = [
    { name: 'IMO', logo: '/partners/imo.png' },
    { name: 'STCW', logo: '/partners/stcw.png' },
    { name: 'ISO', logo: '/partners/iso.png' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <span className="text-lg font-medium text-gray-700">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}