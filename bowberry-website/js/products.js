/* ============================================================
   YOUR PRODUCTS: edit this list. The shop, product pages and cart
   all read from here.
   image:  the photo path. The file name must match exactly
           (capital letters and .jpg / .jpeg / .png all matter).
   colors: the options the customer can choose from. The FIRST one
           is the default shown first on the product page.
   id:     must be different for every product (no spaces).
   Every product needs a comma after its closing } except the last one.
   ============================================================ */
const PRODUCTS = [
  { id: "gajray", name: "Gajray", category: "Accessories", price: 500,
    short: "Never-wilting gajray that will elevate your look",
    description: `Lovingly handcrafted with soft yarn and delicate details, these gajray are perfect for weddings, mehndi events, festive occasions, and everyday desi looks. 💗

🌷 Handmade with love
🧶 Soft, lightweight & reusable
🎀 Available in your favourite colours`,
    colors: ["Blush Pink", "Ivory", "Cream", "Rose Pink", "Peach", "Lavender", "Butter Yellow", "Burgundy"],
    image: "assets/gajray2.jpeg" },

  { id: "crochet-bouquet", name: "Crochet flower keychain", category: "Flowers", price: 370,
    short: "Flowers that never wilt",
    description: "A bouquet of handmade crochet flowers ",
    colors: ["Pink Mix", "White Mix", "Red Mix", "Lavender Mix", "Peach Mix", "Yellow Mix", "Pastel Mix"],
    image: "assets/boqet.jpg" },

  { id: "bag", name: "Rose & Pearls bucket bag", category: "Bags", price: 3500,
    short: "Crafted with cozy cream stitches, rich maroon roses, and a dash of pearl magic",
    description: "Designed in a classic drawstring pouch style, it has just the right amount of space for your daily essentials, like your phone, keys, lipstick, and cards.",
    colors: ["Cream & Maroon", "Cream & Blush Pink", "Ivory & Dusty Rose", "Mocha & Cream", "Black & Pearl"],
    image: "assets/rosebucket.jpg" },

  { id: "pouch", name: "Mini pouch", category: "Bags", price: 899,
    short: "Cute, cozy, and entirely handcrafted to carry your tiny treasures",
    description: "Bring a dash of handmade charm to your day-to-day organizer with our sweet and compact Crochet Mini Pouch. Perfectly sized to slip into your handbag, backpack, or carry solo, this tiny accessory is as practical as it is adorable. Ideal for keeping your loose change, keys, earbuds, hair ties, or lip balm secure and easy to find.",
    colors: ["Blush Pink", "Berry", "Cream", "Lavender", "Sage Green", "Butter Yellow", "Sky Blue", "Mocha"],
    image: "assets/pouch.jpg" },

  { id: "bag-2", name: "Crochet Rose Bag", category: "Bags", price: 2499, // change to your actual price
    short: "A beautiful handmade rose-shaped crochet bag with pearl detailing.
        "size: 5.5inches",
    description: "A uniquely handcrafted crochet rose bag, designed with beautiful rose-inspired details and elegant pearl accents. Perfect for adding a touch of charm to your everyday outfits and special occasions.\n\n✨ Custom sizes are available upon request. Please note that prices may vary depending on the selected size.",
    colors: ["Burgundy", "Red", "Blush Pink", "Dusty Rose", "Cream", "Lavender", "Black"],
    image: "assets/rosebag.png" },

  { id: "sunflower-charm", name: "Handmade Crochet Sunflower Hanging Charm", category: "Accessories", price: 300,
    short: "Carry a pocketful of sunshine with you, wherever you go! 🌻",
    description: "A cheerful handmade crochet sunflower charm to hang on your bag, keys or phone. Made to order in the colours you choose.",
    colors: ["Sunny Yellow", "Butter Yellow", "Golden Orange", "Cream", "Pastel Pink"],
    image: "assets/sunflower.jpg" },

  { id: "sunflower-charm-2", name: "Handmade Crochet Sunflower Hanging Charm", category: "Accessories", price: 520,
    short: "Carry a pocketful of sunshine with you, wherever you go! 🌻",
    description: "A cheerful handmade crochet sunflower charm to hang on your bag, keys or phone. Made to order in the colours you choose.",
    colors: ["Sunny Yellow", "Butter Yellow", "Golden Orange", "Cream", "Pastel Pink"],
    image: "assets/sunflower2.jpeg" },

  { id: "phone-cover-1", name: "Crochet phone cover", category: "Accessories", price: 1200,
    short: "A soft handmade cover for your phone.",
    description: "A handmade crochet phone cover. Write your phone model in the cart so we make the right size.",
    colors: ["Blush Pink", "Berry", "Cream", "Lavender", "Sage Green", "Butter Yellow", "Sky Blue", "Mocha", "Peach", "Black"],
    image: "assets/phonecover1.jpg" },

  { id: "jellyfish", name: "Crochet jellyfish keychain", category: "Accessories", price: 999,
    short: "Whimsical waves in every stitch. Meet your new jellyfish companion!",
    description: "Add a splash of handmade charm to your everyday essentials with this adorable crochet jellyfish keychain! Meticulously handcrafted with love, this whimsical accessory features a soft, pastel-toned bell in gentle pink and lavender, accented with delicate wavy borders and tiny bead details.",
    colors: ["Pink & Lavender", "Baby Pink", "Lilac", "Mint Green", "Sky Blue", "Peach", "Coral Pink"],
    image: "assets/jellyfish.jpg" }
];
