import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import useEditorStore from '../store/globalStore';

const StyledSwitch = styled(Switch)(({ theme, darkmode }) => ({
    width: 34.5,  
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 1.5,
        paddingTop: 1.3,
        margin: 1,
        transitionDuration: '200ms',
        '&.Mui-checked': {
            transform: 'translateX(14px)',
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
            border: '4px solid #fff',
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
        width: 16, 
        height: 15.5,
        backgroundColor: darkmode ? '#E5E7EB' : '#F9FAFB',
        boxShadow: darkmode
            ? '0 1px 3px 0 rgba(0,0,0,0.5)' 
            : '0 1px 3px 0 rgba(0,0,0,0.1)',
    },

    '& .MuiSwitch-track': {
        paddingTop:2,
        borderRadius: 20 / 2,
        backgroundColor: darkmode ? '#4B5563' : '#E5E7EB',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 300,
        }),
    },
}));

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