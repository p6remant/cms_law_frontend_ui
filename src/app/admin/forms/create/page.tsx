'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { FormDefinition, FormField } from '@/types/cms';
import { ArrowLeft, Save, Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function CreateFormPage() {
  const router = useRouter();
  const { saveForm } = useCMS();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitLabel, setSubmitLabel] = useState('Transmit Confidential Request');
  const [successMessage, setSuccessMessage] = useState('Thank you. Your inquiry has been securely delivered to our Managing Partner’s registry.');
  const [errorMessage, setErrorMessage] = useState('Unable to transmit inquiry. Please contact our Manhattan registry directly.');
  const [privacyNotice, setPrivacyNotice] = useState('Submission of this form does not establish an attorney-client relationship. Please do not submit confidential matter documents prior to formal execution of an engagement letter.');
  const [isVisible, setIsVisible] = useState(true);

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'f-1',
      name: 'fullName',
      label: 'Full Name / Enterprise Representative',
      type: 'text',
      placeholder: 'e.g. Katherine Hawthorne',
      required: true,
      order: 1,
    },
    {
      id: 'f-2',
      name: 'email',
      label: 'Corporate Email',
      type: 'email',
      placeholder: 'khawthorne@enterprise.com',
      required: true,
      order: 2,
    },
    {
      id: 'f-3',
      name: 'summary',
      label: 'Matter Overview',
      type: 'textarea',
      placeholder: 'Describe the nature of legal counsel sought...',
      required: true,
      order: 3,
    },
  ]);

  const handleAddField = () => {
    const newField: FormField = {
      id: `f-${Date.now()}`,
      name: `field_${fields.length + 1}`,
      label: `Field Label ${fields.length + 1}`,
      type: 'text',
      required: false,
      order: fields.length + 1,
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id).map((f, i) => ({ ...f, order: i + 1 })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newForm: FormDefinition = {
      id: `form-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      submitLabel: submitLabel.trim(),
      successMessage: successMessage.trim(),
      errorMessage: errorMessage.trim(),
      privacyNotice: privacyNotice.trim(),
      isVisible,
      createdAt: new Date().toISOString(),
      fields,
    };

    saveForm(newForm);
    router.push('/admin/forms');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link
          href="/admin/forms"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Forms</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Create Intake Form</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Form Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Appellate Case Assessment Intake"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-legal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Form Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
            />
          </div>

          {/* Form Fields Builder (Section 12) */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone-900">Configured Fields</h3>
              <button
                type="button"
                onClick={handleAddField}
                className="px-3 py-1.5 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
              >
                + Add Field
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((f, idx) => (
                <div key={f.id} className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-stone-200 text-stone-600 font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>

                  <div className="flex-1 grid sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Field Label"
                      value={f.label}
                      onChange={(e) => {
                        const updated = fields.map((item) =>
                          item.id === f.id ? { ...item, label: e.target.value } : item
                        );
                        setFields(updated);
                      }}
                      className="px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
                    />

                    <select
                      value={f.type}
                      onChange={(e) => {
                        const updated = fields.map((item) =>
                          item.id === f.id ? { ...item, type: e.target.value as any } : item
                        );
                        setFields(updated);
                      }}
                      className="px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
                    >
                      <option value="text">Text Field</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Number</option>
                      <option value="textarea">Paragraph Textarea</option>
                      <option value="select">Dropdown Select</option>
                      <option value="checkbox">Checkbox Confirmation</option>
                      <option value="date">Date</option>
                    </select>

                    <label className="flex items-center gap-2 text-xs text-stone-700">
                      <input
                        type="checkbox"
                        checked={f.required}
                        onChange={(e) => {
                          const updated = fields.map((item) =>
                            item.id === f.id ? { ...item, required: e.target.checked } : item
                          );
                          setFields(updated);
                        }}
                        className="rounded text-legal-700"
                      />
                      <span>Mandatory</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveField(f.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Confidentiality Notice (Section 12) */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-legal-700" />
              <span>Mandatory Legal Confidentiality & Disclaimer Notice</span>
            </h3>

            <div>
              <textarea
                rows={3}
                value={privacyNotice}
                onChange={(e) => setPrivacyNotice(e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-lg border border-stone-300"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Law firm intake forms must clearly disclose that submission does not establish an attorney-client relationship.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <Link href="/admin/forms" className="px-4 py-2 text-xs font-semibold uppercase text-stone-600">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Save Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
