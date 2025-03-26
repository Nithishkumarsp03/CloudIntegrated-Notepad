import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

const StyledTooltip = ({ title, children, display }) => {
    return (
        <Tooltip
            title={
                <div className='text-sm font-serif font-normal dark:text-gray-400'>
                    {title}
                </div>
            }
            arrow // Add an arrow to the tooltip
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        display:display,
                        backgroundColor: '#1F2937', // Background color
                        color: '#FFFFFF', // Text color
                        fontSize: '14px', // Font size
                        padding: '8px 12px', // Padding
                        borderRadius: '8px', // Border radius
                        border:"#1F2937",
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for light mode
                    },
                },
                arrow: {
                    sx: {
                        color: '#1F2937', // Match tooltip background color
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

export default StyledTooltip;