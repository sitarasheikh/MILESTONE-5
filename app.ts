// Select form and output div
const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;

// Adding more fields for Education, Work Experience, and Skills
const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
const educationContainer = document.getElementById('educationContainer') as HTMLDivElement;

const addWorkExperienceBtn = document.getElementById('addWorkExperience') as HTMLButtonElement;
const workExperienceContainer = document.getElementById('workExperienceContainer') as HTMLDivElement;

const addSkillBtn = document.getElementById('addSkill') as HTMLButtonElement;
const skillsContainer = document.getElementById('skillsContainer') as HTMLDivElement;

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

// Form submit event to collect data and display resume
form.addEventListener('submit', function(event: Event) {
  event.preventDefault();

  // Collect form data
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;
  const gender = (document.getElementById('gender') as HTMLSelectElement).value;

  // Collect multiple education, work experience, and skills
  const educations = Array.from(document.getElementsByName('education')).map(input => (input as HTMLInputElement).value);
  const workExperiences = Array.from(document.getElementsByName('workExperience')).map(input => (input as HTMLInputElement).value);
  const skills = Array.from(document.getElementsByName('skills')).map(input => (input as HTMLInputElement).value);

  // Create resume HTML
  const resumeHTML = `
    <h3><span contenteditable="true">${name}</span></h3>
    <p><span contenteditable="true"><strong>Email:</strong> ${email}</span></p>
    <p><span contenteditable="true"><strong>Phone:</strong> ${phone}</span></p>
    <p><span contenteditable="true"><strong>Address:</strong> ${address}</span></p>
    <p><span contenteditable="true"><strong>Gender:</strong> ${gender}</span></p>

    <h4>Education:</h4>
    <ul contenteditable="true">${educations.map(edu => `<li>${edu}</li>`).join('')}</ul>

    <h4>Work Experience:</h4>
    <ul contenteditable="true">${workExperiences.map(exp => `<li>${exp}</li>`).join('')}</ul>

    <h4>Skills:</h4>
    <ul contenteditable="true">${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
  `;

  // Insert resume into output div
  resumeOutput.innerHTML = resumeHTML;
});

// shareable, downdload
// Adding event listeners and form submission handling
document.addEventListener('DOMContentLoaded', () => {
  const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
  const resumeOutput = document.getElementById('resumeOutput') as HTMLElement;
  const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
  const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
  const downloadButton = document.getElementById('download-pdf') as HTMLButtonElement;

  // Function to generate the resume content
  resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLSelectElement).value;

    // Generate the resume content
    const resumeContent = `
      <h3>${name}'s Resume</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Gender:</strong> ${gender}</p>
    `;

    // Output the resume content in the resumeOutput div
    resumeOutput.innerHTML = resumeContent;

    // Generate shareable link
    const baseUrl = window.location.href;
    const dynamicLink = `${baseUrl}?user=${encodeURIComponent(username)}`;
    shareableLink.href = dynamicLink;
    shareableLink.textContent = dynamicLink;

    // Show the shareable link container
    shareableLinkContainer.style.display = 'block';
  });

  // Add PDF download functionality using html2pdf
  downloadButton.addEventListener('click', function () {
    const element = resumeOutput; // The resume section to convert to PDF

    const opt = {
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
downloadButton.addEventListener('click', () => {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (printWindow) {
    printWindow.document.write('<html><head><title>Resume PDF</title></head><body>');
    printWindow.document.write(resumeForm.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
});

