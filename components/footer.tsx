const Footer = () => {
  return (
    <footer className="flex flex-col gap-5 p-10">
      <div className="flex flex-col">
        {/* title */}
        <div className="flex justify-between"></div>
      </div>
      {/* rights */}
      <div className="flex items-center justify-center text-sm text-neutral-400">
        <p>&copy; {new Date().getFullYear()} Drawlings. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
