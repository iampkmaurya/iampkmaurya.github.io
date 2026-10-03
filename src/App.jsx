import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {}
    };
  }

  getResumeData() {
    var self = this;
    var baseUrl = (import.meta && import.meta.env && import.meta.env.BASE_URL) || './';
    var targetUrl = `${baseUrl.replace(/\/$/, '')}/resumeData.json`;

    $.ajax({
      url: targetUrl,
      dataType: 'json',
      cache: false,
      success: function (data) {
        self.setState({ resumeData: data });
      },
      error: function () {
        // Fallback to relative path if hosted on subdirectory or custom domain
        $.ajax({
          url: 'resumeData.json',
          dataType: 'json',
          cache: false,
          success: function (data) {
            self.setState({ resumeData: data });
          },
          error: function (err2) {
            console.error('Failed to load resumeData.json:', err2);
          }
        });
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    var data = this.state.resumeData;
    var main = data.main;
    var about = data.about;
    var resume = data.resume;
    var contact = data.contact;

    return (
      <div className="App">
        {/* Dynamic Ambient Glowing Backdrop Orbs */}
        <div className="ambient-orb orb-cyan" aria-hidden="true"></div>
        <div className="ambient-orb orb-purple" aria-hidden="true"></div>
        <div className="ambient-orb orb-blue" aria-hidden="true"></div>
        <div className="ambient-orb orb-indigo" aria-hidden="true"></div>
        <div className="ambient-grid-overlay" aria-hidden="true"></div>

        {main && <Header data={main} />}
        {main && <About data={main} aboutData={about} />}
        {resume && <Resume data={resume} />}
        {main && <Contact data={main} contactData={contact} />}
        {main && <Footer data={main} />}
      </div>
    );
  }
}

export default App;
