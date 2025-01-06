const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-violet-600 text-white py-1 text-center text-sm">
        <p>© {currentYear} All Rights Reserved</p>
      </footer>
    );
  };
  
  export default Footer;