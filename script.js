// Form aur resume elements ko select karo
const form = document.getElementById('resume-form');
const resumeContainer = document.getElementById('resume-container');
const resumeName = document.getElementById('resume-name');
const resumeBio = document.getElementById('resume-bio');
const resumeExperience = document.getElementById('resume-experience');
const downloadBtn = document.getElementById('download-pdf');

// Form submit hone par
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // User ke input le lo
  const nameInput = document.getElementById('name').value;
  const bioInput = document.getElementById('bio').value;
  const experienceInput = document.getElementById('experience').value;

  // Resume ko display karo
  resumeName.textContent = nameInput;
  resumeBio.textContent = bioInput;
  resumeExperience.textContent = experienceInput;

  form.classList.add('hidden');
  resumeContainer.classList.remove('hidden');

  // URL ko update karo username ke saath
  const newUrl = `${window.location.origin}/?username=${encodeURIComponent(nameInput)}`;
  window.history.pushState({}, '', newUrl);

  console.log('Shareable URL:', newUrl);
});

// PDF download karne ke liye
downloadBtn.addEventListener('click', () => {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (printWindow) {
    printWindow.document.write('<html><head><title>Resume PDF</title></head><body>');
    printWindow.document.write(resumeContainer.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
});
