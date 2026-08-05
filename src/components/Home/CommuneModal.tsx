import React from 'react';
import { Location } from '../../types/location';
import { X } from 'lucide-react';

interface CommuneModalProps {
  isOpen: boolean;
  communes: Location[];
  onClose: () => void;
  onSelectCommune: (commune: Location) => void;
}

export const CommuneModal: React.FC<CommuneModalProps> = ({
  isOpen,
  communes,
  onClose,
  onSelectCommune,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fadeIn">
      {/* Modal overlay background */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Bottom Sheet Container */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl max-h-[80vh] flex flex-col shadow-2xl z-10 animate-slideUp overflow-hidden">
        {/* Drag indicator bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3" />

        {/* Title bar */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">Chọn Phường / Xã</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of communes */}
        <div className="overflow-y-auto divide-y divide-slate-100 py-1">
          {communes.map((commune) => (
            <button
              key={commune.id}
              onClick={() => {
                onSelectCommune(commune);
                onClose();
              }}
              className="w-full text-left px-4 py-3 hover:bg-purple-50/50 active:bg-purple-100/50 transition-colors"
            >
              <div className="text-sm font-medium text-slate-800">{commune.name}</div>
              {commune.previousDistricts && commune.previousDistricts.length > 0 && (
                <div className="text-xs text-slate-500 mt-0.5">
                  ({commune.previousDistricts.join(', ')})
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
