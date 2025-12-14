// Script to add all members from CSV to the database
const fs = require('fs');
const path = require('path');

// Member data from CSV
const membersData = [
  { name: "NITIN MS", role: "Secretary", linkedin: "https://www.linkedin.com/in/nitin-m-s-31a2ba279/" },
  { name: "AKSHAYA NV", role: "Joint Secretary", linkedin: "https://www.linkedin.com/in/akshaya-venkatraman-3065b6349/" },
  { name: "Sangamithra C", role: "Joint Secretary", linkedin: "https://www.linkedin.com/in/sangamithra-c-2b8200355" },
  { name: "Judith Leo Christopher", role: "Treasurer", linkedin: "https://www.linkedin.com/in/judith-leo-christopher-715a42298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Sachin", role: "Director Of Public Relations", linkedin: "https://www.linkedin.com/in/sachin-mohankumar-72304a277" },
  { name: "ADHARSH C", role: "Director of Let's Startup", linkedin: "https://www.linkedin.com/in/adharsh-c-a15b68288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Kiruthika R", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/kiruthika-raja-2679582b7" },
  { name: "Mithra R", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/mithra-r-95818b321" },
  { name: "AMIRDHA VARSHINI N", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/amirdha-varshini-narayanan-b41395320/" },
  { name: "HARIHARAN V", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/hariharan-vijayan-145812323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "KAVIN KAARTHIK Sl", role: "Ideabin Member", linkedin: "(3) Kavin Kaarthik | LinkedIn" },
  { name: "JANANI KANNAN K", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/janani-kannan-k-157833320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Kohila M", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/kohila-9b4841295" },
  { name: "SHAM SUNDAR", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/sham-sundar-senthil-kumar/" },
  { name: "MRITHULA A", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/mrith-a-72b50b320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "HARIHARAN M M", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/hariharan-m-m-795279282" },
  { name: "HARISSH KUMAR P K", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/harissh-kumar-p-k-57a69531a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Vishanth", role: "Event Planning Team", linkedin: "https://www.linkedin.com/in/vishanth-k-385700369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "A-Deepa Manikandan", role: "Outreach Team", linkedin: "https://www.linkedin.com/in/deepa-manikandan-474100369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Asmitha T", role: "Let's Startup Team", linkedin: "https://www.linkedin.com/in/asmitha-t-744000245/" },
  { name: "Mrudhula D", role: "Let's Startup Team", linkedin: "https://www.linkedin.com/in/mrudhula-patil-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "KISHORE B", role: "Event Planning Team", linkedin: "https://www.linkedin.com/in/kishoreb79?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B2cAw2PKAQqSTRFR9fvUALQ%3D%3D" }
];

// Function to find matching image file
function findImageFile(memberName) {
  const imageFiles = [
    'ADHARSH C.jpg',
    'amirdha.jpg',
    'ASMITHA T.jpg',
    'deepa manikandan.jpeg',
    'Hariharan Vijayan HD.jpg',
    'HARIHARAN.png',
    'Harissh Kumar .jpg',
    'janani.jpg',
    'judith.png',
    'Kavin Kaarthik S.webp',
    'kiruthika.png',
    'Kishore.png',
    'KOHILA M.jpg',
    'Mithra.heif',
    'MRITHULA.png',
    'Mrudhula-DS.jpg',
    'nithin.jpeg',
    'rajagopal.jpg',
    'Sachin.jpg',
    'vishanth.png'
  ];

  // Try to match by name (case insensitive, partial match)
  const nameToMatch = memberName.toLowerCase().replace(/[^a-z]/g, '');
  
  for (const file of imageFiles) {
    const fileName = file.toLowerCase().replace(/[^a-z]/g, '');
    if (fileName.includes(nameToMatch.substring(0, 5)) || nameToMatch.includes(fileName.substring(0, 5))) {
      return `/members-photots/${file}`;
    }
  }
  
  return null; // No matching image found
}

// Enhanced member data with image paths
const membersWithImages = membersData.map(member => ({
  ...member,
  imageUrl: findImageFile(member.name)
}));

console.log('Members with matched images:');
membersWithImages.forEach(member => {
  console.log(`${member.name} -> ${member.imageUrl || 'No image found'}`);
});

module.exports = membersWithImages;