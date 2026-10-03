import React, { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  handleCopyEmail = (email) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      this.setState({ copied: true });
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2500);
    }
  };

  scrollToContact = (e) => {
    e.preventDefault();
    var contactEl = document.getElementById('contact');
    if (contactEl) {
      var navOffset = 85;
      var elPos = contactEl.getBoundingClientRect().top;
      var targetScrollTop = elPos + (window.pageYOffset || document.documentElement.scrollTop) - navOffset;

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, '#contact');
      }
    }
  };

  render() {
    if (!this.props.data) return null;

    var main = this.props.data;
    var about = this.props.aboutData || {};

    var name = main.name;
    var profilepic = "images/" + main.image;
    var bio = main.bio;
    var phone = main.phone;
    var email = main.email;
    var occupation = main.occupation;
    var location = main.location || "Noida, India";
    var resumeDownload = main.resumedownload;

    var headline = about.headline || "Transforming Ideas Into Polished Digital Experiences";
    var stats = about.stats || [
      { value: "7+", label: "Years Exp." },
      { value: "Full Stack", label: "Specialist" },
      { value: "Noida", label: "Location" }
    ];
    var highlights = about.highlights || ["Accenture", "Infosys", "React & Node.js", "Open for Work"];
    var capabilities = about.capabilities || [];

    return (
      <section id="about" className="glass-section">
        <div className="section-inner">
          {/* Section Header Badge */}
          <div className="section-pill-badge">
            <span className="pill-code">{"// 01"}</span>
            <span className="pill-text">About Me</span>
          </div>

          <div className="about-bento">
            {/* Left Card: Profile & Quick Stats */}
            <div className="about-card profile-card glass-panel">
              <div className="profile-frame">
                <div className="profile-glow"></div>
                <img className="profile-pic" src={profilepic} alt={name} />
              </div>

              <div className="profile-details">
                <h3 className="profile-title">{name}</h3>
                <span className="profile-subtitle">{occupation}</span>
              </div>

              <div className="profile-stats-row">
                {stats.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="stat-sep"></div>}
                    <div className="stat-box">
                      <span className="stat-val">{stat.value}</span>
                      <span className="stat-lbl">{stat.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="profile-badges-wrap">
                {highlights.map((item) => (
                  <span key={item} className="badge-highlight">
                    <i className="fa-solid fa-check fa fa-check"></i> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Card: Bio Narrative & Contact Grid */}
            <div className="about-card content-card glass-panel">
              <h2 className="about-heading">
                {headline}
              </h2>

              <p className="about-bio-para">{bio}</p>

              {/* Contact Cards */}
              <div className="contact-grid">
                {email && (
                  <div className="contact-item glass-subpanel contact-with-copy">
                    <a href={"mailto:" + email} className="contact-link">
                      <div className="contact-icon-wrapper">
                        <i className="fa-solid fa-envelope fa fa-envelope"></i>
                      </div>
                      <div className="contact-text-wrap">
                        <span className="contact-meta-label">Email</span>
                        <span className="contact-meta-value">{email}</span>
                      </div>
                    </a>
                    <button
                      type="button"
                      onClick={() => this.handleCopyEmail(email)}
                      className="copy-email-btn"
                      title="Copy Email to Clipboard"
                    >
                      <i className={this.state.copied ? "fa-solid fa-check fa fa-check" : "fa-regular fa-copy fa fa-copy"}></i>
                      <span>{this.state.copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                )}

                {phone && (
                  <a href={"tel:" + phone} className="contact-item glass-subpanel">
                    <div className="contact-icon-wrapper">
                      <i className="fa-solid fa-phone fa fa-phone"></i>
                    </div>
                    <div className="contact-text-wrap">
                      <span className="contact-meta-label">Phone</span>
                      <span className="contact-meta-value">{phone}</span>
                    </div>
                  </a>
                )}

                <div className="contact-item glass-subpanel">
                  <div className="contact-icon-wrapper">
                    <i className="fa-solid fa-location-dot fa fa-map-marker"></i>
                  </div>
                  <div className="contact-text-wrap">
                    <span className="contact-meta-label">Location</span>
                    <span className="contact-meta-value">{location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="about-action-row">
                {resumeDownload && (
                  <a
                    href={resumeDownload}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn btn-primary download-btn"
                    download
                  >
                    <i className="fa-solid fa-download fa fa-download"></i>
                    <span>Download Full CV</span>
                  </a>
                )}
                <a
                  href="#contact"
                  className="glass-btn btn-secondary"
                  onClick={this.scrollToContact}
                >
                  <i className="fa-regular fa-paper-plane fa fa-paper-plane-o"></i>
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </div>

          {/* Capabilities Grid managed entirely from JSON */}
          {capabilities.length > 0 && (
            <div className="capabilities-wrapper">
              <h3 className="capabilities-title">
                Core Capabilities & <span className="text-gradient">Specializations</span>
              </h3>

              <div className="capabilities-grid">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="capability-card glass-subpanel">
                    <div className="capability-icon">
                      <i className={cap.icon}></i>
                    </div>
                    <h4>{cap.title}</h4>
                    <p>{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default About;
