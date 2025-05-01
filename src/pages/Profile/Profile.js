import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from '../../css/Profile.module.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;
function Profile() {
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
      navigate('/login');
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

  // Hàm cập nhật profile
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

  // Hàm xóa tài khoản
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

  const handleGoBack = () => navigate('/dashboard');

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const handleEditToggle = () => {
    if (isEditing) saveChanges();
    else setIsEditing(true);
  };

  const saveChanges = async () => {
    if (!name.trim()) {
      setErrorMessage('Name cannot be empty');
      return;
    }
    try {
      await updateUserProfile({ username: name, email });
      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');
      setIsEditing(false);
      // Cập nhật lại profile mới từ server để đồng bộ
      fetchUserProfile();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteUserAccount()
        .then(() => {
          logout();
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
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleGoBack}>← Back to Dashboard</button>
        <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
      </header>

      <div className={styles.profileCard}>
        <h1>Your Profile</h1>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <div className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label>Name</label>
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
            <label>Member Since</label>
            <div className={styles.profileInfo}>
              {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
            </div>
          </div>
        </div>

        <div className={styles.profileActions}>
          {isEditing ? (
            <>
              <button className={styles.cancelButton} onClick={cancelEdit}>Cancel</button>
              <button className={styles.saveButton} onClick={handleEditToggle}>Save Changes</button>
            </>
          ) : (
            <button className={styles.editButton} onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>

        <div className={styles.dangerZone}>
          <h3>Danger Zone</h3>
          <button className={styles.deleteButton} onClick={handleDeleteAccount}>Delete Account</button>
          <p className={styles.warningText}>This will permanently delete your account and all associated data.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;