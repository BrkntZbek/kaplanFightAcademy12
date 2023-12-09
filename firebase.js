import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore'; // Değişiklik burada
import 'firebase/compat/firestore'; // Bu satırı ekleyin
import 'firebase/compat/storage'; // Bu satırı ekleyin
import { doc, setDoc } from '@firebase/firestore';




const firebaseConfig = {
  apiKey: "AIzaSyCZbSRis4NANiJQxqwg-Z5sMQQyhZveSw0",
  authDomain: "kaplanfightacademy-86b8e.firebaseapp.com",
  projectId: "kaplanfightacademy-86b8e",
  storageBucket: "kaplanfightacademy-86b8e.appspot.com",
  messagingSenderId: "120319904391",
  appId: "1:120319904391:web:5eb488d55c936eb6668622"
};
const fetchStudents = async (setStudents) => {
  try {
    const studentsCollection = await firestore.collection('userss').get();
    const studentsData = studentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentsData);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};


const cancelledLesson = async (lesson) => {
  const fetchPackageOwner = await firestore.collection('userss')
    .where("id", "==", lesson.ogrenciId)
    .get();

  const userDoc = fetchPackageOwner.docs[0];

  if (userDoc) {
    const totalLesson = userDoc.data().toplamDers || 0; // Mevcut değeri alır (varsayılan olarak 0)
    await updateDoc(doc(firestore, 'Lessons', lesson.id), { durum: "İptal" });
    await updateDoc(doc(firestore, 'userss', userDoc.id), { toplamDers: totalLesson + 1 });
  }
};
   
const fetchLessons = async (SetLessons) => {
  try {
    const lessonsCollection = await firestore.collection('Lessons').get();
    const lessonsData = lessonsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    SetLessons(lessonsData);
    console.log(lessonsData)
  } catch (error) {
    // Hata yönetimi burada yapılabilir
    console.error('Error fetching lessons:', error);
  }
};


const fetchUserPackage = async (selectedStudent, setPackageInfo) => {
  if (selectedStudent) {
    const querySnapshot = await firestore
      .collection('PackagesSold')
      .where('SatilanKisiID', '==', selectedStudent.id)
      .where('aktif', '==', 'Aktif')
      .get();

    // Veri var mı kontrolü
    if (!querySnapshot.empty) {
      // İlk belgeyi seçiyoruz, ancak birden çok belge varsa bu kısmı ihtiyaca göre güncelleyebilirsiniz.
      const firstDocument = querySnapshot.docs[0].data();
      
      // Veriyi state'e set ediyoruz
      setPackageInfo(firstDocument);
    } else {
      // Veri bulunamadıysa state'i boş bırakabilir veya istediğiniz bir değeri atayabilirsiniz.
      setPackageInfo(null);
    }
  }
};
const fetchPackageInfo = async (selectedStudent, setPackageInfo) => {
  try {
    if (!selectedStudent.data || !selectedStudent.data().paketId) {
      console.log('Öğrencinin paket bilgisi bulunmamaktadır.');
      setPackageInfo(null);
      return;
    }
     console.log('ss',selectedStudent)
    const packageSnapshot = await firestore
      .collection("PackagesSold")
      .where("belgeId", "==", selectedStudent.data().paketId)
      .where("aktif", "==", "Aktif")
      .get();

    if (!packageSnapshot.empty) {
      const packageData = packageSnapshot.docs[0].data();
      console.log('packageData:', packageData);
      setPackageInfo(packageData);
    } else {
      console.log('Paket bulunamadı');
      setPackageInfo(null);
    }
  } catch (error) {
    console.error("Paket bilgilerini alma hatası:", error);
  }
};

const updateStudentsLesson = async (selectedStudent) =>{
  const numberOfLesson = selectedStudent.ToplamDers + 1;
  await updateDoc(doc(firestore, 'userss', selectedStudent.id), { ToplamDers: numberOfLesson });
}

const updateStudentTeacher = async (selectedStudent) => {
  console.log(selectedStudent.yetki)
  try {
    if (selectedStudent.yetki !== "Hoca") {
      await firestore.collection('userss').doc(selectedStudent.id).update({ yetki: 'Hoca' });
      console.log('Hocalık yetkisi güncellendi.');
      console.log('Yeni Yetki: ',selectedStudent.yetki)
      const teachersCollection = firestore.collection('Teachers');
      await setDoc(doc(teachersCollection,selectedStudent.id),{
        id:selectedStudent.id,
        name:selectedStudent.name,
        telefon:selectedStudent.telefon,
        email:selectedStudent.email,
        boy:selectedStudent.boy,
        kilo:selectedStudent.kilo,

        toplamDers:0,
        toplamGider:0,
        toplamOgrenci:0,
        yetki:"Hoca",
        egitimAlani:"",

      });
    } else {
      console.log("Seçtiğiniz Kullanıcının Hocalık Yetkisi zaten bulunmaktadır.");
    }
  } catch (error) {
    console.error('Firestore güncelleme hatası:', error);
  }
};

 const fetchTeacher =  async (setTeachers) =>{
  const teacherList=[];
  try {
    const teachersCollection = await firestore.collection('Teachers').get();
    const teachersData = teachersCollection.docs.map(doc => ({id:doc.id, ...doc.data()}));
    setTeachers(teachersData)
  } catch (error) {
    console.error('Error Teacher students:', error);
  }
 }

const teachALesson = async (lesson,lessonDetail) =>{
   if(lesson)
   {
    await updateDoc(doc(firestore,'Lessons',lesson.id),{durum:"İşlendi",ayrinti:lessonDetail});
   }
}

const addBlog = async (title, contents) => {
  const blogCollection = firestore.collection('Blog');
  
  // Sadece koleksiyon referansını kullanarak otomatik bir doküman ID'si oluşturulur
  const blogDoc = doc(blogCollection);

  await setDoc(blogDoc, {
    id:blogDoc.id,
    icerik: contents,
    baslik: title,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Recep_Tayyip_Erdogan_in_Ukraine.jpg"
  });
};
const fetchBlog = async() =>{
  
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = getStorage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore,storage,fetchTeacher,addBlog,fetchUserPackage,teachALesson,fetchLessons,updateStudentsLesson,fetchStudents,updateStudentTeacher,fetchPackageInfo,cancelledLesson};