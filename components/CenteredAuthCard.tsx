'use client';

import React, { useState } from 'react';
import { Heart, Mail, Lock, User, KeyRound, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CenteredAuthCardProps {
  onSuccess: () => void;
  onExploreAsGuest?: () => void;
}

export const CenteredAuthCard: React.FC<CenteredAuthCardProps> = ({
  onSuccess,
  onExploreAsGuest
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async (emailOverride?: string, passwordOverride?: string) => {
    const e = emailOverride || loginEmail;
    const p = passwordOverride || loginPassword;

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
        throw new Error(data.error || 'Failed to sign in');
      }

      onSuccess();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      setSignupError('Name, email, and password are required');
      return;
    }

    setSignupLoading(true);
    setSignupError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          inviteCode: inviteCode.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      onSuccess();
    } catch (err: any) {
      setSignupError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '72vh',
        width: '100%',
        padding: '24px 16px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: '#111522',
          borderRadius: '24px',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(244, 63, 94, 0.15)',
          padding: '32px 28px',
          color: '#fff',
          position: 'relative'
        }}
      >
        {/* Top Floating Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(244, 63, 94, 0.45)'
            }}
          >
            <Heart size={28} fill="#fff" color="#fff" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#fff' }}>
            Our Weekend Addis
          </h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.65)' }}>
            {mode === 'login' 
              ? 'Sign in to plan dates with your partner in real time' 
              : 'Create your couple account & save dates to the database'}
          </p>
        </div>

        {/* Mode Switch Tabs (Sign In vs Sign Up) */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '20px'
          }}
        >
          <button
            type="button"
            onClick={() => { setMode('login'); setLoginError(''); setSignupError(''); }}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: mode === 'login' ? 'var(--rose-500)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: mode === 'login' ? '0 2px 10px rgba(244, 63, 94, 0.35)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setLoginError(''); setSignupError(''); }}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: mode === 'signup' ? 'var(--rose-500)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: mode === 'signup' ? '0 2px 10px rgba(244, 63, 94, 0.35)' : 'none'
            }}
          >
            Create Account
          </button>
        </div>

        {/* MODE 1: SIGN IN */}
        {mode === 'login' ? (
          <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {loginError && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontSize: '0.80rem',
                  lineHeight: 1.4
                }}
              >
                {loginError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="abeba@ourweekend.app"
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: '11px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.90rem',
                    outline: 'none'
                  }}
                />
                <Mail size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px' }}>
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
                    padding: '11px 14px 11px 38px',
                    borderRadius: '11px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.90rem',
                    outline: 'none'
                  }}
                />
                <Lock size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                padding: '12px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(244, 63, 94, 0.4)',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loginLoading ? 'Signing In…' : 'Sign In to Couple Space'}
              <ArrowRight size={16} />
            </button>

            {/* 1-Click Fast Partner Demo Buttons */}
            <div
              style={{
                marginTop: '12px',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.55)', textAlign: 'center' }}>
                Instant Couple Pair Demo (Saved in Database):
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleLogin('abeba@ourweekend.app', 'love123')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sign In as Abeba 👩
                </button>
                <button
                  type="button"
                  onClick={() => handleLogin('yohannes@ourweekend.app', 'love123')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sign In as Yohannes 👨
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* MODE 2: SIGN UP */
          <form
            onSubmit={handleSignup}
            style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}
          >
            {signupError && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontSize: '0.80rem',
                  lineHeight: 1.4
                }}
              >
                {signupError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '5px' }}>
                Your Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Abeba or Yohannes"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                <User size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '5px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                <Mail size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '5px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                <Lock size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '5px' }}>
                Partner&apos;s Couple Invite Code (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ADDIS-LOVE (or leave blank for new)"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                    letterSpacing: '0.04em'
                  }}
                />
                <KeyRound size={16} color="var(--rose-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <span style={{ fontSize: '0.70rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '3px', display: 'block', lineHeight: 1.3 }}>
                If your partner already registered, enter their code to pair instantly! Otherwise, a new code will be generated for you.
              </span>
            </div>

            <button
              type="submit"
              disabled={signupLoading}
              style={{
                padding: '12px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(244, 63, 94, 0.4)',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {signupLoading ? 'Saving to Database…' : 'Create Couple Account & Pair'}
              <Check size={16} />
            </button>
          </form>
        )}

        {/* Database Persistence Verified Badge */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            color: '#34d399'
          }}
        >
          <ShieldCheck size={14} />
          <span>Permanently recorded in SQLite &amp; Prisma Database</span>
        </div>

        {/* Guest Exploration Option */}
        {onExploreAsGuest && (
          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <button
              type="button"
              onClick={onExploreAsGuest}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Explore Addis dates &amp; events as guest first
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
