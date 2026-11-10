export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.38),transparent_65%)] animate-float-slow" />
      <div className="absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32),transparent_65%)] animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.16),transparent_65%)] animate-float-slow" />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    </div>
  );
}
