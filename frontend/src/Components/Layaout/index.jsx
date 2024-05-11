const Layout = ({ children }) => {
  return (
    <div className="flex flex-col pt-4 px-4 items-center w-full lg:hidden">
      {children}
    </div>
  );
};

export default Layout;
