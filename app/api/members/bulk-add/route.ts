import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

// Member data from CSV with image mapping
const membersData = [
  { name: "NITIN MS", role: "Secretary", linkedin: "https://www.linkedin.com/in/nitin-m-s-31a2ba279/", imageUrl: "/members-photots/nithin.jpeg" },
  { name: "AKSHAYA NV", role: "Joint Secretary", linkedin: "https://www.linkedin.com/in/akshaya-venkatraman-3065b6349/", imageUrl: null },
  { name: "Sangamithra C", role: "Joint Secretary", linkedin: "https://www.linkedin.com/in/sangamithra-c-2b8200355", imageUrl: null },
  { name: "Judith Leo Christopher", role: "Treasurer", linkedin: "https://www.linkedin.com/in/judith-leo-christopher-715a42298", imageUrl: "/members-photots/judith.png" },
  { name: "Sachin", role: "Director Of Public Relations", linkedin: "https://www.linkedin.com/in/sachin-mohankumar-72304a277", imageUrl: "/members-photots/Sachin.jpg" },
  { name: "ADHARSH C", role: "Director of Let's Startup", linkedin: "https://www.linkedin.com/in/adharsh-c-a15b68288", imageUrl: "/members-photots/ADHARSH C.jpg" },
  { name: "Kiruthika R", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/kiruthika-raja-2679582b7", imageUrl: "/members-photots/kiruthika.png" },
  { name: "Mithra R", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/mithra-r-95818b321", imageUrl: "/members-photots/Mithra.heif" },
  { name: "AMIRDHA VARSHINI N", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/amirdha-varshini-narayanan-b41395320/", imageUrl: "/members-photots/amirdha.jpg" },
  { name: "HARIHARAN V", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/hariharan-vijayan-145812323", imageUrl: "/members-photots/Hariharan Vijayan HD.jpg" },
  { name: "KAVIN KAARTHIK S", role: "Ideabin Member", linkedin: "https://www.linkedin.com/in/kavin-kaarthik", imageUrl: "/members-photots/Kavin Kaarthik S.webp" },
  { name: "JANANI KANNAN K", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/janani-kannan-k-157833320", imageUrl: "/members-photots/janani.jpg" },
  { name: "Kohila M", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/kohila-9b4841295", imageUrl: "/members-photots/KOHILA M.jpg" },
  { name: "SHAM SUNDAR", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/sham-sundar-senthil-kumar/", imageUrl: null },
  { name: "MRITHULA A", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/mrith-a-72b50b320", imageUrl: "/members-photots/MRITHULA.png" },
  { name: "HARIHARAN M M", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/hariharan-m-m-795279282", imageUrl: "/members-photots/HARIHARAN.png" },
  { name: "HARISSH KUMAR P K", role: "Podcast Team", linkedin: "https://www.linkedin.com/in/harissh-kumar-p-k-57a69531a", imageUrl: "/members-photots/Harissh Kumar .jpg" },
  { name: "Vishanth", role: "Event Planning Team", linkedin: "https://www.linkedin.com/in/vishanth-k-385700369", imageUrl: "/members-photots/vishanth.png" },
  { name: "Deepa Manikandan", role: "Outreach Team", linkedin: "https://www.linkedin.com/in/deepa-manikandan-474100369", imageUrl: "/members-photots/deepa manikandan.jpeg" },
  { name: "Asmitha T", role: "Let's Startup Team", linkedin: "https://www.linkedin.com/in/asmitha-t-744000245/", imageUrl: "/members-photots/ASMITHA T.jpg" },
  { name: "Mrudhula D", role: "Let's Startup Team", linkedin: "https://www.linkedin.com/in/mrudhula-patil-", imageUrl: "/members-photots/Mrudhula-DS.jpg" },
  { name: "KISHORE B", role: "Event Planning Team", linkedin: "https://www.linkedin.com/in/kishoreb79", imageUrl: "/members-photots/Kishore.png" }
];

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // Simple password check (you should use environment variable)
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];
    const col = 'members';

    // Clear existing members first (optional)
    const existingSnapshot = await firestore.collection(col).get();
    const batch = firestore.batch();
    
    existingSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();

    // Add all new members
    for (const memberData of membersData) {
      try {
        const docRef = firestore.collection(col).doc();
        const data = {
          name: memberData.name,
          role: memberData.role,
          linkedin: memberData.linkedin,
          imageUrl: memberData.imageUrl,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        
        await docRef.set(data);
        results.push({ success: true, id: docRef.id, name: memberData.name });
      } catch (error) {
        results.push({ success: false, name: memberData.name, error: error.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Added ${results.filter(r => r.success).length} members successfully`,
      results 
    });
  } catch (err: any) {
    console.error('Bulk add error:', err);
    return NextResponse.json({ error: err.message || 'Failed to add members' }, { status: 500 });
  }
}