// pages/ResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { name = '', userId = '', gender = '', inputCode = '', authCode = '' } = state || {};

  const isMatch = inputCode === authCode;

  return (
    <div className="p-8 max-w-xl mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">登録完了</h2>
      <p><strong>お名前：</strong>{name}</p>
      <p><strong>ユーザーID：</strong>{userId || '未設定'}</p>
      <p><strong>性別：</strong>{gender}</p>
      <p><strong>認証番号入力結果：</strong>{inputCode}</p>
      <p><strong>システム側の認証番号：</strong>{authCode}</p>
      <p><strong>確認結果：</strong>{isMatch ? '入力内容が一致しました！' : '入力された番号が一致しませんでした。'}</p>

      <div className="mt-6">
        <button
          onClick={() => navigate('/typing')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          もう一度登録する
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
