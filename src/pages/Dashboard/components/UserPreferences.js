import React, { useEffect, useState } from 'react';

export default function UserPreferences() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');

  // Áp dụng chế độ sáng/tối
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Áp dụng cỡ chữ
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-sm', 'text-base', 'text-lg');

    switch (fontSize) {
      case 'small':
        root.classList.add('text-sm');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
      default:
        root.classList.add('text-base');
    }

    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">🎛️ Tùy chỉnh giao diện</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Chế độ sáng/tối */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Chế độ giao diện</label>
          <select
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
          </select>
        </div>

        {/* Cỡ chữ */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Cỡ chữ</label>
          <select
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Nhỏ</option>
            <option value="medium">Trung bình</option>
            <option value="large">Lớn</option>
          </select>
        </div>
      </div>
    </div>
  );
}
