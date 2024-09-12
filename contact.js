export class ContactManager {
    constructor() {
      this.contactDisplay = document.getElementById("contact-display");
      this.contactFormSection = document.getElementById("contact-form-section");
      this.contactErrorElement = document.getElementById("contact-error");
      this.init();
    }
  
    init() {
      document.addEventListener("DOMContentLoaded", () => this.loadContacts());
      document.getElementById("submit-btn").addEventListener("click", () => this.submitContactForm());
      document.getElementById("cancel-btn").addEventListener("click", () => this.clearContactForm());
      document.querySelector("input[name='answer']").addEventListener("click", () => this.showContactForm());
  
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
          const index = event.target.getAttribute("data-index");
          this.deleteContact(index);
        }
      });
    }
  
    showContactForm() {
      this.contactFormSection.className = "phone-number-input-section show";
      this.contactErrorElement.textContent = "";
    }
  
    clearContactForm() {
      document.getElementById("contact-form").reset();
      this.contactFormSection.className = "phone-number-input-section hide";
      this.contactErrorElement.textContent = "";
    }
  
    submitContactForm() {
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const linkedin = document.getElementById("linkedin").value;
      const address = document.getElementById("address").value;
  
      if (this.validatePhoneNumber(phone)) {
        this.saveContactDetails({ phone, email, linkedin, address });
        this.displayContactDetails();
        this.clearContactForm();
      } else {
        this.contactErrorElement.textContent = "Invalid phone number. Please enter a valid phone number.";
      }
    }
  
    validatePhoneNumber(phoneNumber) {
      const phonePattern = /^[0-9]{10}$/;
      return phonePattern.test(phoneNumber);
    }
  
    saveContactDetails(details) {
      let contactList = JSON.parse(sessionStorage.getItem("contacts")) || [];
      contactList.push(details);
      sessionStorage.setItem("contacts", JSON.stringify(contactList));
    }
  
    loadContacts() {
      let contactList = JSON.parse(sessionStorage.getItem("contacts")) || [];
      let htmlContent = "";
  
      contactList.forEach((contact, index) => {
        if (contact.phone && contact.email && contact.linkedin && contact.address) {
          htmlContent += `
              <div class="phone-entry">
                <p>Phone: ${contact.phone}</p>
                <p>Email: ${contact.email}</p>
                <p>LinkedIn: ${contact.linkedin}</p>
                <p>Address: ${contact.address}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
              </div>
            `;
        } else {
          htmlContent += `
              <div class="phone-entry">
                <p>Error: Incomplete contact information.</p>
              </div>
            `;
        }
      });
  
      if (contactList.length === 0) {
        htmlContent = `
            <div class="phone-entry">
              <p>No contacts available.</p>
            </div>
          `;
      }
  
      this.contactDisplay.innerHTML = htmlContent;
    }
  
    displayContactDetails() {
      this.loadContacts();
    }
  
    deleteContact(index) {
      let contactList = JSON.parse(sessionStorage.getItem("contacts")) || [];
      contactList.splice(index, 1);
      sessionStorage.setItem("contacts", JSON.stringify(contactList));
      this.loadContacts();
    }
  }