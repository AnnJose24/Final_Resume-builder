export class ProjectManager {
    constructor() {
        this.projectDisplay = document.getElementById("project-display");
        this.projectFormSection = document.getElementById("project-form-section");
        this.projectErrorElement = document.getElementById("project-error");
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => this.loadProject());
        document.getElementById("project-submit-btn").addEventListener("click", () => this.submitProjectForm());
        document.getElementById("project-cancel-btn").addEventListener("click", () => this.clearProjectForm());
        document.querySelector("input[name='project']").addEventListener("click", () => this.showProjectForm());

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("prdelete-btn")) {
                const index = event.target.getAttribute("data-index");
                this.deleteProject(index);
            }
        });
    }

    showProjectForm() {
        this.projectFormSection.className = "project-input-section show";
        this.projectErrorElement.textContent = "";
    }

    clearProjectForm() {
        document.getElementById("project-form").reset();
        this.projectFormSection.className = "project-input-section hide";
        this.projectErrorElement.textContent = "";
    }

    submitProjectForm() {
        const projectName = document.getElementById("project-name").value;
        
        if (projectName) {
            this.saveProjectDetails({ projectName });
            this.displayProjectDetails();
            this.clearProjectForm();
        } else {
            this.projectErrorElement.textContent = "All fields are required.";
        }
    }

    saveProjectDetails(details) {
        let projectList = JSON.parse(sessionStorage.getItem("project")) || [];
        projectList.push(details);
        sessionStorage.setItem("project", JSON.stringify(projectList));
    }

    loadProject() {
        let projectList = JSON.parse(sessionStorage.getItem("project")) || [];
        let htmlContent = "";

        projectList.forEach((project, index) => {
            if (project.projectName) {
                htmlContent += `
                    <div class="project-entry">
                      <p>Project Name: ${project.projectName}</p>
                      <button class="prdelete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
            } else {
                htmlContent += `
                    <div class="project-entry">
                      <p>Error: Incomplete project information.</p>
                    </div>
                `;
            }
        });

        if (projectList.length === 0) {
            htmlContent = `
                <div class="project-entry">
                  <p>No project details available.</p>
                </div>
            `;
        }

        this.projectDisplay.innerHTML = htmlContent;
    }

    displayProjectDetails() {
        this.loadProject();
    }

    deleteProject(index) {
        let projectList = JSON.parse(sessionStorage.getItem("project")) || [];
        projectList.splice(index, 1);
        sessionStorage.setItem("project", JSON.stringify(projectList));
        this.loadProject();
    }
}
