import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserById } from '../services/api';

const ProfileField = ({ label, value }) => (
  <div className="profile-field">
    <span className="field-label">{label}</span>
    <span className="field-value">{value || '—'}</span>
  </div>
);

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    fetchUserById(user.id)
      .then(setProfile)
      .catch(() => setError('Failed to load profile data.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) return (
    <div className="page-loading">
      <div className="spinner" />
      <p>Loading profile…</p>
    </div>
  );

  if (error) return (
    <div className="page-error">
      <span>⚠</span>
      <p>{error}</p>
    </div>
  );

  if (!profile) return null;

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar-wrapper">
          <img src={profile.image} alt={profile.firstName} className="profile-avatar" />
          <span className={`gender-badge ${profile.gender}`}>{profile.gender}</span>
        </div>
        <div className="profile-identity">
          <h1 className="profile-name">{profile.firstName} {profile.lastName}</h1>
          <p className="profile-username">@{profile.username}</p>
          <p className="profile-email">{profile.email}</p>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="fields-grid">
            <ProfileField label="Age" value={profile.age} />
            <ProfileField label="Birth Date" value={profile.birthDate} />
            <ProfileField label="Blood Group" value={profile.bloodGroup} />
            <ProfileField label="Height" value={profile.height ? `${profile.height} cm` : null} />
            <ProfileField label="Weight" value={profile.weight ? `${profile.weight} kg` : null} />
            <ProfileField label="Eye Color" value={profile.eyeColor} />
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Contact</h2>
          <div className="fields-grid">
            <ProfileField label="Phone" value={profile.phone} />
            <ProfileField label="Email" value={profile.email} />
          </div>
          {profile.address && (
            <div className="profile-address">
              <span className="field-label">Address</span>
              <address>
                {profile.address.address}, {profile.address.city},{' '}
                {profile.address.state} {profile.address.postalCode},{' '}
                {profile.address.country}
              </address>
            </div>
          )}
        </section>

        <section className="profile-section">
          <h2 className="section-title">Employment</h2>
          <div className="fields-grid">
            <ProfileField label="Company" value={profile.company?.name} />
            <ProfileField label="Department" value={profile.company?.department} />
            <ProfileField label="Title" value={profile.company?.title} />
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Financial</h2>
          <div className="fields-grid">
            <ProfileField label="Card Type" value={profile.bank?.cardType} />
            <ProfileField label="Card Number" value={profile.bank?.cardNumber ? `•••• •••• •••• ${profile.bank.cardNumber.slice(-4)}` : null} />
            <ProfileField label="Currency" value={profile.bank?.currency} />
            <ProfileField label="IBAN" value={profile.bank?.iban} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
