import React from 'react';
import { RankRow } from './RankRow';

export function LeaderboardTable({ rows, scope }) {

    console.log("TABLE SCOPE:", scope);
    console.log("TABLE ROWS:", rows);

    return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm dark:shadow-2xl border border-neutral-200 dark:border-slate-800 overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-150 dark:divide-slate-800">
          <thead className="bg-neutral-50 dark:bg-slate-950/30">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-400 dark:text-slate-500 uppercase tracking-wider w-24"
              >
                Rank
              </th>
              <th 
                scope="col" 
                className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-400 dark:text-slate-500 uppercase tracking-wider"
              >
                {scope === 'individual' ? 'Player Name' : 'Branch Name'}
              </th>
              {scope === 'individual' && (
                <th 
                  scope="col" 
                  className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-400 dark:text-slate-500 uppercase tracking-wider"
                >
                  Branch
                </th>
              )}
              <th 
                scope="col" 
                className="px-6 py-3.5 text-right text-xs font-semibold text-neutral-400 dark:text-slate-500 uppercase tracking-wider w-32"
              >
                Score
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-neutral-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900/30">
            {rows.map((row) => (
              <RankRow key={row.name} row={row} scope={scope} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
