import React, { Component } from 'react';

class Contact extends Component {
  render() {
    if (!this.props.data) return null;

    var main = this.props.data;
    var contact = this.props.contactData || {};

    var name = main.name;
    var email = main.email;
    var phone = main.phone;

    var availabilityTag = contact.availabilityTag || main.availability || "Open for Full-Time Roles & Opportunities";
    var title = contact.title || "Let's Build Something Extraordinary Together";
    var description = contact.description || "I'm always interested in discussing new opportunities, full-stack architecture challenges, or high-impact projects. Feel free to reach out via email, phone, or LinkedIn.";

    var networks = main.social.map(function (network) {
      return (
        <a
          key={network.name}
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social-pill glass-subpanel"
          title={network.name}
        >
          <i className={network.className}></i>
          <span>{network.name}</span>
        </a>
      );
    });

    return (
      <section id="contact" className="glass-section">
        <div className="section-inner">
          <div className="section-pill-badge">
            <span className="pill-code">{"// 04"}</span>
            <span className="pill-text">Get In Touch</span>
          </div>

          <div className="contact-hero-card glass-panel">
            <div className="contact-hero-content">
              <span className="contact-availability-tag">
                <span className="pulse-dot"></span> {availabilityTag}
              </span>

              <h2 className="contact-title">
                {title}
              </h2>

              <p className="contact-description">
                {description}
              </p>

              <div className="contact-primary-actions">
                {email && (
                  <a href={"mailto:" + email} className="glass-btn btn-primary contact-main-btn">
                    <i className="fa-solid fa-envelope fa fa-envelope-o"></i>
                    <span>Send Me an Email</span>
                  </a>
                )}
                {phone && (
                  <a href={"tel:" + phone} className="glass-btn btn-secondary contact-main-btn">
                    <i className="fa-solid fa-phone fa fa-phone"></i>
                    <span>Direct Call</span>
                  </a>
                )}
              </div>

              <div className="contact-social-footer">
                <span className="connect-label">Connect with {name} directly:</span>
                <div className="contact-social-pills-row">
                  {networks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
