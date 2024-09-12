export class ProgrammingLanguageManager {
    constructor() {
        this.programmingDisplay = document.getElementById("programming-display");
        this.programmingFormSection = document.getElementById("programming-form-section");
        this.programmingErrorElement = document.getElementById("programming-error");
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => this.loadProgrammingLanguages());
        document.getElementById("programming-submit-btn").addEventListener("click", () => this.submitProgrammingForm());
        document.getElementById("programming-cancel-btn").addEventListener("click", () => this.clearProgrammingForm());
        document.querySelector("input[name='programming']").addEventListener("click", () => this.showProgrammingForm());

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("pldelete-btn")) {
                const index = event.target.getAttribute("data-index");
                this.deleteProgrammingLanguage(index);
            }
        });
    }

    showProgrammingForm() {
        this.programmingFormSection.className = "programming-input-section show";
        this.programmingErrorElement.textContent = "";
    }

    clearProgrammingForm() {
        document.getElementById("programming-form").reset();
        this.programmingFormSection.className = "programming-input-section hide";
        this.programmingErrorElement.textContent = "";
    }

    submitProgrammingForm() {
        const programmingLanguageName = document.getElementById("programming-language-name").value;
        
        if (programmingLanguageName) {
            this.saveProgrammingDetails({ programmingLanguageName });
            this.displayProgrammingLanguages();
            this.clearProgrammingForm();
        } else {
            this.programmingErrorElement.textContent = "All fields are required.";
        }
    }

    saveProgrammingDetails(details) {
        let programmingList = JSON.parse(sessionStorage.getItem("programmingLanguages")) || [];
        programmingList.push(details);
        sessionStorage.setItem("programmingLanguages", JSON.stringify(programmingList));
    }

    loadProgrammingLanguages() {
        let programmingList = JSON.parse(sessionStorage.getItem("programmingLanguages")) || [];
        let htmlContent = "";

        programmingList.forEach((language, index) => {
            if (language.programmingLanguageName) {
                htmlContent += `
                    <div class="programming-entry">
                      <p>Programming Language: ${language.programmingLanguageName}</p>
                      <button class="pldelete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
            } else {
                htmlContent += `
                    <div class="programming-entry">
                      <p>Error: Incomplete programming language information.</p>
                    </div>
                `;
            }
        });

        if (programmingList.length === 0) {
            htmlContent = `
                <div class="programming-entry">
                  <p>No programming language details available.</p>
                </div>
            `;
        }

        this.programmingDisplay.innerHTML = htmlContent;
    }

    displayProgrammingLanguages() {
        this.loadProgrammingLanguages();
    }

    deleteProgrammingLanguage(index) {
        let programmingList = JSON.parse(sessionStorage.getItem("programmingLanguages")) || [];
        programmingList.splice(index, 1);
        sessionStorage.setItem("programmingLanguages", JSON.stringify(programmingList));
        this.loadProgrammingLanguages();
    }
}
