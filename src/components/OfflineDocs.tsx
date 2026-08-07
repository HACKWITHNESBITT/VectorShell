import React, { useState } from 'react';
import { COMMAND_DOCS } from '../data/commandsData';
import { Search, HelpCircle, Terminal, Play, Shield, HardDrive, Bot, Cpu } from 'lucide-react';

export const OfflineDocs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'System', 'Security & Vault', 'USB & Files', 'Offline AI', 'Utilities'];

  const filteredDocs = COMMAND_DOCS.filter((item) => {
    const matchesSearch =
      item.command.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.example.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              <span>Offline Command Reference & Cheatsheet</span>
            </h2>
            <p className="text-sm text-slate-400">
              Complete reference for all built-in CLI commands in your USB script.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search command reference..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Command Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.command}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all space-y-3 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-400 text-base">{doc.command}</span>
                <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {doc.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{doc.description}</p>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 font-mono text-xs flex items-center justify-between text-slate-400 select-all">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-200">{doc.example}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
