import React from 'react'
import { ButtonComponent } from '../../../components';
import { Facebook, Google } from '@mui/icons-material';
import useEditorStore from '../../../store/globalStore';

export const LoginButton = ({ handleGoogle, handleFacobook }) => {
    const darkMode = useEditorStore(e => e.darkMode);

    return (
        <div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <ButtonComponent
                    type='button'
                    btnText={'Google'}
                    startIcon={<Google />}
                    darkMode={darkMode}
                    styles={{
                        width: "100%",
                        backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(219, 234, 254, 0.8)',
                        color: darkMode ? 'rgb(233, 213, 255)' : '#3b82f6',
                        borderColor: darkMode ? 'rgba(107, 114, 128, 0.4)' : 'rgba(147, 197, 253, 0.8)',
                        '&:hover': {
                            backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.3)' : 'rgba(219, 234, 254, 1)',
                            borderColor: darkMode ? 'rgba(107, 114, 128, 0.6)' : 'rgba(147, 197, 253, 1)',
                        }
                    }}
                />
                <ButtonComponent
                    type='button'
                    btnText={'Facebook'}
                    startIcon={<Facebook />}
                    darkMode={darkMode}
                    styles={{
                        width: "100%",
                        backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(219, 234, 254, 0.8)  ',
                        color: darkMode ? 'rgb(233, 213, 255)' : '#3b82f6',
                        borderColor: darkMode ? 'rgba(107, 114, 128, 0.4)' : 'rgba(147, 197, 253, 0.8)',
                        '&:hover': {
                            backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.3)' : 'rgba(219, 234, 254, 1)',
                            borderColor: darkMode ? 'rgba(107, 114, 128, 0.6)' : 'rgba(147, 197, 253, 1)',
                        }
                    }}
                />
            </div>
        </div>
    )
}               