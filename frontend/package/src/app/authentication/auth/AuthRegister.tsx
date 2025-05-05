import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { authAPI } from '@/utils/api';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset messages
        setError('');
        setSuccess('');
        
        // Validate inputs
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }
        
        setIsLoading(true);
        
        try {
            await authAPI.register(name, email, password);
            
            setSuccess('Registration successful! Redirecting to login...');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                router.push('/authentication/login');
            }, 2000);
            
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <Box>
                <form onSubmit={handleRegister}>
                    <Stack mb={3}>
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                        <CustomTextField 
                            id="name" 
                            variant="outlined" 
                            fullWidth 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                        <CustomTextField 
                            id="email" 
                            variant="outlined" 
                            fullWidth 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                        <CustomTextField 
                            id="password" 
                            type="password"
                            variant="outlined" 
                            fullWidth 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Stack>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        size="large" 
                        fullWidth
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
