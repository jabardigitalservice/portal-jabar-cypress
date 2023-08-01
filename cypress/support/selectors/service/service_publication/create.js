module.exports = {
    // Form 1
    opdName: "//input[@placeholder='Nama Perangkat Daerah']",
    serviceType: "//input[@placeholder='Administratif/Barang/Jasa']",
    serviceName: "//input[@placeholder='Nama Layanan']",
    serviceDescription: "//textarea[@placeholder='Deskripsi Layanan']",
    serviceUser: "//input[@placeholder='Umum/ASN/Lembaga']",
    serviceProgramName: "//input[@placeholder='Nama Program Layanan']",
    serviceCategoryJabarprov: "",
    operationalStatus: "//input[@placeholder='Status Operasional']",
    serviceTechnical: "//input[@placeholder='Teknis Layanan']",
    alertWrongUpload: ".font-lato",

    // Service Benefit
    benefitTitleSection: "(//input[@placeholder='Judul Section'])[1]",
    benefitValue1: "(//input[@placeholder='Berisi Manfaat Layanan'])[1]",
    benefitValue2: "(//input[@placeholder='Berisi Manfaat Layanan'])[2]",
    benefitValue3: "(//input[@placeholder='Berisi Manfaat Layanan'])[3]",
    benefitFile1: "(//input[@type='file'])[2]",
    benefitFile2: "(//input[@type='file'])[3]",
    benefitFile3: "(//input[@type='file'])[4]",
    // Service Benefit

    // Available Facilities
    // Available Facilities 

    officialWebsite: "//input[@placeholder='Alamat Website Resmi']",
    urlCustomPortalJabar: "//input[@placeholder='tambahkan sub alamat']",
    // End Form 1

    // Form 2
    // Cover Image
    btnLinkYoutube: "div > section:nth-of-type(1) div > div:nth-of-type(2) span",
    urlYoutube: "section:nth-of-type(1) > span input",
    coverImageFile: "//div[@id='coverImage']//input[@type='file']",

    // Content Image
    contentImage1: "(//input[@type='file'])[2]",
    contentImage2: "(//input[@type='file'])[3]",
    contentImage3: "(//input[@type='file'])[4]",

    // Service Term & Condition
    serviceTermConditionTitle: "(//input[@placeholder='Judul Section'])[1]",
    serviceTermConditionValue1: "(//input[@placeholder='Berisi Syarat dan Ketentuan'])[1]",
    serviceTermConditionValue2: "(//input[@placeholder='Berisi Syarat dan Ketentuan'])[2]",
    serviceTermConditionValue3: "(//input[@placeholder='Berisi Syarat dan Ketentuan'])[3]",
    serviceTermConditionLink1: "(//input[@placeholder='Berisi link (Opsional)'])[1]",
    serviceTermConditionLink2: "(//input[@placeholder='Berisi link (Opsional)'])[2]",
    serviceTermConditionLink3: "(//input[@placeholder='Berisi link (Opsional)'])[3]",
    serviceTermConditionFile: "//div[@id='termAndConditionImage']//input[@type='file']",

    // Service Usage
    serviceUsageTitle: "(//input[@placeholder='Judul Section'])[2]",
    serviceUsageValue1: "(//input[@placeholder='Berisi alur atau prosedur'])[1]",
    serviceUsageValue2: "(//input[@placeholder='Berisi alur atau prosedur'])[2]",
    serviceUsageValue3: "(//input[@placeholder='Berisi alur atau prosedur'])[3]",
    serviceUsageFile: "(//input[@type='file'])[6]",

    // Service rates
    serviceRates: "(//input[@placeholder='cth: 7000'])[1]",

    // Hotline Phone
    hotlinePhone: "(//input[@placeholder='Berisi Hotline Layanan (HP/Telp)'])[1]",

    // Hotlain Mail
    hotlineMail: "(//input[@placeholder='Berisi Layanan (Email)'])[1]",

    // Infographic Service
    infographicFile1: "(//input[@type='file'])[7]",
    infographicFile2: "(//input[@type='file'])[8]",
    infographicFile3: "(//input[@type='file'])[9]",

    // Application Feature
    availabilityStatus: "//input[@placeholder='Berisi status ketersediaan']",
    appsName: "//input[@placeholder='Nama Aplikasi']",
    appFeatureTitle: "(//input[@placeholder='Judul Section'])[3]",
    featureApp1: "(//input[@placeholder='Berisi fitur aplikasi'])[1]",
    featureApp2: "(//input[@placeholder='Berisi fitur aplikasi'])[2]",
    featureApp3: "(//input[@placeholder='Berisi fitur aplikasi'])[3]",
    featureDesc1: "(//textarea[@placeholder='Berisi deskripsi fitur aplikasi'])[1]",
    featureDesc2: "(//textarea[@placeholder='Berisi deskripsi fitur aplikasi'])[2]",
    featureDesc3: "(//textarea[@placeholder='Berisi deskripsi fitur aplikasi'])[3]",
    // End Form 2

    // Form 3
    // Keywords News
    keywordNews: "#keywordNews",
    keywordsTag: "(//div[@class='flex flex-row flex-wrap gap-4 w-full h-full p-4 border border-gray-200 rounded-lg'])[1]",

    // FAQ
    question1: "(//textarea[@placeholder='Masukkan pertanyaan FAQ'])[1]",
    question2: "(//textarea[@placeholder='Masukkan pertanyaan FAQ'])[2]",
    question3: "(//textarea[@placeholder='Masukkan pertanyaan FAQ'])[3]",
    answer1: "(//textarea[@placeholder='Masukkan jawaban FAQ'])[1]",
    answer2: "(//textarea[@placeholder='Masukkan jawaban FAQ'])[2]",
    answer3: "(//textarea[@placeholder='Masukkan jawaban FAQ'])[3]",
    // End Form 3
}