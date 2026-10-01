import Image from "next/image";

export default function RectorMessage() {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      <div className="relative w-[140px] h-[140px] sm:w-40 sm:h-40 rounded-full overflow-hidden bg-panel shrink-0">
        <Image
          src="/images/dueños.png"
          alt="Maira Alejandra Lasso Cruz y Julio Arturo Vargas Soto"
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <div>
        <span className="text-gold font-bold text-xs uppercase tracking-wider">Palabras de los fundadores</span>
        <p className="text-base leading-relaxed text-ink italic mt-3 mb-2">
          &ldquo;Maira Alejandra Lasso Cruz y Julio Arturo Vargas Soto son los fundadores de la Institución Educativa Lazarillo de Tormes, un proyecto nacido de su compromiso, dedicación y profundo amor por la educación. Con visión y esperanza, han construido una institución que busca formar niños y jóvenes íntegros, capaces de aprender, soñar y transformar su entorno. Lazarillo de Tormes representa hoy el fruto de una familia que creyó que educar es sembrar oportunidades para transformar el mundo.&rdquo;
        </p>
        <div className="font-display font-bold text-[15px] text-ink">Maira Alejandra Lasso Cruz y Julio Arturo Vargas Soto</div>
        <div className="text-[13px] text-muted">Fundadores</div>
      </div>
    </div>
  );
}
