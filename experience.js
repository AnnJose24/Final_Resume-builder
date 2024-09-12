export class ExperienceManager {
  constructor() {
    this.experienceDisplay = document.getElementById("experience-display");
    this.experienceFormSection = document.getElementById("experience-form-section");
    this.experienceErrorElement = document.getElementById("experience-error");
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => this.loadExperience());
    document.getElementById("experience-submit-btn").addEventListener("click", () => this.submitExperienceForm());
    document.getElementById("experience-cancel-btn").addEventListener("click", () => this.clearExperienceForm());
    document.querySelector("input[name='experience']").addEventListener("click", () => this.showExperienceForm());

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("exdelete-btn")) {
        const index = event.target.getAttribute("data-index");
        this.deleteExperience(index);
      }
    });
  }

  showExperienceForm() {
    this.experienceFormSection.className = "experience-input-section show";
    this.experienceErrorElement.textContent = "";
  }

  clearExperienceForm() {
    document.getElementById("experience-form").reset();
    this.experienceFormSection.className = "experience-input-section hide";
    this.experienceErrorElement.textContent = "";
  }

  submitExperienceForm() {
    const designation = document.getElementById("designation").value;
    const organization = document.getElementById("organization").value;
    const timePeriod = document.getElementById("timePeriod").value;

    if (designation && organization && timePeriod) {
      this.saveExperienceDetails({ designation, organization, timePeriod });
      this.displayExperienceDetails();
      this.clearExperienceForm();
    } else {
      this.experienceErrorElement.textContent = "All fields are required.";
    }
  }

  saveExperienceDetails(details) {
    let experienceList = JSON.parse(sessionStorage.getItem("experience")) || [];
    experienceList.push(details);
    sessionStorage.setItem("experience", JSON.stringify(experienceList));
  }

  loadExperience() {
    let experienceList = JSON.parse(sessionStorage.getItem("experience")) || [];
    let htmlContent = "";

    experienceList.forEach((experience, index) => {
      if (experience.designation && experience.organization && experience.timePeriod) {
        htmlContent += `
            <div class="experience-entry">
              <p>Designation: ${experience.designation}</p>
              <p>Organization: ${experience.organization}</p>
              <p>Time Period: ${experience.timePeriod}</p>
              <button class="exdelete-btn" data-index="${index}">Delete</button>
            </div>
          `;
      } else {
        htmlContent += `
            <div class="experience-entry">
              <p>Error: Incomplete experience information.</p>
            </div>
          `;
      }
    });

    if (experienceList.length === 0) {
      htmlContent = `
          <div class="experience-entry">
            <p>No experience details available.</p>
          </div>
        `;
    }

    this.experienceDisplay.innerHTML = htmlContent;
  }

  displayExperienceDetails() {
    this.loadExperience();
  }

  deleteExperience(index) {
    let experienceList = JSON.parse(sessionStorage.getItem("experience")) || [];
    experienceList.splice(index, 1);
    sessionStorage.setItem("experience", JSON.stringify(experienceList));
    this.loadExperience();
  }
}




