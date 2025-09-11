const Section = ({ children, className = "", ...props }) => {
  return (
    <section className={`${className} py-20`} {...props}>
      {children}
    </section>
  );
};

export default Section;
