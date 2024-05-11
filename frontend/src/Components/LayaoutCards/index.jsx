import "./styles.css";

const LayaoutCards = ({ children }) => {
  return (
    <section className="cultivo-section overflow-y-scroll px-4 pb-4 lg:pb-0 lg:overflow-y-hidden">
      <div className="w-full lg:h-full flex flex-col justify-center gap-4 lg:gap-0">
        {children}
      </div>
    </section>
  );
};

export default LayaoutCards;
