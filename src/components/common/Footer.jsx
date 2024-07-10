import '../../styles/Footer.css'

export default function Footer() {
    return (
      <div id="footer-wrapper">
        <section className="footer-columns">
          <span id="company">
            <ul className="footerlist">
              <b>ArtBoards</b>
              <li><a href="/">About us</a></li>
              <li><a href="/">Terms</a></li>
              <li><a href="/">Privacy</a></li>
              <li><a href="/">Help</a></li>
            </ul>
          </span>
          <span id="workwithus">
            <ul className="footerlist">
              <b>Work with us</b>
              <li><a href="/">Artists</a></li>
              <li><a href="/">Institutions</a></li>
              <li><a href="/">API</a></li>
            </ul>
          </span>
          <span id="connect">
            <ul className="footerlist">
              <b>Connect</b>
              <li><a href="/">Twitter / X</a></li>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Pinterest</a></li>
            </ul>
          </span>
        </section>
        <section className="footerlogo">
        </section>
      </div>
    );
  }