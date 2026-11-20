'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { FormDefinition, FormField } from '@/types/cms';
import { ArrowLeft, Save, Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function EditFormPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params?.id as string;

  const { forms, saveForm, isLoaded } = useCMS();
  const [form, setForm] = useState<FormDefinition | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const found = forms.find((f) => f.id === formId);
      if (found) {
        setForm(JSON.parse(JSON.stringify(found)));
      }
    }
  }, [isLoaded, formId, forms]);

  if (!isLoaded || !form) {
    return <div className="py-24 text-center">Loading form builder...</div>;
  }

  const handleAddField = () => {
    const newField: FormField = {
      id: `f-${Date.now()}`,
      name: `field_${form.fields.length + 1}`,
      label: `Field Label ${form.fields.length + 1}`,
      type: 'text',
      required: false,
      order: form.fields.length + 1,
    };
    setForm({ ...form, fields: [...form.fields, newField] });
  };

  const handleRemoveField = (id: string) => {
    setForm({
      ...form,
      fields: form.fields.filter((f) => f.id !== id).map((f, i) => ({ ...f, order: i + 1 })),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveForm(form);
    router.push('/admin/forms');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/forms"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Forms</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-stone-900">{form.name}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Form Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-legal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Description
            </label>
            <textarea
              rows={2}
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
            />
          </div>

          {/* Fields */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone-900">Fields ({form.fields.length})</h3>
              <button
                type="button"
                onClick={handleAddField}
                className="px-3 py-1.5 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
              >
                + Add Field
              </button>
            </div>

            <div className="space-y-3">
              {form.fields.map((f, idx) => (
                <div key={f.id} className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-stone-200 text-stone-600 font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>

                  <div className="flex-1 grid sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={f.label}
                      onChange={(e) => {
                        const updated = form.fields.map((item) =>
                          item.id === f.id ? { ...item, label: e.target.value } : item
                        );
                        setForm({ ...form, fields: updated });
                      }}
                      className="px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
                    />

                    <select
                      value={f.type}
                      onChange={(e) => {
                        const updated = form.fields.map((item) =>
                          item.id === f.id ? { ...item, type: e.target.value as any } : item
                        );
                        setForm({ ...form, fields: updated });
                      }}
                      className="px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
                    >
                      <option value="text">Text Field</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Number</option>
                      <option value="textarea">Paragraph Textarea</option>
                      <option value="select">Dropdown Select</option>
                      <option value="checkbox">Checkbox Confirmation</option>
                    </select>

                    <label className="flex items-center gap-2 text-xs text-stone-700">
                      <input
                        type="checkbox"
                        checked={f.required}
                        onChange={(e) => {
                          const updated = form.fields.map((item) =>
                            item.id === f.id ? { ...item, required: e.target.checked } : item
                          );
                          setForm({ ...form, fields: updated });
                        }}
                        className="rounded text-legal-700"
                      />
                      <span>Required</span>
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

          {/* Legal Notice */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-legal-700" />
              <span>Mandatory Legal Notice</span>
            </h3>

            <textarea
              rows={3}
              value={form.privacyNotice}
              onChange={(e) => setForm({ ...form, privacyNotice: e.target.value })}
              className="w-full px-4 py-2 text-xs rounded-lg border border-stone-300"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700">
              <input
                type="checkbox"
                checked={form.isVisible}
                onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
                className="rounded text-legal-700"
              />
              <span>Form Visible</span>
            </label>

            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
