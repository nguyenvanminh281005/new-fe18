import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Profile.module.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProfilePopup = ({ onClose }) => {
  const { currentUser, token, logout, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!token) {
      // Nếu không có token, đóng popup và chuyển về login hoặc home
      onClose();
      navigate('/home');
      return;
    }

    fetchUserProfile();
  }, [token, isAuthLoading, navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Không lấy được thông tin người dùng');

      const data = await res.json();
      setName(data.username || '');
      setEmail(data.email || '');
      setCreatedAt(data.created_at || data.createdAt || '');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Cập nhật thất bại');
      }
      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  const deleteUserAccount = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Xóa tài khoản thất bại');
      }
      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/home');
  };

  const handleEditToggle = () => {
    if (isEditing) saveChanges();
    else setIsEditing(true);
  };

  const saveChanges = async () => {
    if (!name.trim()) {
      setErrorMessage('Tên không được để trống');
      return;
    }
    try {
      await updateUserProfile({ username: name, email });
      setSuccessMessage('Cập nhật thành công');
      setErrorMessage('');
      setIsEditing(false);
      fetchUserProfile();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
      deleteUserAccount()
        .then(() => {
          logout();
          onClose();
          navigate('/home');
        })
        .catch(err => setErrorMessage(err.message));
    }
  };

  const cancelEdit = () => {
    fetchUserProfile();
    setIsEditing(false);
    setErrorMessage('');
  };

  if (isAuthLoading || loading) {
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.profileCard}>
          <h1>Tài khoản của bạn</h1>
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

          <div className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label>Tên</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              ) : (
                <div className={styles.profileInfo}>{name}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              ) : (
                <div className={styles.profileInfo}>{email}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Đăng ký lần đầu</label>
              <div className={styles.profileInfo}>
                {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            {isEditing ? (
              <>
                <button className={styles.cancelButton} onClick={cancelEdit}>Hoàn tác</button>
                <button className={styles.saveButton} onClick={handleEditToggle}>Lưu thay đổi</button>
              </>
            ) : (
              <button className={styles.editButton} onClick={handleEditToggle}>Chỉnh sửa</button>
            )}
            <button className={styles.logoutButton} onClick={handleLogout}>Đăng xuất</button>
          </div>
          <div className={styles.dangerZone}>
            <h3>Vùng nguy hiểm</h3>
            <button className={styles.deleteButton} onClick={handleDeleteAccount}>Xóa tài khoản</button>
            <p className={styles.warningText}>Hành động này sẽ xóa tài khoản và dữ liệu của bạn vĩnh viễn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;