import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateDoc } from "firebase/firestore"; // Değişiklik burada
import "firebase/compat/firestore"; // Bu satırı ekleyin
import "firebase/compat/storage"; // Bu satırı ekleyin
import { Timestamp, doc, setDoc } from "@firebase/firestore";
const { serverTimestamp } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyCZbSRis4NANiJQxqwg-Z5sMQQyhZveSw0",
  authDomain: "kaplanfightacademy-86b8e.firebaseapp.com",
  projectId: "kaplanfightacademy-86b8e",
  storageBucket: "kaplanfightacademy-86b8e.appspot.com",
  messagingSenderId: "120319904391",
  appId: "1:120319904391:web:5eb488d55c936eb6668622",
};
const fetchStudents = async (setStudents) => {
  try {
    const studentsCollection = await firestore.collection("userss").get();
    const studentsData = studentsCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentsData);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const fetchIncome = async (setIncome) => {
  try {
    const IncomeCollection = await firestore.collection("Muhasebe").get();
    const incomeData = IncomeCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIncome(incomeData);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const cancelledLesson = async (lesson) => {
  try {
    const fetchPackageOwner = await firestore
      .collection("userss")
      .where("id", "==", lesson.ogrenciId)
      .get();

    if (fetchPackageOwner.docs.length > 0) {
      const userDoc = fetchPackageOwner.docs[0];
      const totalLesson = userDoc.data().toplamDers || 0; // Mevcut değeri alır (varsayılan olarak 0)

      await updateDoc(doc(firestore, "Lessons", lesson.id), { durum: "İptal" });
      await updateDoc(doc(firestore, "userss", userDoc.id), {
        toplamDers: totalLesson + 1,
      });
    } else {
      console.error("User not found with id:", lesson.ogrenciId);
    }
  } catch (error) {
    console.error("Error in cancelledLesson:", error);
  }
};

const fetchLessons = async (setLessons) => {
  try {
    const lessonsCollection = await firestore.collection("Lessons").get();
    const lessonData = lessonsCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLessons(lessonData);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error; // Hata durumunda hatayı yukarı iletebilirsiniz
  }
};

const addLesson = async (
  selectedDate,
  selectedStudent,
  selectedTeacher,
  selectedTime,
  packageInfo,
) => {
  const Lessons = firestore.collection("Lessons");
  
  // datetimepicker'dan seçilen tarihi al
  // Bu örnekte, dateObject değişkeni datetimepicker'dan gelen değeri temsil eder.
  // datetimepicker'dan gelen değer ne olursa, onu uygun şekilde işlemeniz gerekiyor.
  const dateObject = selectedDate; // Bu kısmı datetimepicker'dan gelen değere göre değiştirin

  // dateObject bir Date objesi mi kontrol et
  const formattedDate =
    dateObject instanceof Date ? dateObject : dateObject.toDate(); // değilse Firebase Timestamp objesini Date objesine çevir
  

  const lessonRef = doc(Lessons);
  await setDoc(lessonRef, {
    dersId: lessonRef.id,
    ogrenciId: selectedStudent.id,
    ogrenci: selectedStudent.name,
    hoca: selectedTeacher,
    tarih: formattedDate,
    saat: selectedTime,
    durum: "İşlenmedi",
    ayrinti: "",
    calisilanBolge:"",
  });

  const updatedKalanDers = packageInfo.KalanDers - 1;
  const packageToUpdate = packageInfo.belgeId;

  try {
    await updateDoc(doc(firestore, "PackagesSold", packageToUpdate), {
      KalanDers: updatedKalanDers,
    });
    updateStudentsLesson(selectedStudent);
  } catch (error) {
    console.error("Firestore güncelleme hatası:", error);
  }
};
const addIncome = async (aciklama, fiyat, durum) => {
  try {
    const formattedDate = Timestamp.fromDate(new Date());

    console.log(aciklama, fiyat, durum);

    const incomeCollection = firestore.collection("Muhasebe");
    const incomeDoc = doc(incomeCollection);

    await setDoc(incomeDoc, {
      id: incomeDoc.id,
      aciklama: aciklama,
      fiyat: fiyat,
      tarih: formattedDate,
      durum: durum,
    });

    console.log("Yeni eklenen gelirin ID:", incomeDoc.id);
  } catch (error) {
    console.error("Error adding income:", error);
  }
};
const addLessonPackage = async (paketIsmi, paketFiyati, paketSuresi, dersSayisi) => {
  try {
    const packageCollection = firestore.collection('LessonPackage');
    const packageDoc = doc(packageCollection);
    
     await setDoc(packageDoc, {
      dersSayisi: dersSayisi,
      paketFiyati: paketFiyati,
      paketSuresi: paketSuresi,
      paketTuru: paketIsmi,
    });

    console.log("Paket başarıyla eklendi. Belge ID:", packageDoc.id);
  } catch (error) {
    console.error("Hata addLessonPackage:", error);
  }
}
const fetchUserPackage = async (selectedStudent, setPackageInfo) => {
  if (selectedStudent) {
    const querySnapshot = await firestore
      .collection("PackagesSold")
      .where("SatilanKisiID", "==", selectedStudent.id)
      .where("aktif", "==", "Aktif")
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

const fetchUserLesson = async (userId, setLesson) => {
  if (userId) {
    try {
      const lessonCollection = await firestore
        .collection("Lessons")
        .where("ogrenciId", "==", userId)
        .get();

      const lessonData = lessonCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLesson(lessonData);
    } catch (error) {
      console.error("Fetch User Lesson Error:", error);
    }
  }
};

const fetchPackageInfo = async (selectedStudent, setPackageInfo) => {
  try {
    if (!selectedStudent.data || !selectedStudent.data().paketId) {
      console.log("Öğrencinin paket bilgisi bulunmamaktadır.");
      setPackageInfo(null);
      return;
    }

    const packageSnapshot = await firestore
      .collection("PackagesSold")
      .where("belgeId", "==", selectedStudent.data().paketId)
      .where("aktif", "==", "Aktif")
      .get();

    if (!packageSnapshot.empty) {
      const packageData = packageSnapshot.docs[0].data();
      setPackageInfo(packageData);
    } else {
      setPackageInfo(null);
    }
  } catch (error) {
    console.error("Paket bilgilerini alma hatası:", error);
  }
};

const updateStudentsLesson = async (selectedStudent) => {
  const numberOfLesson = selectedStudent.toplamDers + 1;
  await updateDoc(doc(firestore, "userss", selectedStudent.id), {
    toplamDers: numberOfLesson,
  });
  console.log("ders eklendi:", numberOfLesson);
};

const updateStudentTeacher = async (selectedStudent) => {
  try {
    if (selectedStudent.yetki !== "Hoca") {
      await firestore
        .collection("userss")
        .doc(selectedStudent.id)
        .update({ yetki: "Hoca" });
      const teachersCollection = firestore.collection("Teachers");
      await setDoc(doc(teachersCollection, selectedStudent.id), {
        id: selectedStudent.id,
        name: selectedStudent.name,
        telefon: selectedStudent.telefon,
        email: selectedStudent.email,
        boy: selectedStudent.boy,
        kilo: selectedStudent.kilo,

        toplamDers: 0,
        toplamGider: 0,
        toplamOgrenci: 0,
        yetki: "Hoca",
        egitimAlani: "",
      });
    } else {
      console.log(
        "Seçtiğiniz Kullanıcının Hocalık Yetkisi zaten bulunmaktadır.",
      );
    }
  } catch (error) {
    console.error("Firestore güncelleme hatası:", error);
  }
};

const fetchTeacher = async (setTeachers) => {
  const teacherList = [];
  try {
    const teachersCollection = await firestore.collection("Teachers").get();
    const teachersData = teachersCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTeachers(teachersData);
  } catch (error) {
    console.error("Error Teacher students:", error);
  }
};
const fetchWage = async (setWage) => {
  try {
    // Firestore koleksiyonunu referans al
    const wageCollection = await firestore.collection('ucret').get();

    // İlk belgeyi al ve veriyi şekillendir
    const firstWageDoc = wageCollection.docs[0];
    const firstWageData = firstWageDoc ? { id: firstWageDoc.id, ...firstWageDoc.data() } : null;

   
    setWage(firstWageData);
  } catch (error) {
    console.error("Error FetchWage:", error);
  }
}
const updateWage = async ( hocaDersUcreti, duetUcreti) => {
  try {
    const wageCollection = await firestore.collection('ucret').get();
    const firstWageDoc = wageCollection.docs[0];

   
    if (hocaDersUcreti === null && duetUcreti === null ) {
      console.log("dersUcreti veya duetUcreti boş. İşlem yapılmayacak.");
      return;
    }
    else{

      if(hocaDersUcreti !== null && duetUcreti === null  ){
        if (firstWageDoc) {
          const wageRef = doc(firestore, 'ucret', firstWageDoc.id);
          await updateDoc(wageRef, {
            dersUcreti: hocaDersUcreti,
           
          });
          console.log("Ders Ücreti başarıyla güncellendi.");
        } else {
          console.error("Ücret belgesi bulunamadı.");
        }
      }
  
      else if(hocaDersUcreti === null && duetUcreti !== null){
        if (firstWageDoc) {
          const wageRef = doc(firestore, 'ucret', firstWageDoc.id);
          await updateDoc(wageRef, {
            duetUcreti: duetUcreti,
           
          });
          console.log("hoca ücreti başarıyla güncellendi.");
        } else {
          console.error("Ücret belgesi bulunamadı.");
        }
      }
      else {
        if (firstWageDoc) {
          const wageRef = doc(firestore, 'ucret', firstWageDoc.id);
          await updateDoc(wageRef, {
            duetUcreti: duetUcreti,
            dersUcreti: hocaDersUcreti,
          });
          console.log("Tüm ücretler  başarıyla güncellendi.");
        } else {
          console.error("Ücret belgesi bulunamadı.");
        }
      }
    }
    
    
    
    
  } catch (error) {
    console.error("Hata updateWage:", error);
  }
};




const teachALesson = async (lesson, lessonDetail, areaChartString) => {
  try {
    console.log('TeachALesson Girildi')
    if (lesson && lessonDetail) {
      const lessonRef = doc(firestore, "Lessons", lesson.id);
      await updateDoc(lessonRef, {
        durum: "İşlendi",
        ayrinti: lessonDetail,
        calisilanBolge: areaChartString,
      });

      const Muhasebe = firestore.collection("Muhasebe");
      const muhasebeRef = doc(Muhasebe);
      await setDoc(muhasebeRef, {
        id: muhasebeRef.id,
        aciklama: `${lesson.hoca} Ders Ödemesi`,
        durum: "Gider",
        fiyat: 200,
        tarih: serverTimestamp(),
      });
      console.log('İşlem tamam')
    } else {
      // Eğer lesson ya da lessonDetail yoksa bir şey yapma
    }
  } catch (error) {
    console.error(error);
  }
};

const addBlog = async (title, contents, image) => {
  const blogCollection = firestore.collection("Blog");

  // Sadece koleksiyon referansını kullanarak otomatik bir doküman ID'si oluşturulur
  const blogDoc = doc(blogCollection);

  await setDoc(blogDoc, {
    id: blogDoc.id,
    icerik: contents,
    baslik: title,
    photoUrl: image,
  });
};



const listFiles = async (setFiles) => {
  try {
    const blogCollection = await firestore.collection("Blog").get();
    const blogData = blogCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFiles(blogData);
  } catch (error) {
    console.error("Error fetching data:", error);
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        },
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
    const uri = imageUri.replace("file://", "");

    const fileName = uri.split("/").pop();
    const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
      console.log(v),
    );
    const downloadUrl = await uploadResp.downloadUrl;
    console.log("Dosya URL:", downloadUrl);

    // setImage(downloadUrl); // Eğer bu URL'yi bir nesne içinde saklamak istiyorsanız bu satırı kullanın
    // Eğer sadece URL'yi bir string olarak saklamak istiyorsanız aşağıdaki satırı kullanın:
    setImage(downloadUrl.toString());
  } catch (error) {
    console.error("Hata oluştu:", error);
  } finally {
    setUploading(false);
  }
};

const todaysLessons = async (setLessons) => {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );

    const lessonsCollection = firestore.collection("Lessons");
    const todaysLessonsSnapsShot = await lessonsCollection
      .where("tarih", ">=", startOfDay)
      .where("tarih", "<", endOfDay)
      .get();

    if (!todaysLessonsSnapsShot.empty) {
      const lessons = todaysLessonsSnapsShot.docs.map((doc) => doc.data());
      setLessons(lessons);
    } else {
      console.log("Bugün ders bulunamadı");
      setLessons([]);
    }
  } catch (error) {
    console.error("Hata oluştu:", error);

    // Hatanın içeriğini daha detaylı kontrol etmek için
    if (error.code === "invalid-argument") {
      console.error("Geçersiz argüman hatası:", error.message);
    }

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

const getFormattedDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Firestore'da saklanan tarih formatına uygun olarak ayarlayın (örneğin, "YYYY-MM-DD")
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};
const getMonthRange = (date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { startOfMonth, endOfMonth };
};

const monthlyLessons = async (setLessons) => {
  try {
    const currentDate = new Date();
    const { startOfMonth, endOfMonth } = getMonthRange(currentDate);

    const monthlyLessonsSnapshot = await firestore
      .collection("Lessons")
      .where("tarih", ">=", startOfMonth)
      .where("tarih", "<=", endOfMonth)
      .get();

    if (!monthlyLessonsSnapshot.empty) {
      const lessons = monthlyLessonsSnapshot.docs.map((doc) => doc.data());
      setLessons(lessons);
    } else {
      setLessons([]);
    }
  } catch (error) {
    // Hata durumunu daha ayrıntılı bir şekilde ele alabilirsiniz
    console.error("Hata:", error);
    setLessons(null);
  }
};

const weeklyLessons = async (setLessons) => {
  try {
    const currentDate = new Date();
    const { startOfWeek, endOfWeek } = getWeekRange(currentDate);

    const weeklyLessonsSnapshot = await firestore
      .collection("Lessons")
      .where("tarih", ">=", startOfWeek)
      .where("tarih", "<=", endOfWeek)
      .get();

    if (!weeklyLessonsSnapshot.empty) {
      const lessons = weeklyLessonsSnapshot.docs.map((doc) => doc.data());
      setLessons(lessons);
    } else {
      setLessons([]);
    }
  } catch (error) {
    console.error("Hata:", error);
    setLessons(null);
  }
};



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = getStorage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
  storage,
  fetchTeacher,
  fetchUserLesson,
  fetchIncome,
  addLesson,
  addIncome,
  monthlyLessons,
  weeklyLessons,
  addBlog,
  todaysLessons,
  fetchUserPackage,
  teachALesson,
  fetchLessons,
  updateStudentsLesson,
  fetchStudents,
  updateStudentTeacher,
  fetchPackageInfo,
  cancelledLesson,
  uploadToFirebase,
  listFiles,
  uploadImage,
  fetchWage,
  updateWage,
  addLessonPackage
};
