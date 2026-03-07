export default function FooterSection() {
  return (
    <footer>
      <div className="Ξ">
        <div className="Ft">
          <a href="#" className="Fl">
            <div className="FlG">
              <img
                src="/assets/obelisk-z-logo.png"
                alt=""
                style={{ width: 28, height: 28, objectFit: 'contain' }}
              />
            </div>
            <span className="FlN">OBELISK-Z WALLET</span>
          </a>
          <div className="Flk">
            <a href="#s2" data-k="nav_arch" />
            <a href="#s3" data-k="nav_sec" />
            <a href="#s4" data-k="nav_modes" />
            <a href="#s5b" data-k="nav_zion" />
            <a href="#s6" data-k="nav_eco" />
          </div>
          <div className="Fcp" data-k="footer_copy" />
        </div>
      </div>
    </footer>
  );
}
