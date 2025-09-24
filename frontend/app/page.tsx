import Image from 'next/image';

export const metadata = {
  title: 'Poseidon Global LMS',
  description: 'Poseidon Global LMS landing',
};

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        display: 'grid',
        placeItems: 'center',
        background: '#0a0f1a',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(1200px, 95vw)',
          aspectRatio: '16 / 9',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,.45)',
        }}
      >
        <Image
          src="/Designer.jpeg"
          alt="Poseidon Global LMS hero"
          fill
          priority
          sizes="(max-width: 1200px) 95vw, 1200px"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </main>
  );
}
