const form = document.getElementById('profileForm');
const profileId = new URLSearchParams(window.location.search).get('id');

if (profileId) {
  fetch(`/api/profiles/${profileId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('profileId').value = data.id;
      document.getElementById('name').value = data.name;
      document.getElementById('role').value = data.role || '';
      document.getElementById('image_url').value = data.image_url || '';
      document.getElementById('bio').value = data.bio || '';
    });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    name: form.name.value,
    role: form.role.value,
    image_url: form.image_url.value,
    bio: form.bio.value
  };

  const method = profileId ? 'PUT' : 'POST';
  const url = profileId ? `/api/profiles/${profileId}` : '/api/profiles';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert('Profile saved successfully!');
    window.location.href = 'profile_listings.html';
  } else {
    alert('Error saving profile.');
  }
});
