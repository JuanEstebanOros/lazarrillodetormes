import Image from "next/image";

export default function RectorMessage() {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      <div className="relative w-[140px] h-[140px] sm:w-40 sm:h-40 rounded-full overflow-hidden bg-panel shrink-0">
        <Image
          src="/images/rectora.jpg"
          alt="Maira Alejandra Lasso Cruz, rectora y fundadora"
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <div>
        <span className="text-gold font-bold text-xs uppercase tracking-wider">Palabras de la rectora</span>
        <p className="text-base leading-relaxed text-ink italic mt-3 mb-2">
          &ldquo;Cada niño y niña que llega a nuestra institución es recibido como parte de una gran familia. Nuestro
          compromiso es formar personas íntegras, felices y con las herramientas para transformar su entorno.&rdquo;
        </p>
        <div className="font-display font-bold text-[15px] text-ink">Maira Alejandra Lasso Cruz</div>
        <div className="text-[13px] text-muted">Rectora y fundadora</div>
      </div>
    </div>
  );
}
