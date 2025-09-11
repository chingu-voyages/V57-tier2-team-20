const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`${className} container`} {...props}>
      {children}
    </div>
  );
};

export default Container;
