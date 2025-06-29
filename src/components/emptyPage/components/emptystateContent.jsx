import React from 'react';
import { EmptyStateIcon } from './emptystateIcon';
import { NoteCreationForm } from './notecreationForm';
import { InfoBox } from './infoBox';

export const EmptyStateContent = () => {
    return (
        <div className="relative z-10 text-center max-w-md px-4 py-8 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="mb-6">
                <EmptyStateIcon />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    No Notes Yet
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Create your first note to get started with your text editor.
                </p>
            </div>

            <NoteCreationForm
            />

            <InfoBox />
        </div>
    );
};

