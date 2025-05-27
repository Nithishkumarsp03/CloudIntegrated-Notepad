import React from 'react';
import GenderSelect from './genderSelect';
import SecuritySettings from './security';

const AdditionalSettingsStep = ({
    gender,
    onGenderChange,
    twoFa,
    onTwoFaChange,
    darkMode,
    isMobile
}) => {
    return (
        <div className="space-y-4 md:space-y-6">
            <GenderSelect
                value={gender}
                onChange={onGenderChange}
                darkMode={darkMode}
                isMobile={isMobile}
            />

            <SecuritySettings
                twoFa={twoFa}
                onTwoFaChange={onTwoFaChange}
                darkMode={darkMode}
                isMobile={isMobile}
            />
        </div>
    );
};

export default AdditionalSettingsStep;