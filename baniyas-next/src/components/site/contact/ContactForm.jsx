'use client';

import { useState } from 'react';

const MESSAGE_STYLES = {
  success: { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
  error: { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' },
};

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setMessage(null);
    setErrors({});
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.' });
        form.reset();
        setTimeout(() => setMessage(null), 5000);
      } else {
        setErrors(result.errors || {});
        setMessage({ type: 'error', text: result.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setSending(false);
    }
  }

  const fieldError = (name) => errors[name] && <small className="contact-field-error">{errors[name]}</small>;

  return (
    <div className="contact__area-form">
      <h4>Send Message</h4>
      <form id="contact-form" method="POST" onSubmit={handleSubmit} noValidate={false}>
        <div className="row">
          <div className="col-md-6 mb-25">
            <div className="contact__form-area-item">
              <input type="text" name="name" placeholder="Full Name" required minLength={2} maxLength={100} />
              {fieldError('name')}
            </div>
          </div>
          <div className="col-md-6 md-mb-25">
            <div className="contact__form-area-item">
              <input type="email" name="email" placeholder="Email Address" required maxLength={191} />
              {fieldError('email')}
            </div>
          </div>
          <div className="col-md-12 mb-25">
            <div className="contact__form-area-item">
              <input type="text" name="phone" placeholder="Phone Number" maxLength={20} pattern="[+0-9()\s\-]{6,20}" title="Digits, spaces, + ( ) - only" />
              {fieldError('phone')}
            </div>
          </div>
          <div className="col-md-12 mb-25">
            <div className="contact__form-area-item">
              <textarea name="message" placeholder="Message" maxLength={2000}></textarea>
              {fieldError('message')}
            </div>
          </div>
          <div className="col-md-12">
            <div className="contact__form-area-item">
              <button className="build_button" type="submit" disabled={sending}>
                {sending ? (
                  <>Sending... <i className="flaticon-loading"></i></>
                ) : (
                  <>Submit Message <i className="flaticon-right-up"></i></>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      {message && (
        <div
          className={`form-message ${message.type}`}
          style={{ padding: '15px', margin: '20px 0', borderRadius: '5px', fontWeight: 'bold', ...MESSAGE_STYLES[message.type] }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
