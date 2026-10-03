import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      activeSection: 'home',
      isScrolled: false,
      showScrollDown: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    var scrollPos = window.scrollY || window.pageYOffset;
    var isScrolled = scrollPos > 40;

    var sections = ['contact', 'skills', 'resume', 'about', 'home'];
    var current = 'home';

    var doc = document.documentElement;
    var scrollHeight = doc.scrollHeight;
    var clientHeight = window.innerHeight || doc.clientHeight;

    // When scrolled near the bottom of page, reliably activate contact
    if (scrollPos + clientHeight >= scrollHeight - 80) {
      current = 'contact';
    } else {
      for (var i = 0; i < sections.length; i++) {
        var el = document.getElementById(sections[i]);
        if (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = sections[i];
            break;
          }
        }
      }
    }

    if (this.state.isScrolled !== isScrolled || this.state.activeSection !== current) {
      this.setState({ isScrolled: isScrolled, activeSection: current });
    }
  };

  handleHeroMouseMove = (e) => {
    var heroEl = document.getElementById('home');
    if (!heroEl) return;
    var rect = heroEl.getBoundingClientRect();
    // Show only when cursor moves within the bottom 140px of the hero section
    var distanceFromBottom = rect.bottom - e.clientY;
    var isNearBottom = distanceFromBottom >= 0 && distanceFromBottom <= 140;

    if (this.state.showScrollDown !== isNearBottom) {
      this.setState({ showScrollDown: isNearBottom });
    }
  };

  handleHeroMouseLeave = () => {
    if (this.state.showScrollDown) {
      this.setState({ showScrollDown: false });
    }
  };

  scrollToSection = (e, targetId) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({ mobileOpen: false, activeSection: targetId });

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, '#home');
      }
      return;
    }

    var targetEl = document.getElementById(targetId);
    if (targetEl) {
      var navOffset = 80;
      var elPos = targetEl.getBoundingClientRect().top;
      var targetScrollTop = elPos + (window.pageYOffset || document.documentElement.scrollTop) - navOffset;

      window.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, '#' + targetId);
      }
    }
  };

  toggleMobileMenu = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      mobileOpen: !prevState.mobileOpen
    }));
  };

  render() {
    if (!this.props.data) return null;

    var name = this.props.data.name;
    var occupation = this.props.data.occupation;
    var description = this.props.data.description;
    var resumeDownload = this.props.data.resumedownload;
    var availability = this.props.data.availability || 'Available for Opportunities';
    var active = this.state.activeSection;
    var mobileOpen = this.state.mobileOpen;
    var isScrolled = this.state.isScrolled;
    var showScrollDown = this.state.showScrollDown;

    var networks = this.props.data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-glass-icon"
            title={network.name}
            aria-label={network.name}
          >
            <i className={network.className}></i>
          </a>
        </li>
      );
    });

    var navItems = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'resume', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' }
    ];

    return (
      <React.Fragment>
        {/* Floating Glass Navbar - Placed at root level so it sits on top of all sections without stacking context traps */}
        <nav
          id="nav-wrap"
          className={`${isScrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        >
          <div className="nav-container">
            {/* Logo */}
            <div className="nav-logo">
              <a
                href="#home"
                onClick={(e) => this.scrollToSection(e, 'home')}
              >
                PM<span className="accent-dot">.</span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <ul id="nav" className="nav desktop-nav">
              {navItems.map((item) => {
                var isCurrent = active === item.id;
                return (
                  <li key={item.id} className={isCurrent ? 'current' : ''}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => this.scrollToSection(e, item.id)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right Action / Contact CTA */}
            <div className="nav-right-actions">
              <a
                href="#contact"
                className="nav-cta-btn"
                onClick={(e) => this.scrollToSection(e, 'contact')}
              >
                <span>Let's Talk</span>
                <i className="fa-regular fa-paper-plane fa fa-paper-plane-o"></i>
              </a>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                className="mobile-hamburger-btn"
                onClick={this.toggleMobileMenu}
                aria-label="Toggle Navigation"
              >
                <i className={mobileOpen ? 'fa-solid fa-xmark fa fa-times' : 'fa-solid fa-bars fa fa-bars'}></i>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Drawer */}
          {mobileOpen && (
            <div className="mobile-nav-drawer glass-panel">
              <ul className="mobile-nav-list">
                {navItems.map((item) => {
                  var isCurrent = active === item.id;
                  return (
                    <li key={item.id} className={isCurrent ? 'current' : ''}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => this.scrollToSection(e, item.id)}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href="#contact"
                    className="mobile-contact-link"
                    onClick={(e) => this.scrollToSection(e, 'contact')}
                  >
                    <i className="fa-regular fa-paper-plane fa fa-paper-plane-o"></i> Contact Me
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Banner Section */}
        <header
          id="home"
          onMouseMove={this.handleHeroMouseMove}
          onMouseLeave={this.handleHeroMouseLeave}
        >
          <div className="banner">
            <div className="banner-text">
              {/* Status Pill */}
              <div className="hero-status-badge">
                <span className="status-indicator">
                  <span className="status-ping"></span>
                  <span className="status-core"></span>
                </span>
                <span>{availability}</span>
              </div>

              {/* Headline */}
              <h1 className="responsive-headline hero-title">
                Hi<span className="wave-hand" role="img" aria-label="wave">👋</span>, I'm{' '}
                <span className="gradient-name">{name}</span>
              </h1>

              {/* Role & Description */}
              <div className="hero-role-container">
                <span className="hero-role-tag">{occupation}</span>
                <p className="hero-desc">{description}</p>
              </div>

              {/* Hero CTAs */}
              <div className="hero-actions">
                <a
                  href="#about"
                  className="glass-btn btn-primary"
                  onClick={(e) => this.scrollToSection(e, 'about')}
                >
                  <span>About Me</span>
                  <i className="fa-solid fa-arrow-right fa fa-arrow-right"></i>
                </a>
                <a
                  href="#resume"
                  className="glass-btn btn-secondary"
                  onClick={(e) => this.scrollToSection(e, 'resume')}
                >
                  <i className="fa-solid fa-briefcase fa fa-briefcase"></i>
                  <span>Experience</span>
                </a>
                {resumeDownload && (
                  <a
                    href={resumeDownload}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn btn-tertiary"
                    download
                  >
                    <i className="fa-solid fa-download fa fa-download"></i>
                    <span>Resume</span>
                  </a>
                )}
              </div>

              {/* Social Icons */}
              <div className="hero-social-wrap">
                <ul className="social-glass-list">
                  {networks}
                </ul>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator - Revealed only when cursor moves near bottom of hero */}
          <div
            className={`scrolldown ${showScrollDown ? 'visible' : ''}`}
            aria-hidden={!showScrollDown}
          >
            <a
              className="scrolldown-glass-pill"
              href="#about"
              onClick={(e) => this.scrollToSection(e, 'about')}
              aria-label="Scroll Down"
            >
              <span className="mouse-icon">
                <span className="mouse-wheel"></span>
              </span>
              <span className="scroll-caption">Scroll Down</span>
            </a>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
