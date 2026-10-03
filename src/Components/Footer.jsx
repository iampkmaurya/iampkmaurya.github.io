import React, { Component } from 'react';

class Footer extends Component {
  scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, '#home');
    }
  };

  render() {
    if (!this.props.data) return null;

    var networks = this.props.data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-glass-icon"
            title={network.name}
            aria-label={network.name}
          >
            <i className={network.className}></i>
          </a>
        </li>
      );
    });

    var year = new Date().getFullYear();

    return (
      <footer className="glass-footer">
        <div className="footer-inner">
          <div className="footer-top-row">
            <div className="footer-brand">
              <a
                href="#home"
                onClick={this.scrollToTop}
                className="footer-logo"
              >
                PM<span className="accent-dot">.</span>
              </a>
              <p className="footer-tagline">
                Full Stack Developer passionate about crafting modern, high-performance & visually refined web applications.
              </p>
            </div>

            <div className="footer-social-wrap">
              <ul className="footer-social-list">
                {networks}
              </ul>
            </div>
          </div>

          <div className="footer-divider-line"></div>

          <div className="footer-bottom-row">
            <p className="footer-copyright">
              © {year} Prashant Maurya
            </p>

            <div id="go-top">
              <button
                type="button"
                onClick={this.scrollToTop}
                className="go-top-glass-btn"
                title="Back to Top"
                aria-label="Back to Top"
              >
                <i className="fa-solid fa-angle-up fa fa-angle-up"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
