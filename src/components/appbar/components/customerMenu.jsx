// menus/CustomerMenu.jsx
import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { FiMail, FiGithub } from "react-icons/fi";

const CustomerMenu = ({ anchorEl, isOpen, onClose, darkMode }) => {
    const teamMembers = [
        {
            name: "Guna Nihil N",
            email: "gunanihil3@gamil.com",
            github: "guna2341",
            role: "Frontend Developer"
        },
        {
            name: "Nithish Kumar S P",
            email: "nithishkumar@gmail.com",
            github: "Nithishkumarsp03",
            role: "Backend Developer"
        }
    ];

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
        onClose();
    };

    const handleGithubClick = (username) => {
        window.open(`https://github.com/${username}`, '_blank');
        onClose();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                    color: darkMode ? "#E5E7EB" : "#1F2937",
                    borderRadius: "12px",
                    border: darkMode ? "1px solid #4B5563" : "1px solid #E5E7EB",
                    boxShadow: darkMode
                        ? "0px 4px 6px -1px rgba(0, 0, 0, 0.5), 0px 2px 4px -1px rgba(0, 0, 0, 0.3)"
                        : "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    p: 2,
                    minWidth: "280px",
                    maxWidth: "320px"
                }
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <div className="px-2 py-1">
                <div className="mb-3">
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: darkMode ? "#F3F4F6" : "#111827",
                            fontSize: "0.875rem"
                        }}
                    >
                        Contact Our Team
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: darkMode ? "#9CA3AF" : "#6B7280",
                            fontSize: "0.75rem"
                        }}
                    >
                        Reach out to us for any questions or support
                    </Typography>
                </div>

                <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                        <TeamMember
                            key={index}
                            member={member}
                            darkMode={darkMode}
                            handleEmailClick={handleEmailClick}
                            handleGithubClick={handleGithubClick}
                        />
                    ))}
                </div>
            </div>
        </Menu>
    );
};

const TeamMember = ({ member, darkMode, handleEmailClick, handleGithubClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
        <div className="flex items-start justify-between mb-2">
            <div>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        color: darkMode ? "#E5E7EB" : "#1F2937",
                        fontSize: "0.8125rem"
                    }}
                >
                    {member.name}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: darkMode ? "#9CA3AF" : "#6B7280",
                        fontSize: "0.6875rem"
                    }}
                >
                    {member.role}
                </Typography>
            </div>
        </div>

        <div className="space-y-1">
            <MenuItem
                onClick={() => handleEmailClick(member.email)}
                sx={{
                    borderRadius: "6px",
                    fontSize: '0.75rem',
                    color: darkMode ? '#93C5FD' : '#1D4ED8',
                    padding: '6px 8px',
                    minHeight: 'auto',
                    '&:hover': {
                        backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(29, 78, 216, 0.05)'
                    }
                }}
            >
                <FiMail className="mr-2 h-3.5 w-3.5" />
                {member.email}
            </MenuItem>

            <MenuItem
                onClick={() => handleGithubClick(member.github)}
                sx={{
                    borderRadius: "6px",
                    fontSize: '0.75rem',
                    color: darkMode ? '#D8B4FE' : '#7E22CE',
                    padding: '6px 8px',
                    minHeight: 'auto',
                    '&:hover': {
                        backgroundColor: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(126, 34, 206, 0.05)'
                    }
                }}
            >
                <FiGithub className="mr-2 h-3.5 w-3.5" />
                github.com/{member.github}
            </MenuItem>
        </div>
    </div>
);

export default CustomerMenu;