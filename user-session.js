(function () {
  function readUser() {
    const sharedUser = localStorage.getItem('cc_user');
    if (sharedUser) {
      try {
        const user = JSON.parse(sharedUser);
        if (user && user.name) return user;
      } catch (error) {
        console.error('Unable to read saved Campus Cycle user.', error);
      }
    }

    const legacyUser = localStorage.getItem('user');
    if (legacyUser) {
      try {
        const user = JSON.parse(legacyUser);
        if (user && user.name) {
          localStorage.setItem('cc_user', JSON.stringify(user));
          return user;
        }
      } catch (error) {
        console.error('Unable to read saved user profile.', error);
      }
    }

    const name = localStorage.getItem('userName') || localStorage.getItem('name');
    if (!name) return null;

    const user = {
      name,
      email: localStorage.getItem('userEmail') || localStorage.getItem('email') || '',
      phone: localStorage.getItem('phone') || ''
    };
    localStorage.setItem('cc_user', JSON.stringify(user));
    return user;
  }

  function updateNavbar() {
    const user = readUser();
    const userInfo = document.getElementById('user-info');
    const authButtons = document.getElementById('auth-buttons');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');

    if (userInfo && authButtons) {
      userInfo.style.display = user ? 'flex' : 'none';
      authButtons.style.display = user ? 'none' : 'flex';
    }

    if (user) {
      if (userName) userName.textContent = user.name;
      if (userAvatar) userAvatar.textContent = user.name.trim().charAt(0).toUpperCase();
    }

    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileInitial = document.getElementById('profileInitial');
    if (user) {
      if (profileName) profileName.textContent = user.name;
      if (profileEmail && user.email) profileEmail.value = user.email;
      if (profilePhone && user.phone) profilePhone.value = user.phone;
      if (profileInitial) profileInitial.textContent = user.name.trim().charAt(0).toUpperCase();
    }
  }

  window.CampusCycleSession = {
    currentUser: readUser,
    updateNavbar,
    clearUser: function () {
      localStorage.removeItem('cc_user');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('phone');
    },
    saveUser: function (user) {
      localStorage.setItem('cc_user', JSON.stringify(user));
      updateNavbar();
    }
  };

  document.addEventListener('DOMContentLoaded', updateNavbar);
  window.addEventListener('storage', updateNavbar);

  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) logoutButton.addEventListener('click', window.CampusCycleSession.clearUser);
})();
