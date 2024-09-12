export class ProfileManager {
  constructor() {
    this.profileDisplay = document.getElementById("profile-display");
    this.profileFormSection = document.getElementById("profile-form-section");
    this.profileErrorElement = document.getElementById("profile-error");
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => this.loadProfile());
    document.getElementById("profile-submit-btn").addEventListener("click", () => this.submitProfileForm());
    document.getElementById("profile-cancel-btn").addEventListener("click", () => this.clearProfileForm());
    document.querySelector("input[name='profile']").addEventListener("click", () => this.showProfileForm());

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("pdelete-btn")) {
        const index = event.target.getAttribute("data-index");
        this.deleteProfile(index);
      }
    });
  }

  showProfileForm() {
    this.profileFormSection.className = "profile-input-section show";
    this.profileErrorElement.textContent = "";
  }

  clearProfileForm() {
    document.getElementById("profile-form").reset();
    this.profileFormSection.className = "profile-input-section hide";
    this.profileErrorElement.textContent = "";
  }

  submitProfileForm() {
    const profile = document.getElementById("profile").value;

    if (profile) {
      this.saveProfileDetails({ profile });
      this.displayProfileDetails();
      this.clearProfileForm();
    } else {
      this.profileErrorElement.textContent = "Profile field is required.";
    }
  }

  saveProfileDetails(details) {
    let profileList = JSON.parse(sessionStorage.getItem("profile")) || [];
    profileList.push(details);
    sessionStorage.setItem("profile", JSON.stringify(profileList));
  }

  loadProfile() {
    let profileList = JSON.parse(sessionStorage.getItem("profile")) || [];
    let htmlContent = "";

    profileList.forEach((profile, index) => {
      if (profile.profile) {
        htmlContent += `
            <div class="profile-entry">
              <p>Profile: ${profile.profile}</p>
              <button class="pdelete-btn" data-index="${index}">Delete</button>
            </div>
          `;
      } else {
        htmlContent += `
            <div class="profile-entry">
              <p>Error: Incomplete profile information.</p>
            </div>
          `;
      }
    });

    if (profileList.length === 0) {
      htmlContent = `
          <div class="profile-entry">
            <p>No profile details available.</p>
          </div>
        `;
    }

    this.profileDisplay.innerHTML = htmlContent;
  }

  displayProfileDetails() {
    this.loadProfile();
  }

  deleteProfile(index) {
    let profileList = JSON.parse(sessionStorage.getItem("profile")) || [];
    profileList.splice(index, 1);
    sessionStorage.setItem("profile", JSON.stringify(profileList));
    this.loadProfile();
  }
}
