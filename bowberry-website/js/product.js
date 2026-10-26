/* ============================================================
   YOUR PRODUCTS: edit this list. The shop, product pages and cart
   all read from here. The prices below are SAMPLES, please change them.
   image: put the photo in assets/products/ with the same file name
          (capital letters and .jpg / .png must match exactly).
   colors: the options the customer can choose from.
   ============================================================ */
 const PRODUCTS= [
  { id: "gajray.jpeg", name: "gajray", category: "Accessories", price: 899,
    short: "never dying gajray that will evaluate your look",
    description: `Lovingly handcrafted with soft yarn and delicate details, these gajray are perfect for weddings, mehndi events, festive occasions, and everyday desi looks. 💗

🌷 Handmade with love
🧶 Soft, lightweight & reusable
🎀 Available in your favourite colours`,
    colors: ["Blush","pink","cream"], image: "assets/gajray2.jpeg" },
  { id: "crochet-bouquet", name: "Crochet flower keychain", category: "Flowers", price: 999,
    short: "Flowers that never wilt",
    description: "A bouquet of handmade crochet flowers ",
    colors: ["Pink mix", "White mix", "Red mix"], image: "assets/boqet.jpg" },
  { id: "bag", name: "Rose & Pearls bucket bag", category: "bags", price: 3000,
    short: "Crafted with cozy cream stitches, rich maroon roses, and a dash of pearl magic",
    description: "Designed in a classic drawstring pouch style, it has just the right amount of space for your daily essentials—like your phone, keys, lipstick, and cards.",
   image: "assets/rosebucket.jpg" },
  { id: "pouch", name: "Mini pouch", category: "bags", price: 899,
    short: "Cute, cozy, and entirely handcrafted to carry your tiny treasures",
    description: "Bring a dash of handmade charm to your day-to-day organizer with our sweet and compact Crochet Mini Pouch. Perfectly sized to slip into your handbag, backpack, or carry solo, this tiny accessory is as practical as it is adorable.Ideal for keeping your loose change, keys, earbuds, hair ties, or lip balm secure and easy to find.",
    colors: ["Blush", "Berry", "Cream"], image: "assets/pouch.jpg" },
 {
  id: "bag-2",
  name: "Crochet Rose Bag",
  category: "bags",
  price: 0,
  short: "Four round coasters for your tea table.",
  description: "A set of four handmade crochet coasters. Good for tea cups and a lovely small gift.",
  colors: ["Blush", "Cream"],
  options: {
    label: "Crochet Style",
    choices: [
      { name: "One Side Crochet", price: 1500 },
      { name: "Both Sides Crochet", price: 2999}
    ]
  },
  image: "assets/rosebag.png"
},
  { id: "gift-box", name: "Handmade Crochet Sunflower Hanging Charm", category: "Accessories", price: 699,
    short: "Carry a pocketful of sunshine with you, wherever you go! 🌻",
    description: "A gift box with a few of our handmade pieces, wrapped with a ribbon. Message us with your budget and who it is for, and we will pick the items.",
    image: "assets/sunflower.jpg" },
 { id: "gift-box2", name: "Handmade Crochet Sunflower Hanging Charm", category: "Accessories", price: 999,
    short: "Carry a pocketful of sunshine with you, wherever you go! 🌻",
    description: "A gift box with a few of our handmade pieces, wrapped with a ribbon. Message us with your budget and who it is for, and we will pick the items.",
    image: "assets/sunflower2.jpeg" },

  { id: "phone-cover-1", name: "Crochet phone cover", category: "Accessories", price: 1200,
    short: "A soft handmade cover for your phone.",
    description: "A handmade crochet phone cover. Write your phone model in the cart so we make the right size.",
    colors: ["Blush", "Berry", "Cream"], image: "assets/phonecover1.jpg" },

  

    { id: "jellyfish", name: "crocteh jellyfish", category: "Accessories", price: 999,
    short: "Whimsical waves in every stitch—meet your new jellyfish companion!",
    description: "Add a splash of handmade charm to your everyday essentials with this adorable crochet jellyfish keychain! Meticulously handcrafted with love, this whimsical accessory features a soft, pastel-toned bell in gentle pink and lavender, accented with delicate wavy borders and tiny bead details.",
    colors: ["Blush", "Berry", "Cream"], image: "assets/jellyfish.jpg" },
];
