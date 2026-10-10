'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Heart, 
  Mail, 
  Lock, 
  User, 
  KeyRound, 
  ShieldCheck, 
  LogOut, 
  Copy, 
  Check, 
  ArrowRight, 
  X,
  Users,
  Share2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Key
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  partnerNickname?: string | null;
  avatar?: string | null;
}

interface CoupleSpaceData {
  id: string;
  name: string;
  inviteCode: string;
}

interface CoupleAuthHeaderProps {
  currentUser: UserData | null;
  partner: UserData | null;
  coupleSpace: CoupleSpaceData | null;
  onAuthChange: () => void;
}

export const CoupleAuthHeader: React.FC<CoupleAuthHeaderProps> = ({
  currentUser,
  partner,
  coupleSpace,
  onAuthChange
}) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'login' | 'register' | 'profile'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regInviteCode, setRegInviteCode] = useState('');
  const [regStep, setRegStep] = useState<'form' | 'otp'>('form');
  const [regOtpCode, setRegOtpCode] = useState('');
  const [otpNotification, setOtpNotification] = useState<{ code: string; email: string } | null>(null);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  // Show demo toggle
  const [showDemoLogins, setShowDemoLogins] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = () => {
    setTab(currentUser ? 'profile' : 'login');
    setLoginError('');
    setRegError('');
    setRegSuccess('');
    setRegStep('form');
    setRegOtpCode('');
    setIsOpen(true);
  };

  const handleLogin = async (emailToUse?: string, passToUse?: string) => {
    const e = emailToUse || loginEmail;
    const p = passToUse || loginPassword;
    if (!e || !p) {
      setLoginError('Please enter both your email and password');
      return;
    }

    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: e, password: p })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Always remember account in localStorage
      if (data.token) {
        localStorage.setItem('our_weekend_couple_token', data.token);
        localStorage.setItem('our_weekend_couple_user', JSON.stringify(data.user));
      }

      onAuthChange();
      setIsOpen(false);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  // Step 1: Request OTP code to user's email
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setRegError('Please provide your name, email, and password.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please verify both passwords match.');
      return;
    }

    setRegLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail.trim(), name: regName.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code');
      }

      setOtpNotification({ code: data.otpPreview, email: regEmail.trim() });
      setRegStep('otp');
      setRegSuccess(`A 6-digit confirmation code has been dispatched to ${regEmail.trim()}!`);
    } catch (err: any) {
      setRegError(err.message || 'Failed to dispatch verification code');
    } finally {
      setRegLoading(false);
    }
  };

  // Step 2: Verify OTP and complete account creation
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regOtpCode || regOtpCode.trim().length !== 6) {
      setRegError('Please enter the 6-digit verification code.');
      return;
    }

    setRegLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          confirmPassword: regConfirmPassword,
          otpCode: regOtpCode.trim(),
          inviteCode: regInviteCode.trim() || undefined
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Always remember account in localStorage
      if (data.token) {
        localStorage.setItem('our_weekend_couple_token', data.token);
        localStorage.setItem('our_weekend_couple_user', JSON.stringify(data.user));
      }

      onAuthChange();
      setIsOpen(false);
    } catch (err: any) {
      setRegError(err.message || 'Registration failed');
    } finally {
      setRegLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('our_weekend_couple_token');
      localStorage.removeItem('our_weekend_couple_user');
      onAuthChange();
      setIsOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareWhatsApp = (code: string) => {
    const text = `Hey! Join our private couple date planner on Our Weekend Addis! 💕 Our Couple Code is: ${code}\n\nSign up and enter this code to connect with me in real time: ${typeof window !== 'undefined' ? window.location.origin : ''}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Portal Modal Content attached directly to document.body
  const modalPortal = isOpen && mounted && typeof document !== 'undefined' ? createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'rgba(5, 7, 13, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#111522',
          borderRadius: '24px',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(244, 63, 94, 0.2)',
          padding: '24px 22px',
          color: '#fff',
          position: 'relative',
          margin: 'auto',
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button (X) */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)'
            }}
          >
            <Heart size={22} color="#fff" fill="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {currentUser
                ? `${coupleSpace?.name || 'Our Couple Space'}`
                : tab === 'login'
                ? 'Welcome Back'
                : regStep === 'otp'
                ? 'Verify Your Email'
                : 'Create Couple Account'}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
              {currentUser
                ? `Logged in as ${currentUser.name}`
                : tab === 'login'
                ? 'Sign in to access your shared plans'
                : regStep === 'otp'
                ? 'Enter the 6-digit code sent to your email'
                : 'Create a shared space for you and your partner'}
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs (Sign In / Create Account / My Space) */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '3px',
            marginBottom: '16px'
          }}
        >
          <button
            type="button"
            onClick={() => { setTab('login'); setLoginError(''); setRegError(''); }}
            style={{
              flex: 1,
              padding: '7px 8px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: tab === 'login' ? 'var(--rose-500)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: tab === 'login' ? '0 2px 8px rgba(244, 63, 94, 0.35)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setRegStep('form'); setLoginError(''); setRegError(''); }}
            style={{
              flex: 1,
              padding: '7px 8px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: tab === 'register' ? 'var(--rose-500)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: tab === 'register' ? '0 2px 8px rgba(244, 63, 94, 0.35)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            Create Account
          </button>
          {currentUser && (
            <button
              type="button"
              onClick={() => setTab('profile')}
              style={{
                flex: 1,
                padding: '7px 8px',
                borderRadius: '9px',
                border: 'none',
                backgroundColor: tab === 'profile' ? 'var(--rose-500)' : 'transparent',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: tab === 'profile' ? '0 2px 8px rgba(244, 63, 94, 0.35)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Users size={12} /> My Space
            </button>
          )}
        </div>

        {/* TAB 1: SIGN IN */}
        {tab === 'login' && (
          <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {currentUser && (
              <div
                style={{
                  padding: '7px 11px',
                  borderRadius: '9px',
                  backgroundColor: 'rgba(52, 211, 153, 0.1)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.74rem',
                  color: '#34d399'
                }}
              >
                <span>Active: <strong>{currentUser.name}</strong></span>
                <button
                  type="button"
                  onClick={() => setTab('profile')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.72rem'
                  }}
                >
                  View Space
                </button>
              </div>
            )}

            {loginError && (
              <div
                style={{
                  padding: '9px 12px',
                  borderRadius: '9px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontSize: '0.76rem'
                }}
              >
                {loginError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '5px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 34px',
                    borderRadius: '9px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.86rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <Mail size={15} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '5px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 34px',
                    borderRadius: '9px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.86rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <Lock size={15} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                padding: '11px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(244, 63, 94, 0.4)',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loginLoading ? 'Signing In…' : 'Sign In to Couple Space'}
              <ArrowRight size={15} />
            </button>

            {/* Quick Demo Helper */}
            <div style={{ marginTop: '4px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setShowDemoLogins(!showDemoLogins)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.45)',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {showDemoLogins ? 'Hide demo accounts' : 'Need a test couple preview? Click here'}
              </button>

              {showDemoLogins && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleLogin('abeba@ourweekend.app', 'love123')}
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: '#fff',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Abeba 👩
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLogin('yohannes@ourweekend.app', 'love123')}
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: '#fff',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Yohannes 👨
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {/* TAB 2: CREATE REAL ACCOUNT */}
        {tab === 'register' && (
          <div>
            {/* Error Message Display */}
            {regError && (
              <div
                style={{
                  padding: '9px 12px',
                  borderRadius: '9px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontSize: '0.76rem',
                  marginBottom: '10px'
                }}
              >
                {regError}
              </div>
            )}

            {/* Success / OTP Message Banner */}
            {regSuccess && (
              <div
                style={{
                  padding: '9px 12px',
                  borderRadius: '9px',
                  backgroundColor: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid rgba(52, 211, 153, 0.35)',
                  color: '#34d399',
                  fontSize: '0.76rem',
                  marginBottom: '10px'
                }}
              >
                {regSuccess}
              </div>
            )}

            {/* Live OTP Notification Card */}
            {otpNotification && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.35)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 15px rgba(244, 63, 94, 0.15)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#fecdd3', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mail size={12} /> Code sent to {otpNotification.email}:
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '0.15em' }}>
                    {otpNotification.code}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRegOtpCode(otpNotification.code)}
                  style={{
                    backgroundColor: 'rgba(244, 63, 94, 0.3)',
                    border: '1px solid #f43f5e',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Autofill Code
                </button>
              </div>
            )}

            {/* STEP 1: Registration Form with Password Confirmation */}
            {regStep === 'form' ? (
              <form
                onSubmit={handleRequestOtp}
                style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '4px' }}>
                    Your Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="e.g. Amen or Yohannes"
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#fff',
                        fontSize: '0.84rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <User size={15} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="amendemeke09@gmail.com"
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#fff',
                        fontSize: '0.84rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Mail size={15} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '4px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#fff',
                        fontSize: '0.84rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Lock size={15} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Confirm Password
                    </label>
                    {regConfirmPassword && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: regPassword === regConfirmPassword ? '#34d399' : '#f87171',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        {regPassword === regConfirmPassword ? (
                          <>
                            <CheckCircle2 size={11} /> Passwords match
                          </>
                        ) : (
                          <>
                            <AlertCircle size={11} /> Passwords do not match
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={e => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: regConfirmPassword
                          ? regPassword === regConfirmPassword
                            ? '1px solid rgba(52, 211, 153, 0.5)'
                            : '1px solid rgba(239, 68, 68, 0.5)'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#fff',
                        fontSize: '0.84rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Key size={15} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '4px' }}>
                    Partner&apos;s Couple Code (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={regInviteCode}
                      onChange={e => setRegInviteCode(e.target.value.toUpperCase())}
                      placeholder="Leave blank to generate a new space code"
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#fff',
                        fontSize: '0.84rem',
                        outline: 'none',
                        letterSpacing: '0.04em',
                        boxSizing: 'border-box'
                      }}
                    />
                    <KeyRound size={15} color="var(--rose-400)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  <span style={{ fontSize: '0.67rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '2px', display: 'block' }}>
                    If your partner already registered, enter their code here to pair up instantly!
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  style={{
                    padding: '11px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(244, 63, 94, 0.4)',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {regLoading ? 'Sending Verification Code…' : 'Send Email Verification Code (OTP) 📩'}
                  <ArrowRight size={15} />
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.70rem',
                    color: '#34d399',
                    marginTop: '1px'
                  }}
                >
                  <ShieldCheck size={12} />
                  <span>Real-time sync enabled • Secure email verification</span>
                </div>
              </form>
            ) : (
              /* STEP 2: Enter Verification Code (OTP) */
              <form
                onSubmit={handleVerifyAndRegister}
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{ textAlign: 'center', padding: '6px 0' }}>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px' }}>
                    Enter the 6-digit confirmation code sent to:
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f43f5e' }}>
                    {regEmail}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px', textAlign: 'center' }}>
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={regOtpCode}
                    onChange={e => setRegOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.07)',
                      border: '2px solid rgba(244, 63, 94, 0.5)',
                      color: '#fff',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      textAlign: 'center',
                      letterSpacing: '0.3em',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(244, 63, 94, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {regLoading ? 'Verifying & Creating…' : 'Verify & Create Couple Space ✨'}
                  <Check size={16} />
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => handleRequestOtp()}
                    disabled={regLoading}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={12} /> Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRegStep('form'); setRegError(''); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    ← Edit Details
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: COUPLE SPACE PROFILE */}
        {tab === 'profile' && currentUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                backgroundColor: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: '14px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#fecdd3', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Your Private Couple Code
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.06em', color: '#fff' }}>
                  {coupleSpace?.inviteCode || 'ADDIS-LOVE'}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleCopyCode(coupleSpace?.inviteCode || 'ADDIS-LOVE')}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {copiedCode ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button
                    onClick={() => handleShareWhatsApp(coupleSpace?.inviteCode || 'ADDIS-LOVE')}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#25D366',
                      border: 'none',
                      color: '#fff',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Share directly via WhatsApp"
                  >
                    <Share2 size={13} />
                    WhatsApp
                  </button>
                </div>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Send this code to your partner so both of your phones and laptops sync dates and notifications in real time!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)' }}>
                Couples in this space:
              </div>

              {/* Current user */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--rose-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  {currentUser.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                    {currentUser.name} <span style={{ fontSize: '0.68rem', color: 'var(--rose-400)', fontWeight: 600 }}>(You)</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>{currentUser.email}</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>

              {/* Partner */}
              {partner ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    {partner.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                      {partner.name} <span style={{ fontSize: '0.68rem', color: '#a78bfa', fontWeight: 600 }}>(Partner 💕)</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>{partner.email}</div>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                </div>
              ) : (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  No partner connected yet. Share your code above!
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '6px'
              }}
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        onClick={handleOpenModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: currentUser ? 'rgba(244, 63, 94, 0.18)' : 'rgba(255, 255, 255, 0.07)',
          border: currentUser ? '1px solid rgba(244, 63, 94, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.82rem',
          fontWeight: 600
        }}
        title={currentUser ? `Logged in as ${currentUser.name}` : 'Sign in or create couple account'}
      >
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Heart size={14} color="var(--rose-400)" fill={currentUser ? 'var(--rose-400)' : 'transparent'} />
          {currentUser && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }}
            />
          )}
        </span>
        <span>
          {currentUser ? (
            <>
              <strong>{currentUser.name}</strong>
              {partner ? ` & ${partner.name}` : ' (Waiting for partner)'}
            </>
          ) : (
            'Sign In / Pair Up'
          )}
        </span>
      </button>

      {modalPortal}
    </>
  );
};
