import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage,updateDoc } from 'firebase/storage';
import 'firebase/compat/storage';
import { useEffect } from 'react';
import { doc, setDoc } from '@firebase/firestore';




const firebaseConfig = {
  apiKey: "AIzaSyCZbSRis4NANiJQxqwg-Z5sMQQyhZveSw0",
  authDomain: "kaplanfightacademy-86b8e.firebaseapp.com",
  projectId: "kaplanfightacademy-86b8e",
  storageBucket: "kaplanfightacademy-86b8e.appspot.com",
  messagingSenderId: "120319904391",
  appId: "1:120319904391:web:5eb488d55c936eb6668622"
};
const fetchStudents = async ( setStudents) => {
  try {
    const studentsCollection = await firestore.collection('userss').get();
    const studentsData = studentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentsData);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

const fetchPackageInfo = async (selectedStudent, setPackageInfo) => {
  try {
    if (!selectedStudent.paketId) {
      console.log('Öğrencinin paket bilgisi bulunmamaktadır.');
      setPackageInfo(null);
      return;
    }

    const packageSnapshot = await firestore
      .collection("PackagesSold")
      .where("belgeId", "==", selectedStudent.paketId)
      .where("aktif", "==", "Aktif")
      .get();

    if (!packageSnapshot.empty) {
      const packageData = packageSnapshot.docs[0].data();
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






if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = getStorage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore,storage,updateStudentsLesson,fetchStudents,updateStudentTeacher,fetchPackageInfo};