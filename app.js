// Select form and output div
var form = document.getElementById('resumeForm');
var resumeOutput = document.getElementById('resumeOutput');
// Adding more fields for Education, Work Experience, and Skills
var addEducationBtn = document.getElementById('addEducation');
var educationContainer = document.getElementById('educationContainer');
var addWorkExperienceBtn = document.getElementById('addWorkExperience');
var workExperienceContainer = document.getElementById('workExperienceContainer');
var addSkillBtn = document.getElementById('addSkill');
var skillsContainer = document.getElementById('skillsContainer');
addEducationBtn.addEventListener('click', function () {
    var newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'education';
    newField.placeholder = 'Enter your education';
    educationContainer.appendChild(newField);
});
addWorkExperienceBtn.addEventListener('click', function () {
    var newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'workExperience';
    newField.placeholder = 'Enter your work experience';
    workExperienceContainer.appendChild(newField);
});
addSkillBtn.addEventListener('click', function () {
    var newField = document.createElement('input');
    newField.type = 'text';
    newField.name = 'skills';
    newField.placeholder = 'Enter a skill';
    skillsContainer.appendChild(newField);
});
// Form submit event to collect data and display resume
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var gender = document.getElementById('gender').value;
    // Collect multiple education, work experience, and skills
    var educations = Array.from(document.getElementsByName('education')).map(function (input) { return input.value; });
    var workExperiences = Array.from(document.getElementsByName('workExperience')).map(function (input) { return input.value; });
    var skills = Array.from(document.getElementsByName('skills')).map(function (input) { return input.value; });
    // Create resume HTML
    var resumeHTML = "\n    <h3><span contenteditable=\"true\">".concat(name, "</span></h3>\n    <p><span contenteditable=\"true\"><strong>Email:</strong> ").concat(email, "</span></p>\n    <p><span contenteditable=\"true\"><strong>Phone:</strong> ").concat(phone, "</span></p>\n    <p><span contenteditable=\"true\"><strong>Address:</strong> ").concat(address, "</span></p>\n    <p><span contenteditable=\"true\"><strong>Gender:</strong> ").concat(gender, "</span></p>\n\n    <h4>Education:</h4>\n    <ul contenteditable=\"true\">").concat(educations.map(function (edu) { return "<li>".concat(edu, "</li>"); }).join(''), "</ul>\n\n    <h4>Work Experience:</h4>\n    <ul contenteditable=\"true\">").concat(workExperiences.map(function (exp) { return "<li>".concat(exp, "</li>"); }).join(''), "</ul>\n\n    <h4>Skills:</h4>\n    <ul contenteditable=\"true\">").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n  ");
    // Insert resume into output div
    resumeOutput.innerHTML = resumeHTML;
});
// shareable, downdload
// Adding event listeners and form submission handling
document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resumeForm');
    var resumeOutput = document.getElementById('resumeOutput');
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    var shareableLink = document.getElementById('shareable-link');
    var downloadButton = document.getElementById('download-pdf');
    // Function to generate the resume content
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get form data
        var username = document.getElementById('username').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var address = document.getElementById('address').value;
        var gender = document.getElementById('gender').value;
        // Generate the resume content
        var resumeContent = "\n      <h3>".concat(name, "'s Resume</h3>\n      <p><strong>Email:</strong> ").concat(email, "</p>\n      <p><strong>Phone:</strong> ").concat(phone, "</p>\n      <p><strong>Address:</strong> ").concat(address, "</p>\n      <p><strong>Gender:</strong> ").concat(gender, "</p>\n    ");
        // Output the resume content in the resumeOutput div
        resumeOutput.innerHTML = resumeContent;
        // Generate shareable link
        var baseUrl = window.location.href;
        var dynamicLink = "".concat(baseUrl, "?user=").concat(encodeURIComponent(username));
        shareableLink.href = dynamicLink;
        shareableLink.textContent = dynamicLink;
        // Show the shareable link container
        shareableLinkContainer.style.display = 'block';
    });
    // Add PDF download functionality using html2pdf
    downloadButton.addEventListener('click', function () {
        var element = resumeOutput; // The resume section to convert to PDF
        var opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        //     // Use html2pdf to download the resume as a PDF
        //     html2pdf().from(element).set(opt).save();
        //   });
        // });
        // PDF download karne ke liye
        downloadButton.addEventListener('click', function () {
            var printWindow = window.open('', '', 'height=600,width=800');
            if (printWindow) {
                printWindow.document.write('<html><head><title>Resume PDF</title></head><body>');
                printWindow.document.write(resumeForm.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        });
    });
});
