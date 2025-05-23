// pages/ConfirmPage.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (!state) return <p>入力情報がありません。</p>;

  const { name, userId, gender, inputCode, authCode } = state;
  const isMatch = inputCode === authCode;

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    navigate('/typing');
  };

  const handleBackToTyping = () => {
    navigate('/typing', {
      state: { name, userId, gender, inputCode, authCode },
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '48rem', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>入力内容の確認</h2>
      <p><strong>お名前：</strong>{name}</p>
      <p><strong>ユーザーID：</strong>{userId || '未設定'}</p>
      <p><strong>性別：</strong>{gender}</p>
      <p><strong>入力された認証番号：</strong>{inputCode}</p>

      <div style={{ marginTop: '1.5rem' }}>
        <button
          onClick={handleConfirm}
          style={{ backgroundColor: '#16a34a', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', marginRight: '1rem' }}
        >
          登録する
        </button>
        <button
          onClick={handleBackToTyping}
          style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}
        >
          修正する
        </button>
      </div>

      {showModal && ReactDOM.createPortal(
        isMatch ? (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              width: '100%'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>登録完了</h3>
              <p>{name} さんの情報が登録されました。</p>
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button
                  onClick={handleClose}
                  style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: '#fef2f2',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              width: '100%'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>登録失敗</h3>
              <p>認証番号が一致しませんでした。</p>
              <p>もう一度ご確認の上、修正してください。</p>
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button
                  onClick={handleBackToTyping}
                  style={{ backgroundColor: '#dc2626', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}
                >
                  修正する
                </button>
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </div>
  );
}

export default ConfirmPage;