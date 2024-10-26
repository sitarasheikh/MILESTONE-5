"use strict";
// Select form and output div
const form = document.getElementById('resumeForm');
const resumeOutput = document.getElementById('resumeOutput');
const profilePictureInput = document.getElementById('profilePicture');
const shareableLinkContainer = document.getElementById('shareable-link-container');
const shareableLink = document.getElementById('shareable-link');
const downloadButton = document.getElementById('download-pdf');
// Variable to hold the profile picture data
let profilePictureData = null;
// Adding more fields for Education, Work Experience, and Skills
const addEducationBtn = document.getElementById('addEducation');
const educationContainer = document.getElementById('educationContainer');
const addWorkExperienceBtn = document.getElementById('addWorkExperience');
const workExperienceContainer = document.getElementById('workExperienceContainer');
const addSkillBtn = document.getElementById('addSkill');
const skillsContainer = document.getElementById('skillsContainer');
// Functions to dynamically add fields
addEducationBtn.addEventListener('click', () => {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'education';
    newField.placeholder = 'Enter your education';
    educationContainer.appendChild(newField);
});
addWorkExperienceBtn.addEventListener('click', () => {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'workExperience';
    newField.placeholder = 'Enter your work experience';
    workExperienceContainer.appendChild(newField);
});
addSkillBtn.addEventListener('click', () => {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'skills';
    newField.placeholder = 'Enter a skill';
    skillsContainer.appendChild(newField);
});
// Listen for changes in the profile picture input
profilePictureInput.addEventListener('change', () => {
    var _a;
    const file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            // Store the image data in the variable
            profilePictureData = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            const imgElement = document.createElement('img');
            imgElement.src = profilePictureData; // Use stored data
            imgElement.style.width = '150px'; // Set fixed width
            imgElement.style.height = '150px'; // Set fixed height
            imgElement.style.borderRadius = '50%'; // Make image round
            imgElement.style.display = 'block'; // Center the image
            imgElement.style.margin = '0 auto'; // Center image horizontally
            // Insert the image at the top of the resume output
            resumeOutput.prepend(imgElement);
        };
        reader.readAsDataURL(file);
    }
});
// Combined Form submit event to collect data and display resume
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;
    const username = document.getElementById('username').value;
    // Collect multiple education, work experience, and skills
    const educations = Array.from(document.getElementsByName('education')).map(input => input.value);
    const workExperiences = Array.from(document.getElementsByName('workExperience')).map(input => input.value);
    const skills = Array.from(document.getElementsByName('skills')).map(input => input.value);
    // Clear the resume output before adding new content
    resumeOutput.innerHTML = '';
    // Generate resume HTML content
    let resumeHTML = `
    ${profilePictureData ? `<img src="${profilePictureData}" style="width: 150px; height: 150px; border-radius: 50%; display: block; margin: 0 auto;" />` : ''}
    <h3><span contenteditable="true">${name}</span></h3>
    <p><span contenteditable="true"><strong>Email:</strong> ${email}</span></p>
    <p><span contenteditable="true"><strong>Phone:</strong> ${phone}</span></p>
    <p><span contenteditable="true"><strong>Address:</strong> ${address}</span></p>
    <p><span contenteditable="true"><strong>Gender:</strong> ${gender}</span></p>
  `;
    resumeHTML += generateResumeDetails(educations, workExperiences, skills);
    resumeOutput.innerHTML += resumeHTML;
    // Generate shareable link
    const baseUrl = window.location.href;
    const dynamicLink = `${baseUrl}?user=${encodeURIComponent(username)}`;
    shareableLink.href = dynamicLink;
    shareableLink.textContent = dynamicLink;
    // Show the shareable link container
    shareableLinkContainer.style.display = 'block';
});
// Function to generate resume details
function generateResumeDetails(educations, workExperiences, skills) {
    return `
    <h4>Education:</h4>
    <ul contenteditable="true">${educations.map(edu => `<li>${edu}</li>`).join('')}</ul>

    <h4>Work Experience:</h4>
    <ul contenteditable="true">${workExperiences.map(exp => `<li>${exp}</li>`).join('')}</ul>

    <h4>Skills:</h4>
    <ul contenteditable="true">${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
  `;
}
// Download PDF using html2pdf or custom method
downloadButton.addEventListener('click', function () {
    const element = resumeOutput; // The resume section to convert to PDF
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Uncomment the following if using html2pdf
    // html2pdf().from(element).set(opt).save();
    // Custom PDF download logic
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
        printWindow.document.write('<html><head><title>Resume PDF</title></head><body>');
        printWindow.document.write(element.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
});
