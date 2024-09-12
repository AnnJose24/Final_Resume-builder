export class InternshipManager {
    constructor() {
        this.internshipDisplay = document.getElementById("internship-display");
        this.internshipFormSection = document.getElementById("internship-form-section");
        this.internshipErrorElement = document.getElementById("internship-error");
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => this.loadInternship());
        document.getElementById("internship-submit-btn").addEventListener("click", () => this.submitInternshipForm());
        document.getElementById("internship-cancel-btn").addEventListener("click", () => this.clearInternshipForm());
        document.querySelector("input[name='internship']").addEventListener("click", () => this.showInternshipForm());

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("indelete-btn")) {
                const index = event.target.getAttribute("data-index");
                this.deleteInternship(index);
            }
        });
    }

    showInternshipForm() {
        this.internshipFormSection.className = "internship-input-section show";
        this.internshipErrorElement.textContent = "";
    }

    clearInternshipForm() {
        document.getElementById("internship-form").reset();
        this.internshipFormSection.className = "internship-input-section hide";
        this.internshipErrorElement.textContent = "";
    }

    submitInternshipForm() {
        const firm = document.getElementById("firm").value;
        const role = document.getElementById("role").value;
        const period = document.getElementById("period").value;

        if (firm && role && period) {
            this.saveInternshipDetails({ firm, role, period });
            this.displayInternshipDetails();
            this.clearInternshipForm();
        } else {
            this.internshipErrorElement.textContent = "All fields are required.";
        }
    }

    saveInternshipDetails(details) {
        let internshipList = JSON.parse(sessionStorage.getItem("internship")) || [];
        internshipList.push(details);
        sessionStorage.setItem("internship", JSON.stringify(internshipList));
    }

    loadInternship() {
        let internshipList = JSON.parse(sessionStorage.getItem("internship")) || [];
        let htmlContent = "";

        internshipList.forEach((internship, index) => {
            if (internship.firm && internship.role && internship.period) {
                htmlContent += `
                    <div class="internship-entry">
                      <p>Firm: ${internship.firm}</p>
                      <p>Role: ${internship.role}</p>
                      <p>Period: ${internship.period}</p>
                      <button class="indelete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
            } else {
                htmlContent += `
                    <div class="internship-entry">
                      <p>Error: Incomplete internship information.</p>
                    </div>
                `;
            }
        });

        if (internshipList.length === 0) {
            htmlContent = `
                <div class="internship-entry">
                  <p>No internship details available.</p>
                </div>
            `;
        }

        this.internshipDisplay.innerHTML = htmlContent;
    }

    displayInternshipDetails() {
        this.loadInternship();
    }

    deleteInternship(index) {
        let internshipList = JSON.parse(sessionStorage.getItem("internship")) || [];
        internshipList.splice(index, 1);
        sessionStorage.setItem("internship", JSON.stringify(internshipList));
        this.loadInternship();
    }
}
