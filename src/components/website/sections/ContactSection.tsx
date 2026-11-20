'use client';

import React, { useState } from 'react';
import { ContactSectionContent, SectionSettings } from '@/types/cms';
import { useCMS } from '@/lib/cmsStore';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  content: ContactSectionContent;
  settings?: SectionSettings;
}

export const ContactSection: React.FC<ContactProps> = ({ content }) => {
  const { forms } = useCMS();
  const selectedForm = forms.find((f) => f.id === content.formId) || forms[0];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Office Registry Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {content.eyebrow && (
                <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
                  {content.eyebrow}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-legal-950 tracking-tight mb-4">
                {content.title || 'Manhattan Registry & Office'}
              </h2>
              {content.description && (
                <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
                  {content.description}
                </p>
              )}

              <div className="space-y-6 pt-4 border-t border-stone-200">
                {content.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center shrink-0 border border-legal-200">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Headquarters</p>
                      <p className="text-gray-900 font-medium mt-0.5">{content.address}</p>
                    </div>
                  </div>
                )}

                {content.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center shrink-0 border border-legal-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Telephone Inquiries</p>
                      <a href={`tel:${content.phone}`} className="text-legal-800 font-medium mt-0.5 hover:underline block">
                        {content.phone}
                      </a>
                    </div>
                  </div>
                )}

                {content.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center shrink-0 border border-legal-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">General Registrar</p>
                      <a href={`mailto:${content.email}`} className="text-legal-800 font-medium mt-0.5 hover:underline block">
                        {content.email}
                      </a>
                    </div>
                  </div>
                )}

                {content.officeHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center shrink-0 border border-legal-200">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Office Registry Hours</p>
                      <p className="text-gray-700 text-sm mt-0.5 leading-relaxed">{content.officeHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 p-4 rounded bg-[#fbfbfa] border border-stone-200 text-xs text-gray-600 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-legal-700 shrink-0 mt-0.5" />
              <span>
                All inquiries are processed under strict institutional discretion. No unsolicited communications establish an attorney-client relationship.
              </span>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-xl bg-[#fbfbfa] border border-stone-300 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-legal-950 mb-2">
                {selectedForm ? selectedForm.name : 'Confidential Inquiry'}
              </h3>
              {selectedForm?.description && (
                <p className="text-sm text-gray-600 mb-8 font-light">
                  {selectedForm.description}
                </p>
              )}

              {formSubmitted ? (
                <div className="p-8 text-center bg-legal-50 border border-legal-200 rounded-lg">
                  <CheckCircle2 className="w-12 h-12 text-legal-700 mx-auto mb-4" />
                  <h4 className="text-xl font-serif font-bold text-legal-950 mb-2">Inquiry Transmitted</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {selectedForm?.successMessage || 'Thank you. Your inquiry has been received by our registry.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({});
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-900 underline"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {selectedForm?.fields?.map((field) => (
                    <div key={field.id}>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-600">*</span>}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          rows={4}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full px-4 py-3 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-600 bg-white text-sm"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full px-4 py-3 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-600 bg-white text-sm"
                        >
                          <option value="">Select a matter classification...</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <div className="flex items-start gap-3 mt-2">
                          <input
                            type="checkbox"
                            id={field.id}
                            required={field.required}
                            checked={Boolean(formData[field.name])}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked ? 'true' : '' })}
                            className="mt-1 h-4 w-4 rounded border-stone-300 text-legal-700 focus:ring-legal-600"
                          />
                          <label htmlFor={field.id} className="text-xs text-gray-600 leading-relaxed">
                            {field.label}
                          </label>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full px-4 py-3 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-600 bg-white text-sm"
                        />
                      )}
                    </div>
                  ))}

                  {selectedForm?.privacyNotice && (
                    <div className="p-3 bg-stone-100 rounded text-xs text-gray-500 leading-relaxed border border-stone-200">
                      <strong>Legal Notice:</strong> {selectedForm.privacyNotice}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 rounded bg-legal-800 hover:bg-legal-700 text-white font-medium text-sm transition-colors tracking-wide shadow-md"
                  >
                    {selectedForm?.submitLabel || 'Transmit Confidential Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
