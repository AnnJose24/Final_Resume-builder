import { ExperienceManager } from "./experience.js";
import { EducationManager } from "./education.js";
import { ContactManager } from "./contact.js";
import { InternshipManager } from "./internship.js";
import { ProfileManager } from "./profile.js";
import { ProjectManager } from "./project.js";
import { ProgrammingLanguageManager} from "./programming.js";
import { UserManager} from "./user.js";



new ExperienceManager();
new EducationManager();
new ContactManager();
new InternshipManager();
new ProfileManager();
new ProjectManager();
new ProgrammingLanguageManager();
new UserManager();




document.getElementById("print-button").addEventListener("click", function() {
    window.print();
});









