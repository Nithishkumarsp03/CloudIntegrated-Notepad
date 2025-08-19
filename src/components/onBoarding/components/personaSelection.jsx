import React from 'react';
import { cn } from '../../cn';
import PersonaCard from './personaCard';
import PersonaSkeletonCard from './personaSkeleton';

const PersonaSelectionStep = ({
    personas,
    selectedPersona,
    onPersonaSelect,
    isLoading,
    darkMode,
    isMobile
}) => {
    const skeletonCount = isMobile ? 3 : 4;

    if (isLoading) {
        return (
            <div className={cn(
                isMobile && "max-h-[40vh] overflow-y-auto overflow-x-hidden pb-2 -mx-2 px-2"
            )}>
                <div className={cn(
                    "grid gap-3",
                    isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                )}>
                    {Array(skeletonCount).fill(0).map((_, index) => (
                        <PersonaSkeletonCard
                            key={`skeleton-${index}`}
                            darkMode={darkMode}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            isMobile && "max-h-[40vh] overflow-y-auto overflow-x-hidden pb-2 -mx-2 px-2"
        )}>
            <div className={cn(
                "grid gap-3",
                isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            )}>
                {personas?.map((persona) => (
                    <PersonaCard
                        key={persona.id}
                        persona={persona}
                        isSelected={selectedPersona?.id === persona.id}
                        onSelect={onPersonaSelect}
                        darkMode={darkMode}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </div>
    );
};

export default PersonaSelectionStep;