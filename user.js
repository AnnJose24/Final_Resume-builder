export class UserManager {
    constructor() {
        this.userDisplay = document.getElementById("user-display");
        this.userFormSection = document.getElementById("user-form-section");
        this.userErrorElement = document.getElementById("user-error");
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => this.loadUser());
        document.getElementById("user-submit-btn").addEventListener("click", () => this.submitUserForm());
        document.getElementById("user-cancel-btn").addEventListener("click", () => this.clearUserForm());
        document.querySelector("input[name='user']").addEventListener("click", () => this.showUserForm());

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("urdelete-btn")) {
                const index = event.target.getAttribute("data-index");
                this.deleteUser(index);
            }
        });
    }

    showUserForm() {
        this.userFormSection.className = "user-input-section show";
        this.userErrorElement.textContent = "";
    }

    clearUserForm() {
        document.getElementById("user-form").reset();
        this.userFormSection.className = "user-input-section hide";
        this.userErrorElement.textContent = "";
    }

    submitUserForm() {
        const userName = document.getElementById("user-name").value;
        
        if (userName) {
            this.saveUserDetails({ userName });
            this.displayUserDetails();
            this.clearUserForm();
        } else {
            this.userErrorElement.textContent = "All fields are required.";
        }
    }

    saveUserDetails(details) {
        let userList = JSON.parse(sessionStorage.getItem("user")) || [];
        userList.push(details);
        sessionStorage.setItem("user", JSON.stringify(userList));
    }

    loadUser() {
        let userList = JSON.parse(sessionStorage.getItem("user")) || [];
        let htmlContent = "";

        userList.forEach((user, index) => {
            if (user.userName) {
                htmlContent += `
                    <div class="user-entry">
                      <p>User Name: ${user.userName}</p>
                      <button class="urdelete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
            } else {
                htmlContent += `
                    <div class="user-entry">
                      <p>Error: Incomplete user information.</p>
                    </div>
                `;
            }
        });

        if (userList.length === 0) {
            htmlContent = `
                <div class="user-entry">
                  <p>No user details available.</p>
                </div>
            `;
        }

        this.userDisplay.innerHTML = htmlContent;
    }

    displayUserDetails() {
        this.loadUser();
    }

    deleteUser(index) {
        let userList = JSON.parse(sessionStorage.getItem("user")) || [];
        userList.splice(index, 1);
        sessionStorage.setItem("user", JSON.stringify(userList));
        this.loadUser();
    }
}
