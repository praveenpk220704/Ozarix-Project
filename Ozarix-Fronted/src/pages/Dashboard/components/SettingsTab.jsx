import React from 'react';
import Button from '../../../components/common/Button';

const SettingsTab = () => {
  return (
    <div className="glassmorphism rounded-xl border border-white/5 p-6 space-y-6 text-left">
      <div className="border-b border-white/5 pb-4">
        <h3 className="font-heading font-bold text-white text-lg">System Configuration</h3>
        <p className="text-xs text-slate-400 mt-1">Manage API integrations nodes, security keys, and admin profiles.</p>
      </div>

      <div className="space-y-6 max-w-xl">
        {/* Setting block 1 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-200">API Access Endpoint</h4>
          <input
            type="text"
            disabled
            value="https://api.ozarix.tech/v1/gateway"
            className="w-full px-4 py-2.5 rounded-lg bg-brand-space-900 border border-white/10 text-slate-400 text-sm focus:outline-none focus:border-brand-orange"
          />
          <span className="text-[10px] text-slate-500 block">Gateway for connecting external clients records dashboards.</span>
        </div>

        {/* Setting block 2 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-200">Webhook Sync Intervals</h4>
          <select
            className="w-full px-4 py-2.5 rounded-lg bg-brand-space-900 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-brand-orange cursor-pointer"
          >
            <option>Real-Time Push</option>
            <option>Every 5 Minutes</option>
            <option>Every 1 Hour</option>
          </select>
          <span className="text-[10px] text-slate-500 block">Interval settings to pull notifications updates.</span>
        </div>

        {/* Action save */}
        <div className="pt-4 border-t border-white/5">
          <Button variant="primary" onClick={() => alert('Settings saved successfully.')}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
