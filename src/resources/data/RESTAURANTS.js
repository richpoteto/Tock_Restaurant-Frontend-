const RESTAURANTS = [
  {
    name: "BOUILLON BILK",
    cuisine: "French",
    price: 4,
    description: "Modern eclectic cuisine with a French influence served in a bright, minimalist-chic space.",
    openTime: 17,
    closeTime: 23,
    photoURL: require("../images/IMG_7680.jpg"),
  }
  ,
  {
    name: "Aloette",
    cuisine: "Canadian",
    price: 2,
    description: "The neighbourhood bistro as imagined by the Alo Food Group. Set along Spadina Avenue like a passenger train’s dining car, Aloette is where a taste for haute cuisine meets cravings for cheeseburgers and lemon meringue.",
    openTime: 17,
    closeTime: 23,
    photoURL: require("../images/IMG_6581.jpg"),
  }
  ,
  {
    name: "Alobar Yorkville",
    cuisine: "Gastropub",
    price: 3,
    description: "Alobar is tucked along a pathway in Toronto’s Yorkville neighbourhood. It puts its foot forward as a cocktail bar, but it is a full-fledged restaurant, offering choice seafood with the finest accoutrements, fish and chops off of the charcoal grill, and world-class wines, all served with genuine hospitality.",
    openTime: 16,
    closeTime: 22,
    photoURL: require("../images/IMG_6037.jpg"),
  }
  ,
  {
    name: "MIMI Chinese",
    cuisine: "Chinese",
    price: 3,
    description: "Loud conversation over plates of steaming noodles. The rush of servers moving quickly about in starched white dress shirts and pressed black bow ties. Darkly lit nooks with deep shades of red. The clanking of cutlery as cocktails are shaken swiftly in the background. A fragrant scent of Sichuan peppercorns toasting in the wok. Moments of celebration and togetherness over both new and familiar food. ",
    openTime: 17,
    closeTime: 23,
    photoURL: require("../images/IMG_6012.jpg"),
  }
  ,
  {
    name: "Restaurant Pearl Morissette",
    cuisine: "French",
    price: 4,
    description: "Located in Jordan Station, the heart of the Niagara region, Restaurant Pearl Morissette is on an unwavering journey to source the best ingredients from our own gardens, surrounding forests, lakes, and prairies, as well as the Maritime coasts. These ingredients are transformed into the day's menu, with respect and care. Our wine list reflects the values of Pearl Morissette, focusing on wines of purity made by producers of integrity.",
    openTime: 17,
    closeTime: 21,
    photoURL: require("../images/IMG_3133.jpg"),
  }
  ,
  {
    name: "Cho Sun Ok",
    cuisine: "Korean",
    price: 1,
    description: "Compact Korean restaurant known for its cold noodles, with bibimbop, sausage dishes & organ meats.",
    openTime: 11,
    closeTime: 21,
    photoURL: require("../images/IMG_0794.jpg"),
  }
  ,
  {
    name: "Momofuku Ssam Bar",
    cuisine: "American",
    price: 3,
    description: "Momofuku Ssäm Bar opened in New York City’s East Village in 2006 and serves a menu that draws inspiration from flavors and techniques found worldwide, while staying true to its New York roots.",
    openTime: 11,
    closeTime: 23,
    photoURL: require("../images/IMG_2312.jpg"),
  }
  ,
  {
    name: "Pho Linh",
    cuisine: "Vietnamese",
    price: 1,
    description: "Soup house with a large sidewalk window, popular for its pho broth & menu of Vietnamese classics.",
    openTime: 10,
    closeTime: 22,
    photoURL: require("../images/IMG_2731.jpg"),
  }
  ,
  {
    name: "Yan's Kitchen",
    cuisine: "Chinese",
    price: 2,
    description: "Unique restaurant specialiazing in Chinese regional Hangzhou Cuisine, serving Xiao Long Bao and more traditional dishes.",
    openTime: 11,
    closeTime: 22,
    photoURL: require("../images/IMG_3026.jpg"),
  }
  ,
  {
    name: "Good Taste Casserole Rice",
    cuisine: "Chinese",
    price: 1,
    description: "Good Taste Casserole Rice is the main delicacy of Claypot Rice, the gravy penetrates into each other during the cooking process with the rice, and it is topped with delicious sweet soy sauce. It is authentically delicious and simple happiness. There are also a variety of stone-ground pure rice milk rice noodles and nutritious stew in the original cup, waiting for you to taste.",
    openTime: 11,
    closeTime: 22,
    photoURL: require("../images/IMG_3362.jpg"),
  }
  ,
];

const cuisinesArray = RESTAURANTS.reduce((prev, curr) => 
  [...prev, curr.cuisine], []
);

const CUISINES = Array.from(new Set(cuisinesArray)).sort();

// console.log(CUISINES);

export { RESTAURANTS, CUISINES };