'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { WebsiteSettings } from '@/types/cms';
import { AdminSwitch } from '@/components/admin/common/AdminSwitch';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sliders,
} from 'lucide-react';

export default function WebsiteSettingsPage() {
  const { settings, saveSettings, resetToFactoryDefaults } = useCMS();

  const [formState, setFormState] = useState<WebsiteSettings>(JSON.parse(JSON.stringify(settings)));
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(formState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Website Settings</h1>
          <p className="text-xs text-stone-500 mt-1">
            Institutional branding, master website switch, header/footer configuration, and design tokens
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 rounded border border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Master Website Switch (Section 16.2 & 16.3) */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-legal-700" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Master Website Visibility Switch
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Global kill-switch for the entire public-facing website. When turned off, the site goes into maintenance mode.
              </p>
            </div>

            <AdminSwitch
              checked={formState.isEnabled}
              onChange={(checked) => setFormState({ ...formState, isEnabled: checked })}
            />
          </div>

          {!formState.isEnabled && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Warning (Section 16.3):</strong> The master website switch is disabled. Public visitors will see the maintenance state. Individual page settings are preserved and will not be overwritten.
              </span>
            </div>
          )}
        </div>

        {/* General Branding (Section 17) */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            General Firm Identity
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Firm Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Institutional Tagline
              </label>
              <input
                type="text"
                value={formState.tagline}
                onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Firm Description
            </label>
            <textarea
              rows={2}
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
            />
          </div>
        </div>

        {/* Header & Footer Settings (Section 17) */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Header & Footer Configuration
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-900">Header Sticky Behavior</p>
                <p className="text-[11px] text-stone-500">Fixed at top of screen while scrolling</p>
              </div>
              <input
                type="checkbox"
                checked={formState.header.sticky}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    header: { ...formState.header, sticky: e.target.checked },
                  })
                }
                className="rounded text-legal-700 focus:ring-legal-700"
              />
            </div>

            <div className="pt-4 border-t border-stone-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={formState.footer.copyrightText}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    footer: { ...formState.footer, copyrightText: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Footer Address
                </label>
                <input
                  type="text"
                  value={formState.footer.address}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      footer: { ...formState.footer, address: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Footer Telephone
                </label>
                <input
                  type="text"
                  value={formState.footer.phone}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      footer: { ...formState.footer, phone: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded border border-stone-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Switches (Section 16.3 & 17) */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Module Feature Switches
          </h2>
          <p className="text-xs text-stone-500">
            Global switches act as gates. Disabling a feature retains all saved individual items.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs font-semibold text-stone-800">Legal Blog & Insights</span>
              <input
                type="checkbox"
                checked={formState.features.blog}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    features: { ...formState.features, blog: e.target.checked },
                  })
                }
                className="rounded text-legal-700"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs font-semibold text-stone-800">Client Intake Forms</span>
              <input
                type="checkbox"
                checked={formState.features.forms}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    features: { ...formState.features, forms: e.target.checked },
                  })
                }
                className="rounded text-legal-700"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Save All Settings
          </button>
        </div>
      </form>

      {/* Confirm Reset Modal */}
      <ConfirmModal
        isOpen={showConfirmReset}
        onClose={() => setShowConfirmReset(false)}
        onConfirm={() => {
          resetToFactoryDefaults();
          window.location.reload();
        }}
        title="Reset to Factory Demonstration State"
        description="This will restore all pages, sections, menus, media, and forms to the initial Vanguard & Sterling LLP demo configuration. Are you sure?"
        confirmLabel="Reset Everything"
        danger={true}
      />
    </div>
  );
}
