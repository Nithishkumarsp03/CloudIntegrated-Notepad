import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import useEditorStore from '../../store/globalStore';

export const StyledTooltip = ({ title, children, display }) => {
    const darkMode = useEditorStore(e => e.darkMode);
    const tooltipStyles = darkMode
        ? {
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            border: '0.5px solid #394151',
        }
        : {
            backgroundColor: '#FFFFFF',
            color: '#1F2937',
            border: '0.5px solid #E5E7EB',
        };

    const arrowColor = darkMode ? '#1F2937' : '#FFFFFF';
    const textColorClass = darkMode ? 'dark:text-gray-400' : 'text-gray-700';

    return (
        <Tooltip
            title={
                <div className={`text-sm font-serif font-normal ${textColorClass}`}>
                    {title}
                </div>
            }
            arrow
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        display: display,
                        backgroundColor: tooltipStyles.backgroundColor,
                        color: tooltipStyles.color,
                        fontSize: '14px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: tooltipStyles.border,
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
                    },
                },
                arrow: {
                    sx: {
                        color: arrowColor,
                        '&::before': {
                            border: darkMode ? '1px solid #394151' : '0.5px solid #E5E7EB',
                        }
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};