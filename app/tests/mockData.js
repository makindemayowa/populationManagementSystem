module.exports = {
  user1: {
    email: "fibblordo@gmail.com",
    password: "andela"
  },
  user2: {
    email: "fibbo@gmail.com",
    password: "ande"
  },
  invalidEmail: {
    email: "mayor@mayor.",
    password: "andela"
  },
  incompleteUserData: {
    password: "andela"
  },
  LoginEmailMismatch: {
    email: "mayor@some.com",
    password: "something"
  },
  LoginPasswordMismatch: {
    email: "fibblordo@gmail.com",
    password: "wrongpassword"
  },
  location1: {
    name: "Ikorodu",
    male: 20,
    female: 30,
    total: 50
  },
  location2: {
    name: "Alagomeji",
    male: 100,
    female: 330,
    total: 430
  },
  updatedLocation: {
    name: "Alagomeji is now changed"
  },
  nestedLocation1: {
    name: "Borno Way",
    male: 10,
    female: 30,
    total: 40
  },
  nestedLocation2: {
    name: "Spencer stret",
    male: 30,
    female: 40,
    total: 70
  },
  updatedNestedLocation: {
    name: "Queens stret"
  },
  product3: {
    name: "Updated 3",
    tags: ["cloth", "woman"],
    relatedItems: ["shaku", "shaku"],
    composition: ["cotton", "wool", "and bee"],
    isSoldout: false,
    allowBackorder: true,
    isPreorderOnly: false,
    gender: "male",
    careInstruction: "Wash with just soap and water",
    applicableSizeChart: "london size x is so big if you a Nigerian",
    sku: "2234322",
    description: "Try our product and be happy",
    productType: "clothing",
    photos: ["man", "woman"],
    label: "dunno",
    productVariants: [
      {
        price: 700,
        secondaryColor: "purple",
        size: "small",
        mainColor: "blue",
        stockLevel: 30
      },
      {
        price: 1000,
        secondaryColor: "green",
        size: "big",
        mainColor: "yellow",
        stockLevel: 20
      }
    ]
  },
  product4: {
    name: "Aso Oke",
    tags: ["cloth", "woman"],
    relatedItems: ["atiku", "ankara"],
    composition: ["thread", "coloring", "dazzal"],
    isSoldout: true,
    allowBackorder: true,
    isPreorderOnly: false,
    gender: "female",
    careInstruction: "Wash with just soap and water",
    applicableSizeChart: "london size x is so big if you a Nigerian",
    sku: "2234322",
    description: "Try our product and be happy",
    productType: "clothing",
    photos: ["man", "woman"],
    label: "oke",
    productVariants: [
      {
        price: 300,
        secondaryColor: "yellow",
        size: "small",
        mainColor: "blue",
        stockLevel: 6
      },
      {
        price: 400,
        secondaryColor: "blue",
        size: "big",
        mainColor: "yellow",
        stockLevel: 10
      }
    ]
  },
  product5: {
    name: "Ankara Shirt",
    tags: ["male"],
    relatedItems: ["shoe", "sandal"],
    composition: ["ankara", "button"],
    isSoldout: false,
    allowBackorder: true,
    isPreorderOnly: true,
    gender: "male",
    careInstruction: "Wash with just soap and water",
    applicableSizeChart: "london size x is so big if you a Nigerian",
    sku: "2234322",
    description: "Try our product and be happy",
    productType: "clothing",
    photos: ["man", "woman"],
    label: "ankara",
    productVariants: [
      {
        price: 2700,
        secondaryColor: "maroon",
        size: "large",
        mainColor: "blue",
        stockLevel: 30
      },
      {
        price: 3000,
        secondaryColor: "green",
        size: "medium",
        mainColor: "yellow",
        stockLevel: 20
      }
    ]
  },
  product6: {
    name: "Ankara Office Skirt",
    tags: ["female"],
    relatedItems: ["slippers", "heels"],
    composition: ["ankara", "zippers"],
    isSoldout: false,
    allowBackorder: true,
    isPreorderOnly: false,
    gender: "female",
    careInstruction: "Wash with just soap and water",
    applicableSizeChart: "london size x is so big if you a Nigerian",
    sku: "2234322",
    description: "Try our product and be happy",
    productType: "clothing",
    photos: ["man", "woman"],
    label: "ankara",
    productVariants: [
      {
        price: 7000,
        secondaryColor: "black",
        size: "small",
        mainColor: "purple",
        stockLevel: 10
      },
      {
        price: 10000,
        secondaryColor: "black",
        size: "medium",
        mainColor: "purple",
        stockLevel: 20
      }
    ]
  },
  product7: {
    name: "Heels",
    tags: ["woman"],
    relatedItems: ["ankara"],
    composition: ["dunno", "dunno"],
    isSoldout: false,
    allowBackorder: true,
    isPreorderOnly: true,
    gender: "female",
    careInstruction: "Wash with just soap and water",
    applicableSizeChart: "london size x is so big if you a Nigerian",
    sku: "2234322",
    description: "Try our product and be happy",
    productType: "clothing",
    photos: ["man", "woman"],
    label: "heels",
    productVariants: [
      {
        price: 15000,
        secondaryColor: "red",
        size: "small",
        mainColor: "black",
        stockLevel: 30
      },
      {
        price: 12000,
        secondaryColor: "red",
        size: "medium",
        mainColor: "black",
        stockLevel: 20
      }
    ]
  },
  product8: {
    name: "Heels 2",
    tags: ["woman"],
    relatedItems: ["ankara"],
    composition: ["dunno", "dunno"],
    isSoldout: false,
    allowBackorder: false,
    isPreorderOnly: false,
    gender: "female",
    careInstruction: "Wash with just soap and water",
    applicableSizeChart: "london size x is so big if you a Nigerian",
    sku: "2234322",
    description: "Try our product and be happy",
    productType: "clothing",
    photos: ["man", "woman"],
    label: "dunno",
    productVariants: [
      {
        price: 20000,
        secondaryColor: "purple",
        size: "small",
        mainColor: "blue",
        stockLevel: 30
      },
      {
        price: 20000,
        secondaryColor: "green",
        size: "big",
        mainColor: "yellow",
        stockLevel: 20
      }
    ]
  },
  incompleteProduct: {},
  merchant1: {
    email: "fibblordo@gmail.com",
    password: "andela",
    confirmPassword: "andela",
    isMerchant: true
  },
  merchant1Login: {
    email: "fibblordo@gmail.com",
    password: "andela",
    isMerchant: true
  },
  merchant3: {
    email: "fibbonacci@gmail.com",
    password: "andela",
    confirmPassword: "andela",
    isMerchant: true
  },
  merchant4: {
    email: "lordmay@gmail.com",
    password: "andela",
    confirmPassword: "andela",
    isMerchant: true
  },
  merchant3Login: {
    email: "fibbonacci@gmail.com",
    password: "andela",
    isMerchant: true
  },
  merchant4Login: {
    email: "lordmay@gmail.com",
    password: "andela",
    isMerchant: true
  },
  category1: {
    name: "shoes",
    imgUrl: "http://localhost:3000/static/media/150901944.a9090b77.png"
  },
  category2: {
    name: "shorts",
    imgUrl: "http://localhost:3000/static/media/150901944.a9090b77.png"
  },
  category3: {
    name: "active wear",
    imgUrl: "http://localhost:3000/static/media/150901944.a9090b77.png"
  },
  category4: {
    name: "dresses",
    imgUrl: "http://localhost:3000/static/media/150901944.a9090b77.png"
  }
};
