import Image from "next/image";

export default function OriginName() {
  return (
    <div className="grid gap-10 items-center bg-cream-soft rounded-[20px] p-6 sm:p-10 mb-14 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      <div className="relative w-full max-w-[380px] mx-auto aspect-[1128/1394] rounded-2xl bg-panel">
        <Image
          src="/images/IMGABUELO.jpeg"
          alt="Lázaro Lasso Quintero, origen del nombre Lazarillo de Tormes"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-contain rounded-2xl"
        />
      </div>
      <div>
        <span className="text-gold font-bold text-xs uppercase tracking-wider">¿Por qué Lazarillo de Tormes?</span>
        <h3 className="font-display text-xl sm:text-[22px] font-bold mt-3 mb-3.5">
          Un nombre que honra el amor de un abuelo
        </h3>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Nuestro nombre honra a Lázaro Lasso Quintero, abuelo de nuestra fundadora Maira Alejandra Lasso Cruz y
          ejemplo de amor, valores y espíritu emprendedor. También recuerda la célebre obra literaria que lleva su
          nombre, un recordatorio permanente de uno de nuestros énfasis: la lectoescritura, la imaginación y la
          comprensión lectora.
        </p>
      </div>
    </div>
  );
}
