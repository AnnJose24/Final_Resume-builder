export class EducationManager {
  constructor() {
    this.educationDisplay = document.getElementById("education-display");
    this.educationFormSection = document.getElementById("education-form-section");
    this.educationErrorElement = document.getElementById("education-error");
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => this.loadEducation());
    document.getElementById("education-submit-btn").addEventListener("click", () => this.submitEducationForm());
    document.getElementById("education-cancel-btn").addEventListener("click", () => this.clearEducationForm());
    document.querySelector("input[name='education']").addEventListener("click", () => this.showEducationForm());

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("eddelete-btn")) {
        const index = event.target.getAttribute("data-index");
        this.deleteEducation(index);
      }
    });
  }

  showEducationForm() {
    this.educationFormSection.className = "education-input-section show";
    this.educationErrorElement.textContent = "";
  }

  clearEducationForm() {
    document.getElementById("education-form").reset();
    this.educationFormSection.className = "education-input-section hide";
    this.educationErrorElement.textContent = "";
  }

  submitEducationForm() {
    const institute = document.getElementById("institute").value;
    const duration = document.getElementById("duration").value;
    const cgpa = document.getElementById("cgpa").value;

    if (this.validateCGPA(cgpa)) {
      this.saveEducationDetails({ institute, duration, cgpa });
      this.displayEducationDetails();
      this.clearEducationForm();
    } else {
      this.educationErrorElement.textContent = "Invalid CGPA format. Please enter a valid CGPA.";
    }
  }

  validateCGPA(cgpa) {
    const cgpaPattern = /^[0-9]+(\.[0-9]+)?$/;
    return cgpaPattern.test(cgpa);
  }

  saveEducationDetails(details) {
    let educationList = JSON.parse(sessionStorage.getItem("education")) || [];
    educationList.push(details);
    sessionStorage.setItem("education", JSON.stringify(educationList));
  }

  loadEducation() {
    let educationList = JSON.parse(sessionStorage.getItem("education")) || [];
    let htmlContent = "";

    educationList.forEach((education, index) => {
      if (education.institute && education.duration && education.cgpa) {
        htmlContent += `
            <div class="education-entry">
              <p>Institute: ${education.institute}</p>
              <p>Duration: ${education.duration}</p>
              <p>CGPA: ${education.cgpa}</p>
              <button class="eddelete-btn" data-index="${index}">Delete</button>
            </div>
          `;
      } else {
        htmlContent += `
            <div class="education-entry">
              <p>Error: Incomplete education information.</p>
            </div>
          `;
      }
    });

    if (educationList.length === 0) {
      htmlContent = `
          <div class="education-entry">
            <p>No education details available.</p>
          </div>
        `;
    }

    this.educationDisplay.innerHTML = htmlContent;
  }

  displayEducationDetails() {
    this.loadEducation();
  }

  deleteEducation(index) {
    let educationList = JSON.parse(sessionStorage.getItem("education")) || [];
    educationList.splice(index, 1);
    sessionStorage.setItem("education", JSON.stringify(educationList));
    this.loadEducation();
  }
}

