/* ============================================================
   YOUR PRODUCTS: edit this list. The shop, product pages and cart
   all read from here. The prices below are SAMPLES, please change them.
   image: put the photo in assets/products/ with the same file name
          (capital letters and .jpg / .png must match exactly).
   colors: the options the customer can choose from.
   ============================================================ */
const PRODUCTS = [
  { id: "mini-bow-bag", name: "Mini bow bag", category: "Bags", price: 2200,
    short: "A small crochet bag with a bow, big enough for your essentials.",
    description: "A small handmade crochet bag finished with a bow. It fits a phone, keys and a lipstick. Made to order in the colour you choose.",
    colors: ["Blush", "Cream", "Berry"], image: "assets/products/mini-bow-bag.jpg" },
  { id: "crochet-bouquet", name: "Crochet flower bouquet", category: "Flowers", price: 1800,
    short: "Flowers that never wilt, wrapped in a ribbon.",
    description: "A bouquet of handmade crochet flowers tied with a ribbon. A gift that lasts for years. Tell us the occasion on WhatsApp and we can match the colours.",
    colors: ["Pink mix", "White mix", "Red mix"], image: "assets/products/crochet-bouquet.jpg" },
  { id: "swan-toy", name: "Little swan toy", category: "Toys", price: 1500,
    short: "A soft swan wearing a bow, just like our logo.",
    description: "A soft handmade swan with a bow around its neck. A sweet gift for children and grown-ups.",
    colors: ["White", "Blush"], image: "assets/products/swan-toy.jpg" },
  { id: "hair-bow-set", name: "Hair bow set", category: "Accessories", price: 600,
    short: "Three small crochet bows for your hair.",
    description: "A set of three handmade crochet hair bows on clips. Light, soft and easy to wear every day.",
    colors: ["Blush", "Berry", "Cream"], image: "assets/products/hair-bow-set.jpg" },
  { id: "coaster-set", name: "Coaster set", category: "Gifts", price: 900,
    short: "Four round coasters for your tea table.",
    description: "A set of four handmade crochet coasters. Good for tea cups and a lovely small gift.",
    colors: ["Blush", "Cream"], image: "assets/products/coaster-set.jpg" },
  { id: "gift-box", name: "Bowberry gift box", category: "Gifts", price: 3500,
    short: "A little box of handmade things, packed with a bow.",
    description: "A gift box with a few of our handmade pieces, wrapped with a ribbon. Message us with your budget and who it is for, and we will pick the items.",
    colors: ["Blush box", "Cream box"], image: "assets/products/gift-box.jpg" },

  { id: "phone-cover", name: "Crochet phone cover", category: "Accessories", price: 1200,
    short: "A soft handmade cover for your phone.",
    description: "A handmade crochet phone cover. Write your phone model in the cart so we make the right size.",
    colors: ["Blush", "Berry", "Cream"], image: "assets/products/phone-cover.jpg" }
];