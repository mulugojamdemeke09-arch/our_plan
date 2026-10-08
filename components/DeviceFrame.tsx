'use client';

import React from 'react';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  isIPhonePreview: boolean;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ isIPhonePreview, children }) => {
  if (!isIPhonePreview) {
    return <div style={{ width: '100%', minHeight: '100vh' }}>{children}</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        padding: '30px 16px 60px 16px',
        backgroundColor: '#05070c',
        backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(244, 63, 94, 0.1), transparent 70%)'
      }}
    >
      {/* Device frame banner tip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          marginBottom: '20px'
        }}
      >
        <Smartphone size={14} color="var(--rose-400)" />
        <span>iPhone 12 Viewport Simulation (390 × 844 pt)</span>
      </div>

      {/* iPhone 12 Bezel */}
      <div
        style={{
          width: '390px',
          height: '844px',
          backgroundColor: '#0a0c13',
          borderRadius: '50px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 10px #1f2438, 0 0 0 12px #2a314d, 0 0 40px rgba(244, 63, 94, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '4px solid #111422'
        }}
      >
        {/* iOS Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '28px',
            backgroundColor: '#111422',
            borderBottomLeftRadius: '18px',
            borderBottomRightRadius: '18px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {/* Speaker grill */}
          <div
            style={{
              width: '44px',
              height: '4px',
              backgroundColor: '#262a3d',
              borderRadius: '2px'
            }}
          />
          {/* Camera lens */}
          <div
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#1a1e2e',
              borderRadius: '50%',
              border: '1px solid #2a3047'
            }}
          />
        </div>

        {/* iOS Status Bar */}
        <div
          style={{
            height: '44px',
            padding: '12px 24px 0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#fff',
            zIndex: 999,
            backgroundColor: 'rgba(10, 12, 19, 0.95)',
            flexShrink: 0
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={14} />
          </div>
        </div>

        {/* Scrollable Device Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            position: 'relative',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '135px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.45)',
            borderRadius: '2px',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};
