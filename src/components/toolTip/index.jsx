import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

export const StyledTooltip = ({ title, children, display }) => {
    return (
        <Tooltip
            title={
                <div className='text-sm font-serif font-normal dark:text-gray-400'>
                    {title}
                </div>
            }
            arrow 
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        display:display,
                        backgroundColor: '#1F2937', 
                        color: '#FFFFFF', 
                        fontSize: '14px',
                        padding: '8px 12px', 
                        borderRadius: '8px',
                        border:"#1F2937",
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                    },
                },
                arrow: {
                    sx: {
                        color: '#1F2937', 
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

