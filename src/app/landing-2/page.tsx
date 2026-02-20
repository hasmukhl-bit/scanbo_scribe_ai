"use client";

/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Link from "next/link";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./landing-2.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700", "800"] });

const faqs = [
  {
    q: "How accurate is Scanbo Scribe AI's medical transcription?",
    a: "Scanbo Scribe AI is trained for medical terminology, procedures, and clinical conversations. You can review and edit before finalizing notes."
  },
  {
    q: "Is my patient data secure and HIPAA compliant?",
    a: "Yes. Data is encrypted in transit and at rest, with compliance-focused infrastructure and strict privacy controls."
  },
  {
    q: "Does Scanbo Scribe AI integrate with my existing EMR/EHR system?",
    a: "You can export generated notes into your workflow, and integration support is available for major systems."
  },
  {
    q: "How long does it take to generate a clinical note?",
    a: "Most clinical notes are generated in under 60 seconds after the conversation ends."
  },
  {
    q: "What's included in the free plan?",
    a: "The free plan includes 3 recording uploads with access to core summarization and extraction features."
  }
];

export default function LandingPageTwo() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <main className={`landing2 ${dmSans.className}`}>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <span className={`logo-text ${playfair.className}`}>Scanbo Scribe AI</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-secondary">
              Book Demo
            </Link>
            <Link href="/start-consult" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">✨ AI-Powered Medical Documentation</div>
            <h1 className={playfair.className}>
              More Time for <span className="gradient-text">Patients</span>,
              <br />
              Less Time on <span className="gradient-text">Paperwork</span>
            </h1>
            <p className="hero-description">
              Scanbo Scribe AI transforms doctor-patient conversations into comprehensive medical notes instantly.
              Powered by advanced AI, we help clinicians save up to 3 hours daily on documentation.
            </p>
            <div className="cta-buttons">
              <Link href="/start-consult" className="btn btn-primary btn-large">
                Get Started Free
              </Link>
              <a href="#how-it-works" className="btn btn-secondary btn-large">
                Watch Demo
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">3hrs</div>
                <div className="stat-label">Saved Daily</div>
              </div>
              <div className="stat">
                <div className="stat-number">99%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat">
                <div className="stat-number">5k+</div>
                <div className="stat-label">Clinicians</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <div className="recording-section">
                <h3 className="recording-title">We write the notes while you see the patient.</h3>
                <p className="recording-subtitle">
                  Upload or record your patient-doctor conversation. We generate a PDF summary with key findings,
                  assessment, and plan.
                </p>
                <div className="microphone-container">
                  <div className="microphone-circle">
                    <div className="microphone-icon">🎙️</div>
                    <div className="recording-dot" />
                  </div>
                </div>
                <div className="recording-buttons">
                  <Link href="/start-consult" className="record-btn record-btn-primary">
                    Start Recording
                  </Link>
                  <Link href="/start-consult" className="record-btn record-btn-secondary">
                    Upload Audio
                  </Link>
                </div>
                <div className="upload-info">Free trial includes 3 uploads - No credit card required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <div className="section-badge">Why Choose ScanboScribe</div>
          <h2 className={`section-title ${playfair.className}`}>
            AI That Works
            <br />
            With You, Not For You
          </h2>
          <p className="section-description">
            Our intelligent platform understands medical terminology, specialties, and workflows to deliver accurate,
            contextual documentation that fits seamlessly into your practice.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎙️</div>
            <h3 className="feature-title">Real-Time Transcription</h3>
            <p className="feature-description">
              Capture every detail of patient conversations with medical-grade accuracy.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3 className="feature-title">Intelligent Data Extraction</h3>
            <p className="feature-description">
              Automatically extracts symptoms, diagnoses, medications, vitals, labs, and plans.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Comprehensive Vital Signs</h3>
            <p className="feature-description">
              Captures blood pressure, heart rate, BMI, body temperature, and respiratory rate.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3 className="feature-title">Medication Management</h3>
            <p className="feature-description">
              Identifies medication names, dosages, and frequencies from conversations.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Follow-up Tracking</h3>
            <p className="feature-description">
              Tracks follow-up appointments, lab tests, and treatment milestones automatically.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">HIPAA Compliant</h3>
            <p className="feature-description">
              Healthcare-grade security and compliance to protect patient data at all times.
            </p>
          </div>
        </div>
      </section>

      <section className="extract-section">
        <div className="extract-container">
          <div className="section-header">
            <div className="section-badge dark">Comprehensive Data Extraction</div>
            <h2 className={`section-title ${playfair.className} white`}>Every Detail, Perfectly Organized</h2>
            <p className="section-description white-soft">
              Scanbo Scribe AI extracts and structures critical clinical information from your conversations.
            </p>
          </div>
          <div className="extract-grid">
            <div className="extract-category">
              <div className="extract-icon">🩺</div>
              <h3>Clinical Assessment</h3>
              <ul>
                <li>Symptoms & Chief Complaints</li>
                <li>Diagnosis & Differential Diagnosis</li>
                <li>Treatment Plans & Recommendations</li>
              </ul>
            </div>
            <div className="extract-category">
              <div className="extract-icon">💊</div>
              <h3>Medications</h3>
              <ul>
                <li>Medication Names</li>
                <li>Dosage Information</li>
                <li>Frequency & Duration</li>
              </ul>
            </div>
            <div className="extract-category">
              <div className="extract-icon">❤️</div>
              <h3>Vital Signs</h3>
              <ul>
                <li>Blood Pressure</li>
                <li>Heart Rate</li>
                <li>Body Temperature</li>
              </ul>
            </div>
            <div className="extract-category">
              <div className="extract-icon">🔬</div>
              <h3>Lab & Follow-ups</h3>
              <ul>
                <li>Lab Reports & Results</li>
                <li>Follow-up Appointments</li>
                <li>Scheduled Tests</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <div className="section-badge dark">Simple Process</div>
          <h2 className={`section-title ${playfair.className} white`}>
            From Conversation to Documentation
            <br />
            in Three Easy Steps
          </h2>
          <p className="section-description white-soft">
            Focus on your patients while Scanbo Scribe AI handles the paperwork.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <div className={`step-number ${playfair.className}`}>1</div>
            <h3 className="step-title">Record</h3>
            <p className="step-description">Start recording with one click and capture the full conversation.</p>
          </div>
          <div className="step">
            <div className={`step-number ${playfair.className}`}>2</div>
            <h3 className="step-title">Process</h3>
            <p className="step-description">AI extracts key medical information and structures the note.</p>
          </div>
          <div className="step">
            <div className={`step-number ${playfair.className}`}>3</div>
            <h3 className="step-title">Review</h3>
            <p className="step-description">Review and export your final documentation in under 60 seconds.</p>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="trust-container">
          <div className="section-header">
            <div className="section-badge">Trusted by Healthcare Professionals</div>
            <h2 className={`section-title ${playfair.className}`}>
              Results That Speak
              <br />
              For Themselves
            </h2>
            <p className="section-description">Join thousands of clinicians using Scanbo Scribe AI.</p>
          </div>
          <div className="metrics">
            <div className="metric-card">
              <div className={`metric-value ${playfair.className}`}>3.2hrs</div>
              <div className="metric-label">Average time saved per day</div>
            </div>
            <div className="metric-card">
              <div className={`metric-value ${playfair.className}`}>99.2%</div>
              <div className="metric-label">Documentation accuracy</div>
            </div>
            <div className="metric-card">
              <div className={`metric-value ${playfair.className}`}>5,000+</div>
              <div className="metric-label">Active clinicians</div>
            </div>
            <div className="metric-card">
              <div className={`metric-value ${playfair.className}`}>98%</div>
              <div className="metric-label">Customer satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <div className="section-badge">What Doctors Say</div>
          <h2 className={`section-title ${playfair.className}`}>
            Loved by Clinicians
            <br />
            Around the World
          </h2>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              "ScanboScribe has transformed my practice. I finish notes before leaving the office and have more time
              for family."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">DR</div>
              <div className="author-info">
                <h4>Dr. Sarah Mitchell</h4>
                <p>Cardiologist, Boston Medical Center</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              "The accuracy is incredible and it handles medical terminology and conversation nuance very well."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">AK</div>
              <div className="author-info">
                <h4>Dr. Aditya Kumar</h4>
                <p>Pediatric Surgeon, Apollo Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="faq-container">
          <div className="section-header">
            <div className="section-badge">FAQ</div>
            <h2 className={`section-title ${playfair.className}`}>Frequently Asked Questions</h2>
            <p className="section-description">Everything you need to know about Scanbo Scribe AI.</p>
          </div>
          <div className="faq-list">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className={`faq-item ${isOpen ? "active" : ""}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(isOpen ? -1 : idx)} type="button">
                    <span>{item.q}</span>
                    <div className="faq-icon">+</div>
                  </button>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-section" id="demo">
        <div className="cta-content">
          <h2 className={`cta-title ${playfair.className}`}>
            Ready to Transform
            <br />
            Your Practice?
          </h2>
          <p className="cta-description">
            Join clinicians who&apos;ve reclaimed their time. Get started with 3 free recordings today.
          </p>
          <div className="cta-buttons-large">
            <Link href="/start-consult" className="btn btn-accent btn-large">
              Get 3 Free Recordings
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-large cta-outline">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-container">
          <div className="footer-brand">
            <span className={`logo-text footer-logo ${playfair.className}`}>Scanbo Scribe AI</span>
            <p className="footer-description">
              AI-powered medical documentation that helps clinicians save time and focus on patient care.
            </p>
          </div>
          <div className="footer-column">
            <h3>Product</h3>
            <ul className="footer-links">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/integrations">Integrations</Link>
              </li>
              <li>
                <Link href="/security">Security</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul className="footer-links">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li>
                <Link href="/support">Support</Link>
              </li>
              <li>
                <Link href="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/security">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Scanbo Scribe AI. All rights reserved. HIPAA Compliant.</p>
        </div>
      </footer>
    </main>
  );
}
