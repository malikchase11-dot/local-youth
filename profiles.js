async function loadProfiles() {
  const container = document.getElementById('profilesContainer');
  if (!container) return;
  const res = await fetch('/api/profiles');
  const profiles = await res.json();
  container.innerHTML = profiles.map(p => `
    <div class='profile-card'>
      <img src='${p.image_url || 'https://via.placeholder.com/100'}' alt='${p.name}'>
      <h3>${p.name}</h3>
      <p>${p.role || ''}</p>
      <a href='profile_detail.html?id=${p.id}'>View</a>
      <a href='create_edit_profile.html?id=${p.id}'>Edit</a>
      <button onclick='deleteProfile(${p.id})'>Delete</button>
    </div>`).join('');
}

async function deleteProfile(id) {
  if (!confirm('Are you sure you want to delete this profile?')) return;
  const res = await fetch(`/api/profiles/${id}`, { method: 'DELETE' });
  if (res.ok) {
    alert('Profile deleted successfully!');
    loadProfiles();
  } else {
    alert('Error deleting profile.');
  }
}

async function loadProfileDetail() {
  const container = document.getElementById('profileDetail');
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get('id');
  const res = await fetch(`/api/profiles/${id}`);
  const p = await res.json();
  container.innerHTML = `
    <div class='profile-card'>
      <img src='${p.image_url || 'https://via.placeholder.com/100'}' alt='${p.name}'>
      <h2>${p.name}</h2>
      <p>${p.role || ''}</p>
      <p>${p.bio || ''}</p>
      <a href='create_edit_profile.html?id=${p.id}'>Edit</a>
      <button onclick='deleteProfile(${p.id})'>Delete</button>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfiles();
  loadProfileDetail();
});
