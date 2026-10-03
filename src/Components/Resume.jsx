import React, { Component } from 'react';

class Resume extends Component {
  render() {
    if (!this.props.data) return null;

    var education = this.props.data.education.map(function (edu) {
      return (
        <div key={edu.school} className="edu-card glass-panel">
          <div className="edu-badge-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>

          <div className="edu-card-body">
            <div className="card-top-header">
              <div>
                <h3 className="card-primary-title">{edu.degree}</h3>
                <h4 className="card-secondary-title">{edu.school}</h4>
              </div>
              <div className="badge-wrapper">
                <span className="timeline-date-badge">
                  <i className="fa-regular fa-calendar-check fa fa-calendar-o"></i> {edu.graduated}
                </span>
              </div>
            </div>

            <div className="edu-meta-tags">
              {edu.tags ? (
                edu.tags.map(function (tag) {
                  return (
                    <span key={tag} className="edu-tag-pill">
                      {tag}
                    </span>
                  );
                })
              ) : (
                <span className="edu-tag-pill">Degree Completed</span>
              )}
            </div>

            {edu.description && <p className="card-description">{edu.description}</p>}
          </div>
        </div>
      );
    });

    var work = this.props.data.work.map(function (job) {
      var isCurrent = job.years.toLowerCase().includes('present');
      return (
        <div key={job.company} className="timeline-entry">
          <div className="timeline-marker">
            <span className="marker-dot"></span>
          </div>

          <div className="resume-card glass-panel timeline-card-body">
            <div className="job-card-header">
              <div className="job-icon-box">
                <i className="fa-solid fa-briefcase fa fa-briefcase"></i>
              </div>
              <div className="job-title-group">
                <h3 className="card-primary-title">{job.title}</h3>
                <h4 className="card-secondary-title">{job.company}</h4>
              </div>
              <div className="badge-wrapper">
                {isCurrent && <span className="status-live-tag">Current Role</span>}
                <span className="timeline-date-badge">
                  <i className="fa-regular fa-clock fa fa-clock-o"></i> {job.years}
                </span>
              </div>
            </div>

            {job.description && <p className="card-description">{job.description}</p>}

            {job.skills && job.skills.length > 0 && (
              <div className="job-skills-chips">
                <div className="chips-group">
                  {job.skills.map(function (s) {
                    return (
                      <span key={s} className="job-chip">
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });

    var skills = this.props.data.skills.map(function (skill) {
      var iconClass = "fa-solid fa-code fa fa-code";
      var sName = skill.name.toLowerCase();

      if (sName.includes("node")) iconClass = "fa-brands fa-node-js fa fa-server";
      else if (sName.includes("react")) iconClass = "fa-brands fa-react fa fa-code";
      else if (sName.includes("redux")) iconClass = "fa-solid fa-arrows-rotate fa fa-refresh";
      else if (sName.includes("script")) iconClass = "fa-brands fa-js fa fa-terminal";
      else if (sName.includes("html")) iconClass = "fa-brands fa-html5 fa fa-code";
      else if (sName.includes("css")) iconClass = "fa-brands fa-css3-alt fa fa-css3";
      else if (sName.includes("git") || sName.includes("devops")) iconClass = "fa-brands fa-git-alt fa fa-code-fork";
      else if (sName.includes("photoshop") || sName.includes("figma")) iconClass = "fa-brands fa-figma fa fa-paint-brush";

      return (
        <div key={skill.name} className="skill-item glass-subpanel">
          <div className="skill-info-row">
            <div className="skill-title-with-icon">
              <i className={iconClass}></i>
              <span className="skill-label">{skill.name}</span>
            </div>
            <span className="skill-percentage">{skill.level}</span>
          </div>
          <div className="skill-progress-track">
            <div
              className="skill-progress-fill"
              style={{ width: skill.level }}
            >
              <span className="skill-progress-glow"></span>
            </div>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        {/* Section 02: Work Experience & Education */}
        <section id="resume" className="glass-section">
          <div className="section-inner">
            {/* Section Header Badge */}
            <div className="section-pill-badge">
              <span className="pill-code">{"// 02"}</span>
              <span className="pill-text">Career & Experience</span>
            </div>

            {/* Work Experience */}
            <div className="resume-category-block">
              <div className="category-header">
                <div className="category-icon-box">
                  <i className="fa-solid fa-briefcase fa fa-briefcase"></i>
                </div>
                <div>
                  <h2 className="category-heading">Work Experience</h2>
                  <p className="category-subheading">My professional track record and industry roles</p>
                </div>
              </div>

              <div className="timeline-wrapper">
                <div className="timeline-spine"></div>
                {work}
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="resume-category-block">
              <div className="category-header">
                <div className="category-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <h2 className="category-heading">Education & Qualifications</h2>
                  <p className="category-subheading">Academic foundation and formal credentials</p>
                </div>
              </div>

              <div className="education-grid">
                {education}
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Technical Skills & Toolkit */}
        <section id="skills" className="glass-section">
          <div className="section-inner">
            <div className="section-pill-badge">
              <span className="pill-code">{"// 03"}</span>
              <span className="pill-text">Technical Toolkit</span>
            </div>

            <div className="category-header">
              <div className="category-icon-box">
                <i className="fa-solid fa-code fa fa-cogs"></i>
              </div>
              <div>
                <h2 className="category-heading">Technical Skills & Proficiencies</h2>
                <p className="category-subheading">Core technologies, frameworks, and modern development toolkit</p>
              </div>
            </div>

            <div className="skills-bento-grid">
              {skills}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Resume;
