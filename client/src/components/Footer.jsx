const Footer = () => {
  return (
    <footer className="bottom-0 bg-[#f3f4f6] top-0 z-[20] mx-auto flex w-full items-center justify-between border-t h-12 px-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex w-fit justify-start"></div>
      <div className="flex w-2/3 space-x-2">
        <p className="text-xs underline">Quienes somos</p>
        <p className="text-xs underline">Términos y condiciones</p>
        <p className="text-xs underline">Contacto</p>
        <p className="text-xs underline">Preguntas Frecuentes</p>
      </div>
      <div className="flex w-1/3 justify-end text-sm">
        <p className="font-semibold">CUX Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
