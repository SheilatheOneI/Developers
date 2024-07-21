import { Spinner } from "@nextui-org/react";

const Preloader = () => {
  return (
    <section className="min-h-screen w-screen flex items-center justify-center">
      <Spinner />
    </section>
  );
};

export default Preloader;
