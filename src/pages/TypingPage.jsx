// pages/TypingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TypingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [gender, setGender] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    setName(state?.name || '');
    setUserId(state?.userId || '');
    setGender(state?.gender || '');
    setInputCode(state?.inputCode || '');

    // 認証番号は毎回リセット（常に新しく生成）
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setAuthCode(code);
  }, [state]);

  const isValidUserId = userId === '' || /^[a-zA-Z0-9]{3,12}$/.test(userId);
  const isValidInputCode = /^\d{6}$/.test(inputCode);

  const handleSubmit = () => {
    if (!name || !gender || !inputCode) {
      alert('すべての必須項目を入力してください。');
      return;
    }
    if (!isValidUserId) {
      alert('ユーザーIDは3〜12文字の半角英数字で入力してください。');
      return;
    }
    if (!isValidInputCode) {
      alert('認証番号は6桁の数字で入力してください。');
      return;
    }
    navigate('/confirm', { state: { name, userId, gender, inputCode, authCode } });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '48rem', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>会員登録フォーム</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>お名前（必須）</label>
        <input style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }} value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>ユーザーID（任意）</label>
        <input style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }} value={userId} onChange={e => setUserId(e.target.value)} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>性別（必須）</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label><input type="radio" name="gender" value="男性" checked={gender === '男性'} onChange={e => setGender(e.target.value)} /> 男性</label>
          <label><input type="radio" name="gender" value="女性" checked={gender === '女性'} onChange={e => setGender(e.target.value)} /> 女性</label>
          <label><input type="radio" name="gender" value="その他" checked={gender === 'その他'} onChange={e => setGender(e.target.value)} /> その他</label>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>認証番号（必須）</label>
        <p style={{ padding: '0.5rem', backgroundColor: '#f3f4f6' }}>{authCode}</p>
        <input style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', marginTop: '0.5rem' }} value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="認証番号を入力" />
      </div>

      <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }} onClick={handleSubmit}>
        入力確認
      </button>
    </div>
  );
}

export default TypingPage;