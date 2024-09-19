export class UserManager {
    constructor() {
        console.log("UserManager initialized");
        this.userDisplay = document.getElementById("user-display");
        this.userFormSection = document.getElementById("user-form-section");
        this.userErrorElement = document.getElementById("user-error");
        this.addUserButton = document.getElementById("add-user-btn"); // Get the plus button
        this.init();
    }

    init() {
        console.log("Initializing...");
        document.addEventListener("DOMContentLoaded", () => this.loadUsers());
        document.getElementById("user-submit-btn").addEventListener("click", () => this.submitUserForm());
        document.getElementById("user-cancel-btn").addEventListener("click", () => this.clearUserForm());
        this.addUserButton.addEventListener("click", () => this.showUserForm());

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("user-delete-btn")) {
                const index = event.target.getAttribute("data-index");
                this.deleteUser(index);
            }
        });
    }

    showUserForm() {
        console.log("Showing user form...");
        this.userFormSection.className = "user-input-section show";
        this.userErrorElement.textContent = "";
    }

    clearUserForm() {
        console.log("Clearing user form...");
        document.getElementById("user-form").reset();
        this.userFormSection.className = "user-input-section hide";
        this.userErrorElement.textContent = "";
    }

    submitUserForm() {
        const userName = document.getElementById("user-name").value;

        if (userName) {
            console.log("Submitting user:", userName);
            this.saveUserDetails({ userName });
            this.displayUserDetails();
            this.clearUserForm();

            // Hide the plus button after submission
            this.addUserButton.style.display = "none"; // Or you can use this.addUserButton.classList.add("hide"); if you have a hide class
        } else {
            this.userErrorElement.textContent = "All fields are required.";
        }
    }

    saveUserDetails(details) {
        let userList = JSON.parse(sessionStorage.getItem("user")) || [];
        userList.push(details);
        sessionStorage.setItem("user", JSON.stringify(userList));
    }

    loadUsers() {
        console.log("Loading users...");
        let userList = JSON.parse(sessionStorage.getItem("user")) || [];
        let htmlContent = "";

        userList.forEach((user, index) => {
            if (user.userName) {
                htmlContent += `
                    <div class="user-entry">
                      <p>User Name: ${user.userName}</p>
                      <button class="user-delete-btn" data-index="${index}">Delete</button>
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
        this.loadUsers();
    }

    deleteUser(index) {
        console.log("Deleting user at index:", index);
        let userList = JSON.parse(sessionStorage.getItem("user")) || [];
        userList.splice(index, 1);
        sessionStorage.setItem("user", JSON.stringify(userList));
        this.loadUsers();
    }
}
