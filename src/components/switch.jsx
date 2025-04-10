import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import useEditorStore from '../globalStore';

// Create a styled switch component with smaller dimensions
const StyledSwitch = styled(Switch)(({ theme, darkmode }) => ({
    width: 34,  // Reduced from 42
    height: 20, // Reduced from 26
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        paddingTop: 1,
        paddingLeft:1.5,
        margin: 1, // Reduced from 2
        transitionDuration: '200ms', // Slightly faster transition
        '&.Mui-checked': {
            transform: 'translateX(14px)', // Adjusted for new width
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: darkmode ? '#7C3AED' : '#2563EB',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: darkmode ? '#8B5CF6' : '#3B82F6',
            border: '4px solid #fff', // Reduced border size
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: darkmode ? '#4B5563' : '#E5E7EB',
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: darkmode ? 0.3 : 0.7,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 15.5, // Reduced from 22
        height: 15.5, // Reduced from 22
        backgroundColor: darkmode ? '#E5E7EB' : '#F9FAFB',
        boxShadow: darkmode
            ? '0 1px 3px 0 rgba(0,0,0,0.5)' // Lighter shadow
            : '0 1px 3px 0 rgba(0,0,0,0.1)',
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2, // Adjusted for new height
        backgroundColor: darkmode ? '#4B5563' : '#E5E7EB',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 300, // Slightly faster transition
        }),
    },
}));

// Main component that consumes the store
const ProfileSwitch = ({ checked, onChange, ...props }) => {
    const { darkMode } = useEditorStore();

    return (
        <StyledSwitch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            checked={checked}
            onChange={onChange}
            darkmode={darkMode}
            {...props}
        />
    );
};

export default ProfileSwitch;