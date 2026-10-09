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
  Sparkles
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
  const [regInviteCode, setRegInviteCode] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  // Show demo toggle
  const [showDemoLogins, setShowDemoLogins] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = () => {
    // If already logged in, show couple space; if not, show login
    setTab(currentUser ? 'profile' : 'login');
    setLoginError('');
    setRegError('');
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
      onAuthChange();
      setIsOpen(false);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setRegError('Name, email, and password are required');
      return;
    }

    setRegLoading(true);
    setRegError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          inviteCode: regInviteCode.trim() || undefined
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
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

  const quickSwitchPartner = async (partnerEmail: string) => {
    await handleLogin(partnerEmail, 'love123');
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
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.75)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title="Close modal"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingRight: '32px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f43f5e, #be123c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(244, 63, 94, 0.45)',
              flexShrink: 0
            }}
          >
            <Heart size={22} fill="#fff" color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1.20rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#fff' }}>
              {tab === 'login'
                ? 'Couple Sign In'
                : tab === 'register'
                ? 'Create Couple Account'
                : 'Our Couple Space'}
            </h3>
            <p style={{ margin: '3px 0 0 0', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              {tab === 'login'
                ? 'Sign in to plan dates together in real time'
                : tab === 'register'
                ? 'Create a shared space for you and your partner'
                : `Connected with ${partner?.name || 'Waiting for partner to join'}`}
            </p>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '3px',
            marginBottom: '16px',
            gap: '3px'
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
              boxShadow: tab === 'login' ? '0 2px 8px rgba(244, 63, 94, 0.35)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setLoginError(''); setRegError(''); }}
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
            {/* Active user status hint */}
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

            {/* Quick Demo Helper (Collapsible so real accounts take center stage) */}
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
          <form
            onSubmit={handleRegister}
            style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}
          >
            {regError && (
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
                {regError}
              </div>
            )}

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
                  placeholder="e.g. Hanna or Dawit"
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
                  placeholder="you@gmail.com"
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
              {regLoading ? 'Creating Couple Space…' : 'Create Couple Space'}
              <Check size={15} />
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
              <span>Real-time sync enabled for you &amp; your partner</span>
            </div>
          </form>
        )}

        {/* TAB 3: REAL COUPLE SPACE PROFILE */}
        {tab === 'profile' && currentUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.5)' }}>My Account</span>
                <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>● Active &amp; Synced</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(244, 63, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--rose-400)',
                    fontWeight: 700
                  }}
                >
                  {currentUser.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.90rem' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)' }}>{currentUser.email}</div>
                </div>
              </div>
            </div>

            {/* Partner Connection Box */}
            <div
              style={{
                backgroundColor: partner ? 'rgba(52, 211, 153, 0.08)' : 'rgba(251, 191, 36, 0.08)',
                border: partner ? '1px solid rgba(52, 211, 153, 0.25)' : '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '0.76rem', color: partner ? '#34d399' : '#fbbf24', fontWeight: 700 }}>
                {partner ? 'Connected Partner ❤️' : 'Invite Your Partner 💌'}
              </div>

              {partner ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(52, 211, 153, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#34d399',
                      fontWeight: 700
                    }}
                  >
                    {partner.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.90rem' }}>{partner.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)' }}>{partner.email}</div>
                  </div>
                  <span style={{ fontSize: '0.70rem', color: '#34d399', fontWeight: 600, backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                    Live Synced
                  </span>
                </div>
              ) : (
                <div>
                  <p style={{ margin: '0 0 6px 0', fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                    Share your code with your partner so they connect with you:
                  </p>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <input
                      readOnly
                      value={coupleSpace?.inviteCode || 'ADDIS-LOVE'}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: '7px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#fff',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        fontSize: '0.84rem',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyCode(coupleSpace?.inviteCode || 'ADDIS-LOVE')}
                      className="btn-secondary"
                      style={{ padding: '7px 10px', fontSize: '0.76rem' }}
                    >
                      {copiedCode ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* Direct WhatsApp Share Button */}
                  <button
                    type="button"
                    onClick={() => handleShareWhatsApp(coupleSpace?.inviteCode || 'ADDIS-LOVE')}
                    style={{
                      width: '100%',
                      padding: '7px',
                      borderRadius: '7px',
                      backgroundColor: 'rgba(37, 211, 102, 0.18)',
                      border: '1px solid rgba(37, 211, 102, 0.35)',
                      color: '#25D366',
                      fontWeight: 600,
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Share2 size={13} /> Send Invite via WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', gap: '7px', marginTop: '3px' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: '9px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: '9px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Top Navbar Couple Pill Button */}
      <button
        onClick={handleOpenModal}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: currentUser ? 'rgba(244, 63, 94, 0.16)' : 'rgba(255, 255, 255, 0.08)',
          border: currentUser ? '1px solid rgba(244, 63, 94, 0.45)' : '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 700,
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(10px)',
          maxWidth: '260px',
          boxShadow: currentUser ? '0 0 14px rgba(244, 63, 94, 0.25)' : 'none'
        }}
        title="Click to view Couple Account & Shared Space"
        aria-label="Couple Login and Sync Account"
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: currentUser
              ? 'linear-gradient(135deg, #f43f5e, #be123c)'
              : 'rgba(255, 255, 255, 0.22)',
            boxShadow: currentUser ? '0 2px 8px rgba(244, 63, 94, 0.5)' : 'none',
            flexShrink: 0
          }}
        >
          <Heart size={12} fill="#fff" color="#fff" />
        </span>

        <span
          style={{
            color: 'var(--text-main)',
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {currentUser
            ? `${currentUser.name} 💖 ${partner ? partner.name : 'Waiting Partner'}`
            : 'Couple Sign In / Sign Up'}
        </span>

        {currentUser ? (
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: partner ? '#34d399' : '#fbbf24',
              boxShadow: partner ? '0 0 8px #34d399' : '0 0 8px #fbbf24',
              flexShrink: 0
            }}
            title={partner ? 'Connected with partner' : 'Waiting for partner'}
          />
        ) : (
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--rose-400)',
              flexShrink: 0
            }}
          />
        )}
      </button>

      {/* Render the portal into document.body */}
      {modalPortal}
    </>
  );
};
