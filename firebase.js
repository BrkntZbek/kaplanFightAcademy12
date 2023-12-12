import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  images,
} from "firebase/storage";
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

const addBlog = async (title, contents, image) => {
  const blogCollection = firestore.collection('Blog');

  // Sadece koleksiyon referansını kullanarak otomatik bir doküman ID'si oluşturulur
  const blogDoc = doc(blogCollection);

  await setDoc(blogDoc, {
    id:blogDoc.id,
    icerik: contents,
    baslik: title,
    photoUrl: image,
  });
};

const listFiles = async (setFiles) => {
  try {
    const blogCollection = await firestore.collection('Blog').get();
    const blogData = blogCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(blogData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const uploadToFirebase = async (uri, name, onProgress) => {
  try {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const storageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              downloadUrl,
              metadata: uploadTask.snapshot.metadata,
            });
          } catch (error) {
            console.error("Download URL error:", error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
const uploadImage = async (imageUri, setImage, setUploading) => {
  try {
    setUploading(true);

    // imageUri'den "file://" kısmını kaldır
    const uri = imageUri.replace('file://', '');

    const fileName = uri.split("/").pop();
    const uploadResp = await uploadToFirebase(uri, fileName, (v) => console.log(v));
    const downloadUrl = await uploadResp.downloadUrl;
    console.log('Dosya URL:', downloadUrl);

    // setImage(downloadUrl); // Eğer bu URL'yi bir nesne içinde saklamak istiyorsanız bu satırı kullanın
    // Eğer sadece URL'yi bir string olarak saklamak istiyorsanız aşağıdaki satırı kullanın:
    setImage(downloadUrl.toString());
  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    setUploading(false);
  }
};


const todaysLessons = async (setLessons) => {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Aylar 0'dan başlar, bu nedenle +1 eklenir
    const currentYear = currentDate.getFullYear();
    // Tarihi belirli bir formatta oluştur
    const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;
  
    const todaysLessonsSnapsShot = await firestore
      .collection("Lessons")
      .where("tarih", "==", formattedDate)
      .get();
  
    if (!todaysLessonsSnapsShot.empty) {
      // Belge varsa
      const lessons = todaysLessonsSnapsShot.docs.map(doc => doc.data());
      setLessons(lessons);
    } else {
      console.log('Paket bulunamadı');
      setLessons([]);
    }
  } catch (error) {
    // Hata durumunu daha ayrıntılı bir şekilde ele alabilirsiniz
    console.error('Hata:', error);
    setLessons(null);
  }
};

const getWeekRange = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay()); // Haftanın başlangıcı (Pazar günü)
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() - date.getDay() + 6); // Haftanın sonu (Cumartesi günü)

  return { startOfWeek, endOfWeek };
};

const weeklyLessons = async (setLessons) => {
  try {
    const currentDate = new Date();
    const { startOfWeek, endOfWeek } = getWeekRange(currentDate);

    // Tarihleri belirli bir formatta oluştur
    const formattedStartOfWeek = `${startOfWeek.getDate()}.${startOfWeek.getMonth() + 1}.${startOfWeek.getFullYear()}`;
    const formattedEndOfWeek = `${endOfWeek.getDate()}.${endOfWeek.getMonth() + 1}.${endOfWeek.getFullYear()}`;
     console.log('İlk TarihÇ ',formattedStartOfWeek)
     console.log('son tarih: ',formattedEndOfWeek)
    const weeklyLessonsSnapshot = await firestore
      .collection("Lessons")
      .where("tarih", ">=", formattedStartOfWeek)
      .where("tarih", "<=", formattedEndOfWeek)
      .get();

    if (!weeklyLessonsSnapshot.empty) {
      // Belge varsa
      const lessons = weeklyLessonsSnapshot.docs.map(doc => doc.data());
      setLessons(lessons);
    } else {
      console.log('Haftalık ders paketi bulunamadı');
      setLessons([]);
    }
  } catch (error) {
    // Hata durumunu daha ayrıntılı bir şekilde ele alabilirsiniz
    console.error('Hata:', error);
    setLessons(null);
  }
};
const monthlyLessons = async (setLessons) => {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Tarihleri belirli bir formatta oluştur
    const formattedStartOfMonth = `${startOfMonth.getDate()}.${startOfMonth.getMonth() + 1}.${startOfMonth.getFullYear()}`;
    const formattedEndOfMonth = `${endOfMonth.getDate()}.${endOfMonth.getMonth() + 1}.${endOfMonth.getFullYear()}`;

    const monthlyLessonsSnapshot = await firestore
      .collection("Lessons")
      .where("tarih", ">=", formattedStartOfMonth)
      .where("tarih", "<=", formattedEndOfMonth)
      .get();

    if (!monthlyLessonsSnapshot.empty) {
      // Belge varsa
      const lessons = monthlyLessonsSnapshot.docs.map(doc => doc.data());
      setLessons(lessons);
    } else {
      console.log('Bu ayın ders paketi bulunamadı');
      setLessons([]);
    }
  } catch (error) {
    // Hata durumunu daha ayrıntılı bir şekilde ele alabilirsiniz
    console.error('Hata:', error);
    setLessons(null);
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = getStorage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore,storage,fetchTeacher,monthlyLessons,weeklyLessons,addBlog,todaysLessons,fetchUserPackage,teachALesson,fetchLessons,updateStudentsLesson,fetchStudents,updateStudentTeacher,fetchPackageInfo,cancelledLesson, uploadToFirebase, listFiles, uploadImage };
