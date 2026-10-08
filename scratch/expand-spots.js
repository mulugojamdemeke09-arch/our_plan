const fs = require('fs');
const path = require('path');

const NEW_SPOTS = [
  // ================= 1. ITALIAN RESTAURANTS ("ITALIC RESTAURANT") =================
  {
    id: 'spot-trattoria-mimmo',
    name: 'Trattoria Mimmo',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'italian',
    bestKnownFor: 'Authentic Roman Spaghetti alla Carbonara, Veal Saltimbocca & Cozy Italian Villa Courtyard',
    neighborhood: 'Kazanchis',
    address: 'Behind UN-ECA, Kazanchis, Addis Ababa',
    lat: 9.0185,
    lng: 38.7695,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2400,
    vibe: 'Rustic Roman Trattoria, Olive Oil Aromas & Intimate Brick Arches',
    romanticHighlight: 'Intimate candlelit Roman trattoria nestled in a quiet villa courtyard, serving Addis Ababa\'s most authentic creamy guanciale carbonara and tender veal.',
    signatureOrder: 'Authentic Roman Carbonara, Veal Saltimbocca & Homemade Limoncello',
    openingHours: '12:00 PM – 10:30 PM (Tue–Sun)',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm terracotta floor tiles, exposed brick arches, soft classical Italian ballads, candlelit wine bottle centerpieces, and intimate garden tables.',
    menuHighlights: [
      { name: 'Spaghetti alla Carbonara Tradizionale', category: 'Food', priceETB: 720, description: 'Egg yolk emulsion, crispy cured beef guanciale, pecorino romano, cracked black pepper', isPopular: true },
      { name: 'Saltimbocca alla Romana', category: 'Food', priceETB: 890, description: 'Tender veal cutlets wrapped with fresh sage leaves and prosciutto in white wine butter glaze', isPopular: true },
      { name: 'Bruschetta al Pomodoro e Basilico', category: 'Food', priceETB: 360, description: 'Charred country bread rubbed with garlic, heirloom tomatoes, extra virgin olive oil' },
      { name: 'Limoncello di Casa (Digestif for Two)', category: 'Cocktail', priceETB: 380, description: 'Chilled sweet Italian lemon liqueur crafted in-house' }
    ],
    tags: ['italian', 'italic', 'pasta', 'carbonara', 'kazanchis', 'wine', 'romantic', 'dinner'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Trattoria+Mimmo+Kazanchis+Addis+Ababa'
  },
  {
    id: 'spot-la-mandolina',
    name: 'La Mandolina Ristorante',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'italian',
    bestKnownFor: 'Wood-Fired Quattro Formaggi with Wild Honey, Homemade Lasagna al Forno & Secret Garden Pergola',
    neighborhood: 'Bole Atlas',
    address: 'Cape Verde St, Bole Atlas, Addis Ababa',
    lat: 9.0115,
    lng: 38.7760,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2500,
    vibe: 'Candlelit Garden Pergola, Italian Acoustics & Warm Brick Oven Glow',
    romanticHighlight: 'Dining under an open-air wooden pergola draped in blooming jasmine, sharing wood-fired pizza drizzled with Ethiopian wild mountain honey.',
    signatureOrder: 'Pizza Quattro Formaggi con Miele, Lasagna Emiliana & Panna Cotta',
    openingHours: '12:00 PM – 11:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Trellised ivy courtyard, wood-burning brick pizza hearth glowing in the center, rustic wooden tables with amber lamps, and soft Italian acoustics.',
    menuHighlights: [
      { name: 'Quattro Formaggi con Miele Selvatico', category: 'Food', priceETB: 680, description: 'Mozzarella, gorgonzola, parmesan, ricotta finished with drizzle of wild honey', isPopular: true },
      { name: 'Lasagna Emiliana al Forno', category: 'Food', priceETB: 740, description: 'Layered fresh pasta sheets with slow-simmered bolognese ragù and silky béchamel', isPopular: true },
      { name: 'Carpaccio di Salmone Marinato', category: 'Food', priceETB: 650, description: 'Thinly sliced cured salmon, capers, shaved fennel, and lemon citronette' },
      { name: 'Panna Cotta ai Frutti di Bosco', category: 'Dessert', priceETB: 350, description: 'Vanilla bean panna cotta with tart wild berry coulis', isPopular: true }
    ],
    tags: ['italian', 'italic', 'pizza', 'pasta', 'bole atlas', 'atlas', 'garden', 'wine'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Mandolina+Addis+Ababa'
  },
  {
    id: 'spot-pizzeria-italia-sarbet',
    name: 'Pizzeria Italia / Da Ciro',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'italian',
    bestKnownFor: 'Crispy Thin-Crust Margherita, Calzone Farcito & Homemade Pistachio Gelato',
    neighborhood: 'Old Airport / Sarbet',
    address: 'Bisrate Gabriel near Vatican Embassy, Sarbet, Addis Ababa',
    lat: 8.9950,
    lng: 38.7420,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1700,
    vibe: 'Bustling Tuscan Pizzeria, Cheerful Italian Accents & Hand-Tossed Dough',
    romanticHighlight: 'Casual romantic date spot with the crispest wood-fired thin-crust pizza in Sarbet, paired with house red carafes and sweet gelato.',
    signatureOrder: 'Pizza Margherita Verace, Calzone Napoletano & Pistachio Gelato',
    openingHours: '11:30 AM – 10:30 PM (Daily)',
    rating: 4.7,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Cheery red-and-white checkered tablecloths, open kitchen where chefs toss pizza dough high in the air, aroma of oregano and wood smoke.',
    menuHighlights: [
      { name: 'Pizza Margherita Verace', category: 'Food', priceETB: 480, description: 'San Marzano tomatoes, fresh fior di latte mozzarella, fragrant basil leaves', isPopular: true },
      { name: 'Calzone Farcito al Forno', category: 'Food', priceETB: 560, description: 'Folded golden pocket stuffed with ricotta, salami, mushrooms, and tomato sauce' },
      { name: 'Spaghetti alle Vongole e Gamberi', category: 'Food', priceETB: 780, description: 'Fresh pasta with clams, tiger prawns, white wine, chili, and parsley', isPopular: true },
      { name: 'Coppa Gelato al Pistacchio (For Two)', category: 'Dessert', priceETB: 340, description: 'Two generous scoops of creamy Sicilian pistachio gelato with wafer' }
    ],
    tags: ['italian', 'italic', 'pizza', 'sarbet', 'old airport', 'casual date', 'gelato'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pizzeria+Italia+Sarbet+Addis+Ababa'
  },
  {
    id: 'spot-laroma-cmc',
    name: 'L\'Aroma Trattoria & Garden',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'italian',
    bestKnownFor: 'Fresh Ricotta Ravioli in Sage Butter, Slow-Cooked Bolognese & Romantic Pergola Dining',
    neighborhood: 'CMC',
    address: 'Near Michael Church Roundabout, CMC, Addis Ababa',
    lat: 9.0230,
    lng: 38.8350,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2200,
    vibe: 'Tranquil Eastern Addis Sanctuary, Flowered Trellises & Seductive Wine List',
    romanticHighlight: 'Escaping the downtown bustle to CMC’s greenest Italian retreat, dining on delicate handmade ravioli under glowing lanterns.',
    signatureOrder: 'Ravioli Burro e Salvia, Tagliata di Manzo & Prosecco Spritz',
    openingHours: '12:00 PM – 10:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Quiet walled garden patio surrounded by climbing bougainvillea, romantic cast-iron candle holders, cozy indoor cushioned booths.',
    menuHighlights: [
      { name: 'Ravioli di Ricotta Burro e Salvia', category: 'Food', priceETB: 710, description: 'Delicate handmade parcels filled with ricotta and spinach in nutty sage butter', isPopular: true },
      { name: 'Tagliata di Filetto con Rucola', category: 'Food', priceETB: 880, description: 'Sliced tender beef fillet over wild arugula with shaved parmesan and balsamic reduction', isPopular: true },
      { name: 'Pizza Capricciosa', category: 'Food', priceETB: 590, description: 'Artichokes, black olives, beef ham, button mushrooms, mozzarella' },
      { name: 'Torta della Nonna al Limone', category: 'Dessert', priceETB: 340, description: 'Tuscan custard tart with pine nuts and powdered sugar' }
    ],
    tags: ['italian', 'italic', 'pasta', 'cmc', 'summit', 'garden dining', 'quiet date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=L+Aroma+Italian+CMC+Addis+Ababa'
  },
  {
    id: 'spot-ristorante-roma-piassa',
    name: 'Ristorante Roma Piassa',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'italian',
    bestKnownFor: 'Historic 1960s Ossobuco alla Milanese, Hand-Rolled Fettuccine & Vintage Italian Charm',
    neighborhood: 'Piassa',
    address: 'Near Piazza Post Office, Churchill Ave, Piassa, Addis Ababa',
    lat: 9.0340,
    lng: 38.7525,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2100,
    vibe: 'Retro Vintage Italian Dining, Polished Dark Oak & Nostalgic Romance',
    romanticHighlight: 'Step back into mid-century romantic Addis Ababa with authentic slow-braised ossobuco, hand-cranked fettuccine, and dark-wood privacy.',
    signatureOrder: 'Ossobuco alla Milanese, Fettuccine Alfredo & Chianti Classico',
    openingHours: '12:00 PM – 10:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Polished teakwood boiserie, brass chandeliers from the 1960s, framed black-and-white photographs of vintage Piassa, secluded couple alcoves.',
    menuHighlights: [
      { name: 'Ossobuco con Risotto allo Zafferano', category: 'Food', priceETB: 890, description: 'Tender braised veal shank in white wine and herbs served over saffron risotto', isPopular: true },
      { name: 'Fettuccine ai Funghi Porcini', category: 'Food', priceETB: 680, description: 'Hand-rolled ribbon pasta with aromatic wild porcini mushroom cream' },
      { name: 'Chianti Superiore Red (Carafe)', category: 'Cocktail', priceETB: 540, description: 'Classic Tuscan red wine with deep berry notes' },
      { name: 'Affogato al Cafe con Amaretto', category: 'Dessert', priceETB: 320, description: 'Vanilla gelato drowned in hot espresso with a splash of sweet almond liqueur', isPopular: true }
    ],
    tags: ['italian', 'italic', 'piassa', 'historic', 'pasta', 'vintage date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ristorante+Roma+Piassa+Addis+Ababa'
  },

  // ================= 2. SWEET & DESSERT HOUSES ("DESSERT HOUSE") =================
  {
    id: 'spot-sugar-blooms-gerji',
    name: 'Sugar Blooms Dessert Parlor',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Golden Hong Kong Bubble Waffles, Belgian Chocolate Fondue Platters & Rose Petal Milkshakes',
    neighborhood: 'Gerji',
    address: 'Gerji Roba Bakery St, near Unity Univ, Gerji, Addis Ababa',
    lat: 8.9860,
    lng: 38.8090,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 950,
    vibe: 'Pastel Pink Neon Romance, Flower Wall Photo Corners & Decadent Sweets',
    romanticHighlight: 'A dreamy aesthetic date heaven in Gerji with flower walls, sharing warm bubble waffles wrapped around strawberry gelato and molten Nutella.',
    signatureOrder: 'Nutella Berry Bubble Waffle & Double Belgian Chocolate Fondue',
    openingHours: '10:00 AM – 10:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 330,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Rose gold hanging lights, blush pink velvet love seats, neon quote signs ("Life is Sweet with You"), and delicate flower arches perfect for couple selfies.',
    menuHighlights: [
      { name: 'Signature Hong Kong Bubble Waffle', category: 'Dessert', priceETB: 420, description: 'Crispy egg waffle stuffed with gelato, fresh strawberries, crushed Oreos & warm Nutella', isPopular: true },
      { name: 'Fondue Pot for Two Lovers', category: 'Dessert', priceETB: 580, description: 'Warm Belgian dark chocolate fondue with marshmallows, brownie bites, and bananas', isPopular: true },
      { name: 'Rose Petal Velvet Milkshake', category: 'Dessert', priceETB: 280, description: 'Creamy Madagascar vanilla shake infused with organic rose water and whipped cream' },
      { name: 'Iced Spanish Caramel Latte', category: 'Coffee', priceETB: 180, description: 'Espresso poured over condensed milk, whole milk, and caramel drizzle' }
    ],
    tags: ['dessert', 'sweet', 'bubble waffle', 'gerji', 'jackros', 'fondue', 'aesthetic date', 'instagrammable'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sugar+Blooms+Dessert+Gerji+Addis+Ababa'
  },
  {
    id: 'spot-sweet-tooth-cmc',
    name: 'The Sweet Tooth Patisserie & Dessert Bar',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Towering Russian Honey Medovik Cake, Lotus Biscoff Cheesecakes & Iced Spanish Lattes',
    neighborhood: 'CMC',
    address: 'CMC St. Michael Commercial Strip, Addis Ababa',
    lat: 9.0245,
    lng: 38.8320,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1100,
    vibe: 'Modern Glass & Brass Aesthetic, Velvet Emerald Sofas & Whimsical Desserts',
    romanticHighlight: 'Tasting exquisite multi-layered Medovik honey cake that melts on the tongue, cozying up in private emerald velvet alcoves.',
    signatureOrder: 'Russian Medovik Honey Cake, Lotus Cheesecake & Iced Spanish Latte',
    openingHours: '9:00 AM – 10:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 360,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Gleaming brass mirrors, emerald green velvet couches, marble tables, and a dazzling glass dessert counter displaying colorful artisanal cakes.',
    menuHighlights: [
      { name: '8-Layer Russian Honey Cake (Medovik)', category: 'Dessert', priceETB: 450, description: 'Delicate caramelized honey biscuit layers with tangy sour cream frosting', isPopular: true },
      { name: 'Lotus Biscoff Baked Cheesecake', category: 'Dessert', priceETB: 420, description: 'Velvety New York style cheesecake crowned with melted speculoos cookie butter', isPopular: true },
      { name: 'Warm Molten Lava Skillet', category: 'Dessert', priceETB: 460, description: 'Dark chocolate lava cake with warm gooey center and vanilla bean gelato' },
      { name: 'Iced Rose Cardamom Latte', category: 'Coffee', priceETB: 210, description: 'Double espresso with lightly spiced cardamom milk and dried rosebuds' }
    ],
    tags: ['dessert', 'sweet', 'cake', 'cheesecake', 'cmc', 'summit', 'honey cake', 'coffee'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Sweet+Tooth+CMC+Addis+Ababa'
  },
  {
    id: 'spot-addis-waffle-factory-jackros',
    name: 'Addis Waffle Factory & Shake Studio',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Crisp Belgian Liege Pearl-Sugar Waffles, Mountain of Fresh Berries & Freakshake Jars',
    neighborhood: 'Jackros / Gerji',
    address: 'Salite Mehret to Jackros Link Road, Addis Ababa',
    lat: 9.0110,
    lng: 38.8250,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 850,
    vibe: 'Playful Warm Couple Nook, Sweet Vanilla Aromas & Board Games',
    romanticHighlight: 'Feeding each other caramelized Belgian Liege waffles covered in fresh strawberries and Belgian chocolate, playing couple trivia games.',
    signatureOrder: 'Triple Chocolate Liege Waffle & Salted Caramel Pretzel Shake',
    openingHours: '10:00 AM – 9:30 PM (Daily)',
    rating: 4.7,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm blonde wood benches, sweet waffle iron aromas drifting everywhere, fairy lights in mason jars, and cozy couple two-seater nooks.',
    menuHighlights: [
      { name: 'Belgian Liege Waffle Supreme', category: 'Dessert', priceETB: 390, description: 'Brioche dough embedded with pearl sugar, topped with dark chocolate & fresh berries', isPopular: true },
      { name: 'White Chocolate Raspberry Waffle', category: 'Dessert', priceETB: 380, description: 'Crispy golden waffle drizzled with melted white chocolate and tart raspberry coulis' },
      { name: 'Caramel Pretzel Overloaded Shake', category: 'Dessert', priceETB: 320, description: 'Thick vanilla shake with crushed pretzels, dulce de leche, and whipped cream crown', isPopular: true },
      { name: 'Hot Spiced Cinnamon Cocoa', category: 'Coffee', priceETB: 160, description: 'Rich dark cocoa with cinnamon stick and toasted marshmallow' }
    ],
    tags: ['dessert', 'sweet', 'waffle', 'jackros', 'gerji', 'freakshake', 'casual date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Waffle+Factory+Jackros+Addis+Ababa'
  },
  {
    id: 'spot-dulce-de-addis-brass',
    name: 'Dulce de Addis Artisan Gelateria',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Authentic Sicilian Pistachio Gelato, Warm Brioche con Gelato & Affogato al Caffe',
    neighborhood: 'Bole',
    address: 'Brass Clinic Area, Bole, Addis Ababa',
    lat: 8.9910,
    lng: 38.7780,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 900,
    vibe: 'Sleek Italian Gelato Boutique, Marble Tops & Hand-Churned Artisanal Batches',
    romanticHighlight: 'Sharing sweet warm Sicilian brioche stuffed with freshly churned pistachio and dark chocolate gelato after an evening stroll.',
    signatureOrder: 'Pistacchio di Bronte Gelato Cup & Brioche con Gelato',
    openingHours: '11:00 AM – 10:30 PM (Daily)',
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Italian Carrara marble counters, gleaming pozzetti gelato containers, minimalist brass lighting, and cozy high-top tables.',
    menuHighlights: [
      { name: 'Coppa Gelato Artigianale (3 Flavors)', category: 'Dessert', priceETB: 360, description: 'Pure Sicilian pistachio, 70% dark Valrhona chocolate, and Madagascar vanilla', isPopular: true },
      { name: 'Warm Brioche con Gelato', category: 'Dessert', priceETB: 410, description: 'Toasted buttery brioche bun stuffed with two scoops of gelato and hot fudge', isPopular: true },
      { name: 'Affogato al Caffe Speciale', category: 'Dessert', priceETB: 240, description: 'Fior di latte gelato drowned in a freshly pulled double ristretto espresso' },
      { name: 'Iced Pistachio Foam Latte', category: 'Coffee', priceETB: 220, description: 'Cold milk, espresso, and velvety cold foam infused with pistachio paste' }
    ],
    tags: ['dessert', 'sweet', 'gelato', 'ice cream', 'bole', 'brass', 'pistachio', 'italian dessert'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulce+Artisan+Gelato+Bole+Addis+Ababa'
  },
  {
    id: 'spot-cravings-bulbula',
    name: 'Cravings Skillet & Molten Lounge',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Sizzling Triple-Fudge Brownie Skillets, Molten Belgian Lava Cakes & Caramel Sundaes',
    neighborhood: 'Bole Bulbula',
    address: 'Bole Bulbula 93 Junction, Addis Ababa',
    lat: 8.9660,
    lng: 38.7770,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1050,
    vibe: 'Cozy Dim Lighting, Plush Booths & Irresistible Warm Baking Scents',
    romanticHighlight: 'The dramatic sizzle of a piping hot cast-iron brownie skillet when the cold ice cream melts over warm fudge at your table.',
    signatureOrder: 'Sizzling Triple Chocolate Brownie Skillet & Salted Caramel Sundae',
    openingHours: '12:00 PM – 10:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm amber spotlights, plush leather booths for two, acoustic soul playlists, and the irresistible aroma of melting chocolate and toasted nuts.',
    menuHighlights: [
      { name: 'Sizzling Triple Chocolate Brownie Skillet', category: 'Dessert', priceETB: 460, description: 'Warm walnut fudge brownie served on sizzling cast iron with vanilla bean gelato & hot caramel', isPopular: true },
      { name: 'Molten Belgian Chocolate Lava Cake', category: 'Dessert', priceETB: 430, description: 'Gooey flowing center of 65% dark chocolate, dusted with powdered sugar and raspberries', isPopular: true },
      { name: 'Salted Caramel Crunch Sundae', category: 'Dessert', priceETB: 370, description: 'Vanilla gelato, honeycomb crunch, butterscotch drizzle, and fresh whipped cream' },
      { name: 'Hazelnut Mocha Macchiato', category: 'Coffee', priceETB: 190, description: 'Rich dark espresso, toasted hazelnut syrup, steamed milk foam' }
    ],
    tags: ['dessert', 'sweet', 'brownie', 'skillet', 'bole bulbula', 'bulbula', 'lava cake', 'cozy'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cravings+Dessert+Lounge+Bole+Bulbula+Addis+Ababa'
  },
  {
    id: 'spot-dolce-vita-churros-piassa',
    name: 'Dolce Vita Churros & Creperie',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Hot Cinnamon Sugar Spanish Churros, Rich Dark Chocolate Ganache Dip & Nutella Crepes',
    neighborhood: 'Piassa',
    address: 'Arada St, near St. George Cathedral, Piassa, Addis Ababa',
    lat: 9.0355,
    lng: 38.7505,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 750,
    vibe: 'European Street-side Sweet Nook, Warm Golden Lanterns & Quick Sweet Treats',
    romanticHighlight: 'Dipping piping-hot golden churros into thick Spanish hot chocolate while wandering the historic stone streets of Piassa.',
    signatureOrder: 'Crispy Spanish Churros Basket with Chocolate Dip & Strawberry Crepe',
    openingHours: '10:00 AM – 9:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm European street stall ambiance with polished brass countertops, aroma of fried pastry dough and cinnamon, cozy two-person outdoor bistro tables.',
    menuHighlights: [
      { name: 'Spanish Churros Basket (6 Pieces)', category: 'Dessert', priceETB: 320, description: 'Golden fried churros dusted in cinnamon sugar, served with thick dark chocolate ganache dip', isPopular: true },
      { name: 'Nutella & Banana French Crepe', category: 'Dessert', priceETB: 350, description: 'Thin delicate crepe folded with warm Nutella spread, fresh banana slices, and crushed nuts', isPopular: true },
      { name: 'Authentic Spanish Hot Chocolate (Drinking Dip)', category: 'Dessert', priceETB: 180, description: 'Ultra-thick, velvety dark drinking chocolate made for dipping' },
      { name: 'Double Piassa Macchiato', category: 'Coffee', priceETB: 90, description: 'Classic layered Ethiopian macchiato with velvety crema' }
    ],
    tags: ['dessert', 'sweet', 'churros', 'crepe', 'piassa', 'street treat', 'affordable date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Churros+Creperie+Piassa+Addis+Ababa'
  },

  // ================= 3. COFFEE HOUSES & ROASTERIES ("COFFEE HOUSE") =================
  {
    id: 'spot-moyee-coffee-atlas',
    name: 'Moyee Coffee Fairtrade Sanctuary',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'FairChain Single-Origin Limu Pour-Over, Nitrogen Cold Brew & Eco-Modern Coffee Lounge',
    neighborhood: 'Bole Atlas',
    address: 'Behind Desalegn Hotel, Bole Atlas, Addis Ababa',
    lat: 9.0105,
    lng: 38.7725,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 650,
    vibe: 'Minimalist Nordic Wood & Living Greenery, Chill Electronic Beats & Coffee Aficionados',
    romanticHighlight: 'A sun-drenched loft surrounded by potted monsteras, savoring slow Chemex brews from Limu while having deep, uninterrupted conversations.',
    signatureOrder: 'Chemex Single-Origin Limu & Cascara Berry Iced Tea',
    openingHours: '7:30 AM – 9:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Scandinavian light pine tables, living vertical green walls, high exposed ceilings, glass pour-over drippers, and gentle lofi rhythms.',
    menuHighlights: [
      { name: 'Single-Origin Limu V60 Pour-Over', category: 'Coffee', priceETB: 180, description: 'Washed Ethiopian heirloom beans with tasting notes of citrus blossom and bergamot', isPopular: true },
      { name: 'Nitro Cold Brew on Tap', category: 'Coffee', priceETB: 200, description: 'Silky smooth nitrogen-infused cold brew with Guinness-like cascade and velvety foam', isPopular: true },
      { name: 'Organic Cascara Berry Spritz', category: 'Coffee', priceETB: 160, description: 'Brewed sun-dried coffee cherry tea with sparkling tonic and dried orange wheel' },
      { name: 'Warm Almond Frangipane Tart', category: 'Dessert', priceETB: 240, description: 'Sweet almond cream baked in buttery shortcrust pastry' }
    ],
    tags: ['coffee', 'coffee house', 'pourover', 'atlas', 'bole atlas', 'specialty coffee', 'quiet date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Moyee+Coffee+Bole+Atlas+Addis+Ababa'
  },
  {
    id: 'spot-kaffa-forest-kazanchis',
    name: 'Kaffa Wild Forest Coffee Roastery',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Indigenous Heirloom Kaffa Bonga Forest Coffee, Aeropress Flights & Organic Honey Nibbles',
    neighborhood: 'Kazanchis',
    address: 'ECA Road, Kazanchis, Addis Ababa',
    lat: 9.0175,
    lng: 38.7670,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 600,
    vibe: 'Sun-dappled Wooden Veranda, Fresh Roasted Coffee Smoke & Intimate Seclusion',
    romanticHighlight: 'Tasting coffees harvested directly from the birthplace of Arabica in Kaffa, seated together on a quiet breezy veranda.',
    signatureOrder: 'Kaffa Bonga Forest Aeropress & Spiced Cardamom Macchiato',
    openingHours: '7:30 AM – 8:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Rustic timber beams, sacks of green coffee beans from Bonga and Mankira, gentle roaster humming in the background, and fragrant eucalyptus smoke.',
    menuHighlights: [
      { name: 'Kaffa Bonga Forest Aeropress Flight', category: 'Coffee', priceETB: 190, description: 'Pure wild-harvested forest beans with stone fruit and wild honey notes', isPopular: true },
      { name: 'Spiced Cardamom Macchiato', category: 'Coffee', priceETB: 140, description: 'Velvety milk foam infused with freshly ground cardamom pods and rich espresso', isPopular: true },
      { name: 'Honeyed Ginger Roasted Kolo', category: 'Food', priceETB: 120, description: 'Traditional roasted barley and chickpeas glazed in natural mountain honey' },
      { name: 'Warm Date & Walnut Cake', category: 'Dessert', priceETB: 220, description: 'Moist spiced date sponge topped with caramel sauce' }
    ],
    tags: ['coffee', 'coffee house', 'kaffa', 'kazanchis', 'heirloom', 'authentic', 'cozy'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kaffa+Coffee+Kazanchis+Addis+Ababa'
  },
  {
    id: 'spot-aroma-roastery-bulbula',
    name: 'Aroma Coffee Roastery & Lounge',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'On-Demand Custom Roast Yirgacheffe Beans, Velvety Flat Whites & Cozy Fireplace',
    neighborhood: 'Bole Bulbula',
    address: 'Bole Bulbula Mariam St, Addis Ababa',
    lat: 8.9685,
    lng: 38.7750,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 700,
    vibe: 'Neighborhood Hideaway, Deep Velvet Armchairs & Warm Hearth',
    romanticHighlight: 'Warm up by the indoor stone hearth in Bole Bulbula with freshly roasted Guji beans ground seconds before brewing.',
    signatureOrder: 'Velvet Flat White & Warm Spiced Banana Loaf',
    openingHours: '8:00 AM – 9:30 PM (Daily)',
    rating: 4.7,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Plush velvet armchairs by an electric stone fireplace, bookshelves with art volumes, warm golden Edison bulbs, and quiet couple tables.',
    menuHighlights: [
      { name: 'Signature Double Flat White', category: 'Coffee', priceETB: 160, description: 'Double ristretto with micro-foamed whole milk and delicate latte art', isPopular: true },
      { name: 'Guji Honey-Processed Syphon Brew', category: 'Coffee', priceETB: 210, description: 'Theatrical vacuum syphon brew bringing out delicate peach and floral notes', isPopular: true },
      { name: 'Toasted Banana Bread with Whipped Butter', category: 'Dessert', priceETB: 190, description: 'Thick slice of warm caramelized banana loaf with honey butter' },
      { name: 'Iced Vanilla Cold Foam Americano', category: 'Coffee', priceETB: 170, description: 'Chilled espresso over crystal clear ice with sweet vanilla cold cream layer' }
    ],
    tags: ['coffee', 'coffee house', 'bole bulbula', 'bulbula', 'flat white', 'fireplace', 'cozy'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aroma+Coffee+Roastery+Bole+Bulbula+Addis+Ababa'
  },
  {
    id: 'spot-galani-art-coffee-jackros',
    name: 'Galani Coffee & Contemporary Art Studio',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Industrial Loft Specialty Coffee, Fresh In-House Roasts & Rotating Modern Art Gallery',
    neighborhood: 'Jackros / Gerji',
    address: 'Jackros Industrial Park Link, Addis Ababa',
    lat: 9.0130,
    lng: 38.8235,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 750,
    vibe: 'High-Ceiling Concrete & Steel Art Loft, Huge Glass Windows & Creative Energy',
    romanticHighlight: 'Strolling hand-in-hand through contemporary paintings by young Addis artists while enjoying single-origin espresso in an industrial-chic loft.',
    signatureOrder: 'Guji Natural V60 Pour-Over & Almond Biscotti',
    openingHours: '8:00 AM – 8:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 370,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Polished concrete floors, double-height warehouse glass windows, black steel staircases, white art gallery display walls, and communal handcrafted wooden tables.',
    menuHighlights: [
      { name: 'Guji Natural Single-Origin V60', category: 'Coffee', priceETB: 190, description: 'Fruity strawberry and jasmine notes extracted through hand-poured Hario V60', isPopular: true },
      { name: 'Cortado in Glass Tumbler', category: 'Coffee', priceETB: 150, description: 'Equal parts intense espresso and silky textured warm milk', isPopular: true },
      { name: 'Handmade Almond & Pistachio Biscotti', category: 'Dessert', priceETB: 140, description: 'Twice-baked crunchy Italian biscuits perfect for dunking into hot coffee' },
      { name: 'Affogato with Salted Caramel Drizzle', category: 'Dessert', priceETB: 230, description: 'Local dairy vanilla ice cream drowned in hot ristretto with caramel' }
    ],
    tags: ['coffee', 'coffee house', 'art gallery', 'jackros', 'gerji', 'specialty coffee', 'industrial loft'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Galani+Coffee+Addis+Ababa'
  },
  {
    id: 'spot-yirgacheffe-blossom-oldairport',
    name: 'Yirgacheffe Coffee Blossom Bar',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Jasmine Floral Washed Yirgacheffe, Ice-Drip Syphon Brews & Shaded Reading Garden',
    neighborhood: 'Old Airport',
    address: 'Near International Community School (ICS), Old Airport, Addis Ababa',
    lat: 8.9880,
    lng: 38.7360,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 800,
    vibe: 'Lush Secluded Tropical Garden, Birds Chirping & Gentle Coffee Brewing Rituals',
    romanticHighlight: 'Tucked away in the diplomatic quarter of Old Airport, a secret lush garden where couples can read books and sip the world’s most floral coffees.',
    signatureOrder: 'Syphon Washed Yirgacheffe & Lemon Poppy Muffin',
    openingHours: '8:00 AM – 7:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Outdoor garden pavilion under palm fronds and flowering shrubs, bamboo loungers, wooden tables, and delicate tinkling wind chimes.',
    menuHighlights: [
      { name: 'Washed Yirgacheffe Grade 1 Chemex (For Two)', category: 'Coffee', priceETB: 260, description: 'Shared glass decanter of clean, tea-like coffee with explosive jasmine and lemon notes', isPopular: true },
      { name: 'Kyoto-Style Japanese Slow Cold Drip', category: 'Coffee', priceETB: 220, description: '8-hour slow ice dripped coffee served over a clear hand-carved ice sphere', isPopular: true },
      { name: 'Lemon Poppyseed Glazed Muffin', category: 'Dessert', priceETB: 180, description: 'Tender moist lemon muffin with tangy citrus sugar glaze' },
      { name: 'Iced Hibiscus Mint Tea', category: 'Coffee', priceETB: 160, description: 'Refreshing tart herbal infusion brewed with fresh mint and honey' }
    ],
    tags: ['coffee', 'coffee house', 'old airport', 'yirgacheffe', 'garden', 'quiet date', 'chemex'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yirgacheffe+Coffee+Old+Airport+Addis+Ababa'
  },
  {
    id: 'spot-kembata-jebena-sarbet',
    name: 'Kembata Traditional Jebena Buna Lounge',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Smoky Clay Jebena Coffee Ceremony, Sweet Fresh Popcorn (Fendisha) & Frankincense Romance',
    neighborhood: 'Old Airport / Sarbet',
    address: 'Roosevelt St, near Karl Square, Sarbet, Addis Ababa',
    lat: 8.9980,
    lng: 38.7450,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 450,
    vibe: 'Traditional Woven Grass Rugs, Aromatic Smoke & Authentic Ethiopian Hospitality',
    romanticHighlight: 'Experience the traditional 3-round coffee ceremony (Abol, Tona, Baraka) side-by-side with fresh popcorn and fragrant frankincense smoke.',
    signatureOrder: 'Full 3-Round Jebena Buna Ceremony with Popcorn & Rue (Tena’adam)',
    openingHours: '8:00 AM – 9:00 PM (Daily)',
    rating: 4.9,
    reviewCount: 460,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Fresh green rushes (ketema) spread across the floor, clay pot charcoal burners smoking frankincense, hand-woven Mesob basket tables, and low wooden stools.',
    menuHighlights: [
      { name: 'Traditional 3-Round Jebena Buna (Abol, Tona, Baraka)', category: 'Coffee', priceETB: 180, description: 'Clay pot roasted coffee ceremony served in small cini cups with a sprig of rue (tena\'adam)', isPopular: true },
      { name: 'Freshly Popped Fendisha Basket (Popcorn)', category: 'Food', priceETB: 90, description: 'Hot salted popcorn tossed with light melted butter and nigella seeds', isPopular: true },
      { name: 'Spiced Ethiopian Herbal Tea (Shai)', category: 'Coffee', priceETB: 80, description: 'Black tea brewed with cinnamon bark, cloves, and cardamom pods' },
      { name: 'Fresh Ambasha Bread with Honey', category: 'Food', priceETB: 120, description: 'Traditional round cardamom-scented bread served warm with wild honey' }
    ],
    tags: ['coffee', 'coffee house', 'jebena', 'traditional', 'sarbet', 'ceremony', 'cultural date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Traditional+Buna+Ceremony+Sarbet+Addis+Ababa'
  },

  // ================= 4. BAKERIES & PATISSERIES ("BACKERY") =================
  {
    id: 'spot-encore-patisserie-rwanda',
    name: 'Encore Patisserie & Boulangerie',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'bakery',
    bestKnownFor: 'Crisp Almond Croissants, French Baguettes Tradition & Pistachio Paris-Brest',
    neighborhood: 'Bole',
    address: 'Rwanda Embassy Area, Bole, Addis Ababa',
    lat: 8.9930,
    lng: 38.7880,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1100,
    vibe: 'Chic Parisian Cafe Terrace, Black Wrought Iron Chairs & Golden Flaky Pastries',
    romanticHighlight: 'Biting into a double-baked buttery almond croissant on a sunny terrace in Bole Rwanda, feeling like you are sitting on the Boulevard Saint-Germain.',
    signatureOrder: 'Double-Baked Almond Croissant, Pain au Chocolat & Cafe au Lait',
    openingHours: '7:00 AM – 9:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 370,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Classic French bistro tiles, glass pastry cases overflowing with golden viennoiseries, black wrought iron chairs, and pleasant morning sun.',
    menuHighlights: [
      { name: 'Double-Baked Almond Croissant (Croissant aux Amandes)', category: 'Food', priceETB: 280, description: 'Soaked in vanilla syrup, stuffed and topped with rich frangipane almond cream and toasted almonds', isPopular: true },
      { name: 'Pain au Chocolat Pur Beurre', category: 'Food', priceETB: 240, description: 'Flaky laminated French butter pastry with two batons of dark Valrhona chocolate', isPopular: true },
      { name: 'Paris-Brest Praliné Choux Ring', category: 'Dessert', priceETB: 350, description: 'Choux pastry ring filled with hazelnut praline mousseline and toasted hazelnuts' },
      { name: 'Café au Lait Traditionnel', category: 'Coffee', priceETB: 160, description: 'Dark roasted coffee served with hot steamed whole milk in a ceramic bowl' }
    ],
    tags: ['bakery', 'patisserie', 'croissant', 'bole', 'rwanda', 'french bakery', 'breakfast'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Encore+Patisserie+Bole+Rwanda+Addis+Ababa'
  },
  {
    id: 'spot-crust-crumb-medhanealem',
    name: 'Crust & Crumb Sourdough Bakehouse',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'bakery',
    bestKnownFor: 'Naturally Fermented Wild Sourdough Loaves, Cardamom Morning Buns & Tartines',
    neighborhood: 'Bole Medhanealem',
    address: 'Behind Medhanealem Cathedral, Bole, Addis Ababa',
    lat: 8.9995,
    lng: 38.7890,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 980,
    vibe: 'Minimalist Sunlit Bakery, Warm Bread Aromas & Scandi Wooden Benches',
    romanticHighlight: 'The intoxicating aroma of freshly baked sourdough bread straight from the stone oven, paired with warm cardamom buns for a quiet morning date.',
    signatureOrder: 'Cardamom Cinnamon Morning Bun & Smoked Turkey Sourdough Melt',
    openingHours: '7:30 AM – 8:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Blonde Scandinavian birch benches, shelves of rustic crusty sourdough loaves with flour stencils, open view into the flour-dusted bakers\' workshop.',
    menuHighlights: [
      { name: 'Swedish Cardamom Morning Bun', category: 'Food', priceETB: 240, description: 'Twisted sourdough brioche infused with freshly crushed green cardamom and pearl sugar', isPopular: true },
      { name: 'Smoked Turkey & Gruyère Tartine', category: 'Food', priceETB: 390, description: 'Toasted wild sourdough slice with dijon mustard, smoked turkey breast, melted gruyère', isPopular: true },
      { name: 'Country Sourdough Loaf (Takeaway)', category: 'Food', priceETB: 280, description: '36-hour slow fermented wild sourdough loaf with blistered dark crust' },
      { name: 'Batch Brew Guji Specialty Coffee', category: 'Coffee', priceETB: 150, description: 'Clean, balanced drip coffee brewed with seasonal Guji beans' }
    ],
    tags: ['bakery', 'patisserie', 'sourdough', 'bole medhanealem', 'bole', 'cardamom bun', 'breakfast'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Crust+and+Crumb+Bakery+Bole+Addis+Ababa'
  },
  {
    id: 'spot-brioche-doree-kazanchis',
    name: 'Brioche Dorée Patisserie & Salon de Thé',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'bakery',
    bestKnownFor: 'Golden Flaky Butter Brioches, Glazed Strawberry Tartlets & French Earl Grey Tea',
    neighborhood: 'Kazanchis',
    address: 'Menelik II Ave, Kazanchis, Addis Ababa',
    lat: 9.0205,
    lng: 38.7655,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1050,
    vibe: 'Classic French Tea Salon, Velvet Chairs & Glass Pastry Vitrines',
    romanticHighlight: 'Afternoon tea date in a stylish French salon, sharing delicate strawberry tartelettes and buttery brioches served on tiered silver stands.',
    signatureOrder: 'Tartelette aux Fraises & Brioche Tressée with French Tea',
    openingHours: '8:00 AM – 9:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 300,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm cream-colored walls, tufted navy velvet chairs, crystal wall sconces, gentle French cafe accordion and jazz background music.',
    menuHighlights: [
      { name: 'Tartelette Glacée aux Fraises', category: 'Dessert', priceETB: 330, description: 'Crisp sweet pastry shell filled with vanilla pastry cream and fresh glazed strawberries', isPopular: true },
      { name: 'Brioche Tressée au Sucre Perlé', category: 'Food', priceETB: 220, description: 'Feathery braided French butter brioche topped with coarse sugar crystals' },
      { name: 'Croque Monsieur Traditionnel', category: 'Food', priceETB: 380, description: 'Toasted brioche sandwich with smoked beef, creamy bechamel, and melted cheese', isPopular: true },
      { name: 'French Earl Grey Tea Pot for Two', category: 'Coffee', priceETB: 240, description: 'Bergamot black tea with floral blue cornflowers served with lemon and honey' }
    ],
    tags: ['bakery', 'patisserie', 'kazanchis', 'french tea', 'tart', 'brioche', 'romantic afternoon'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Brioche+Doree+Kazanchis+Addis+Ababa'
  },
  {
    id: 'spot-bread-butter-bulbula',
    name: 'Bread & Butter Viennoiserie',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'bakery',
    bestKnownFor: 'Caramelized Kouign-Amann Pastries, Chocolate Hazelnut Twists & Silky Flat Whites',
    neighborhood: 'Bole Bulbula',
    address: 'Bole Bulbula Main Commercial Ave, Addis Ababa',
    lat: 8.9690,
    lng: 38.7765,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 850,
    vibe: 'Sunny Neighborhood Morning Gem, Fresh Cinnamon Scents & Intimate Corner Tables',
    romanticHighlight: 'Addis Ababa’s finest Breton Kouign-Amann with crispy caramelized outer crust and buttery tender interior, nestled in a cozy Bulbula corner.',
    signatureOrder: 'Caramelized Kouign-Amann & Chocolate Hazelnut Twist',
    openingHours: '7:30 AM – 8:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 270,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Sun-drenched floor-to-ceiling windows, small round wooden bistro tables, warm aroma of caramelized butter and cinnamon, cheerful couple morning vibe.',
    menuHighlights: [
      { name: 'Breton Kouign-Amann Pastry', category: 'Food', priceETB: 260, description: 'Laminated pastry dough folded with butter and sugar until deeply caramelized and crispy', isPopular: true },
      { name: 'Chocolate Hazelnut Twist', category: 'Food', priceETB: 230, description: 'Twisted flaky puff pastry filled with Nutella and roasted chopped hazelnuts' },
      { name: 'Cheddar & Jalapeño Scone', category: 'Food', priceETB: 190, description: 'Savory warm scone with sharp cheddar and mild jalapeño kick' },
      { name: 'Silky Double Flat White', category: 'Coffee', priceETB: 160, description: 'Smooth double espresso with velvet textured whole milk' }
    ],
    tags: ['bakery', 'patisserie', 'bole bulbula', 'bulbula', 'kouign amann', 'breakfast', 'pastry'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bread+and+Butter+Bole+Bulbula+Addis+Ababa'
  },
  {
    id: 'spot-bella-crust-gerji-imperial',
    name: 'Bella Crust European Bakehouse',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'bakery',
    bestKnownFor: 'Warm Blueberry Cream Scones, Spinach & Feta Puff Pastries & Fresh Fruit Danishes',
    neighborhood: 'Gerji Imperial',
    address: 'Imperial Junction, Gerji, Addis Ababa',
    lat: 8.9940,
    lng: 38.8020,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 900,
    vibe: 'Airy Glass Bakery, Warm Pastry Warming Lamps & Cozy Couples Corner',
    romanticHighlight: 'Warm blueberry scones served straight from the oven with clotted cream and strawberry jam in a quiet Gerji sunlit conservatory.',
    signatureOrder: 'Blueberry Cream Scones with Jam & Apricot Danish',
    openingHours: '7:00 AM – 9:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'High glass frontage overlooking tree-lined street, marble counter, comfortable cushioned banquettes, pastry display that glistens under warm golden lights.',
    menuHighlights: [
      { name: 'Warm Blueberry Scones with Clotted Cream', category: 'Food', priceETB: 240, description: 'Two house-baked buttermilk scones with clotted cream and homemade strawberry conserve', isPopular: true },
      { name: 'Glazed Fresh Apricot Danish', category: 'Food', priceETB: 210, description: 'Flaky laminated pastry with vanilla custard and poached apricot halves' },
      { name: 'Spinach & Greek Feta Pastry Roll', category: 'Food', priceETB: 220, description: 'Golden flaky puff pastry filled with seasoned spinach and crumbled feta cheese', isPopular: true },
      { name: 'Caramel Macchiato Freddo', category: 'Coffee', priceETB: 180, description: 'Chilled layered macchiato with caramel syrup over crushed ice' }
    ],
    tags: ['bakery', 'patisserie', 'gerji', 'gerji imperial', 'scones', 'danish', 'breakfast'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bella+Crust+Bakery+Gerji+Addis+Ababa'
  },

  // ================= 5. BREAKFAST & BRUNCH HOUSES ("BREAKFAST HOUSE") =================
  {
    id: 'spot-breakfast-club-atlas',
    name: 'The Breakfast Club Addis',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Fluffy Ricotta Blueberry Hotcakes, Smashed Avocado Poached Egg Toast & Mimosas',
    neighborhood: 'Bole Atlas',
    address: 'Namibia St, Bole Atlas, Addis Ababa',
    lat: 9.0120,
    lng: 38.7730,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 1800,
    vibe: 'Trendy Modern Brunch Loft, Neon "Brunch All Day" Sign & Sunlit Skylight',
    romanticHighlight: 'Indulge in towering stacks of cloud-like ricotta blueberry hotcakes and iced mimosas together under sunlit skylights in Bole Atlas.',
    signatureOrder: 'Ricotta Blueberry Hotcakes with Maple Butter & Truffle Eggs Benedict',
    openingHours: '8:00 AM – 4:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Whitewashed brick walls, hanging ferns, sunlight pouring through a glass ceiling atrium, upbeat morning soul tracks, vibrant brunch crowd.',
    menuHighlights: [
      { name: 'Fluffy Ricotta Blueberry Hotcakes', category: 'Food', priceETB: 520, description: 'Triple stack of soufflé-style hotcakes with honeycomb butter, fresh blueberries, pure maple syrup', isPopular: true },
      { name: 'Truffle Mushroom Eggs Benedict', category: 'Food', priceETB: 560, description: 'Poached free-range eggs over toasted brioche, sautéed wild mushrooms, truffle hollandaise', isPopular: true },
      { name: 'Smashed Avocado & Feta Toast', category: 'Food', priceETB: 420, description: 'Country sourdough, ripe avocado, crumbled feta, cherry tomatoes, dukkah spice' },
      { name: 'Sparkling Orange Mimosa Cocktail', category: 'Cocktail', priceETB: 360, description: 'Fresh squeezed Valencia orange juice topped with crisp prosecco' }
    ],
    tags: ['breakfast', 'brunch', 'hotcakes', 'pancakes', 'eggs benedict', 'bole atlas', 'atlas', 'mimosa'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Breakfast+Club+Bole+Atlas+Addis+Ababa'
  },
  {
    id: 'spot-soreamba-hilltop-piassa',
    name: 'Soreamba Hilltop Breakfast & Veranda',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Panoramic Hillside Morning Views, Traditional Ful Mudammas & Fresh Pastry Baskets',
    neighborhood: 'Piassa',
    address: 'Belay Zeleke Way, Piassa Hilltop, Addis Ababa',
    lat: 9.0410,
    lng: 38.7560,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1300,
    vibe: 'Colonial Hilltop Veranda Overlooking Historic City & Morning Mist',
    romanticHighlight: 'Watch the morning mist lift over historic Piassa from an elevated stone veranda while sharing steaming fava bean ful and French press coffee.',
    signatureOrder: 'Spiced Special Ful Mudammas with Boiled Eggs & French Press Coffee',
    openingHours: '7:00 AM – 3:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Historic colonial stone balcony overlooking rooftops and church spires of Piassa, cool morning mountain breeze, wrought iron balcony railing.',
    menuHighlights: [
      { name: 'Special Ful Mudammas with Boiled Eggs & Feta', category: 'Food', priceETB: 340, description: 'Slow-simmered fava beans in berbere-spiced olive oil, diced tomatoes, jalapeños, crumbled feta, warm bread', isPopular: true },
      { name: 'Enkulal Firfir with Kibe Butter', category: 'Food', priceETB: 320, description: 'Scrambled eggs mixed with pieces of injera and spiced clarified butter' },
      { name: 'French Press Yirgacheffe Carafe for Two', category: 'Coffee', priceETB: 220, description: 'Steaming French press with floral notes to wake you up gently' },
      { name: 'Warm Croissant with Honey & Jam', category: 'Food', priceETB: 180, description: 'Flaky breakfast croissant served with butter, local honey, and berry jam' }
    ],
    tags: ['breakfast', 'brunch', 'piassa', 'ful', 'hilltop', 'panoramic view', 'morning date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Soreamba+Hotel+Piassa+Addis+Ababa'
  },
  {
    id: 'spot-pergola-garden-cmc',
    name: 'The Pergola Garden Cafe & Brunch',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Cast-Iron Moroccan Shakshuka, Brioche French Toast & Passionfruit Iced Tea',
    neighborhood: 'CMC',
    address: 'CMC Sunshine Real Estate Compound, Addis Ababa',
    lat: 9.0260,
    lng: 38.8370,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1450,
    vibe: 'Blooming Bougainvillea Pergolas, Soft Flowing Fountain & Romantic Morning Sun',
    romanticHighlight: 'A quiet, lush sanctuary tucked in CMC with blooming pink bougainvillea, bubbling fountain water, and bubbling cast-iron shakshuka.',
    signatureOrder: 'Cast-Iron Shakshuka with Feta & Caramelized Brioche French Toast',
    openingHours: '8:00 AM – 6:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 350,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Outdoor wooden pergolas entwined with flowering vines, gentle central garden fountain, soft acoustic guitar soundtrack, private sun-dappled tables.',
    menuHighlights: [
      { name: 'Cast-Iron Shakshuka with Feta & Herbs', category: 'Food', priceETB: 420, description: 'Poached eggs nestled in rich spiced tomato-bell pepper sauce with crumbled feta and warm sourdough', isPopular: true },
      { name: 'Caramelized Brioche French Toast', category: 'Food', priceETB: 440, description: 'Thick sliced brioche soaked in vanilla custard, brûléed with cinnamon sugar, berry compote', isPopular: true },
      { name: 'Passionfruit & Mint Iced Tea Pitcher', category: 'Cocktail', priceETB: 240, description: 'Brewed black tea infused with real passionfruit pulp and fresh garden mint' },
      { name: 'Cortado with Oat Milk', category: 'Coffee', priceETB: 160, description: 'Rich espresso balanced with creamy warm oat milk' }
    ],
    tags: ['breakfast', 'brunch', 'cmc', 'shakshuka', 'french toast', 'garden', 'sunshine'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pergola+Garden+Brunch+CMC+Addis+Ababa'
  },
  {
    id: 'spot-golden-morning-jackros',
    name: 'Golden Morning Waffle & Brunch Bar',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Crispy Chicken & Waffles with Spiced Honey, Smoked Beef Bacon Scramble & Cold Brew',
    neighborhood: 'Jackros / Gerji',
    address: 'Jackros Main Blvd, Addis Ababa',
    lat: 9.0095,
    lng: 38.8260,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1350,
    vibe: 'Warm Timber & Brass Accents, Cheerful Morning Buzz & Cozy Couple Booths',
    romanticHighlight: 'Satisfy weekend morning cravings together with buttermilk fried chicken perched on golden Belgian waffles with spicy honey butter in Jackros.',
    signatureOrder: 'Crispy Chicken & Waffles with Hot Honey & Vanilla Cold Brew',
    openingHours: '8:00 AM – 5:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 300,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm timber booths, brass pendant lights, upbeat acoustic soul tunes, aroma of crisp waffles and maple syrup, cheerful couple date setting.',
    menuHighlights: [
      { name: 'Buttermilk Chicken & Waffles', category: 'Food', priceETB: 480, description: 'Crispy spiced chicken tenders over golden Belgian waffle with habanero honey and maple syrup', isPopular: true },
      { name: 'Smoked Beef Bacon & Cheddar Scramble', category: 'Food', priceETB: 390, description: 'Fluffy scrambled eggs, crispy smoked beef bacon, aged cheddar, roasted herb potatoes' },
      { name: 'Avocado Toast with Pomegranate & Zaatar', category: 'Food', priceETB: 360, description: 'Crushed avocado on seeded toast with pomegranate seeds and za\'atar olive oil drizzle' },
      { name: 'Vanilla Cream Cold Brew', category: 'Coffee', priceETB: 180, description: '16-hour steeped cold brew coffee topped with thick sweet cream layer', isPopular: true }
    ],
    tags: ['breakfast', 'brunch', 'chicken and waffles', 'jackros', 'gerji', 'morning date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Golden+Morning+Brunch+Jackros+Addis+Ababa'
  },
  {
    id: 'spot-sarbet-morning-retreat',
    name: 'Sarbet Morning Retreat & Tea Garden',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'English Garden Breakfast, Poached Eggs Florentine, Warm Scones & Herbal Infusions',
    neighborhood: 'Old Airport / Sarbet',
    address: 'Near Canadian Embassy, Sarbet, Addis Ababa',
    lat: 8.9920,
    lng: 38.7400,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1500,
    vibe: 'Secret Walled English Cottage Garden, Wicker Chairs & Morning Birdsong',
    romanticHighlight: 'A tranquil walled cottage garden with chirping songbirds, eating delicate eggs florentine and sharing warm scones with cream.',
    signatureOrder: 'Eggs Florentine with Spinach Hollandaise & Fresh Scones with Cream',
    openingHours: '7:30 AM – 3:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'White wicker furniture, stone garden pathways, fragrant lavender and rosemary bushes, private hedge-enclosed couple tables under shade umbrellas.',
    menuHighlights: [
      { name: 'Eggs Florentine on Brioche', category: 'Food', priceETB: 460, description: 'Two poached farm eggs over wilted spinach, brioche toast, silky citrus hollandaise', isPopular: true },
      { name: 'Sarbet Garden Big Breakfast', category: 'Food', priceETB: 520, description: 'Eggs any style, beef sausage, grilled tomato, sautéed mushrooms, baked beans, toast' },
      { name: 'Warm Cream Scones for Two', category: 'Food', priceETB: 320, description: 'Two golden scones with homemade raspberry preserve and whipped double cream', isPopular: true },
      { name: 'Chamomile & Lemongrass Herbal Infusion', category: 'Coffee', priceETB: 150, description: 'Fresh dried whole chamomile flowers and lemongrass steeped in glass teapot' }
    ],
    tags: ['breakfast', 'brunch', 'sarbet', 'old airport', 'english breakfast', 'garden', 'quiet date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sarbet+Garden+Brunch+Addis+Ababa'
  },

  // ================= 6. ROMANTIC DINNER HOUSES ("DINNER HOUSE") =================
  {
    id: 'spot-sky-steakhouse-capital',
    name: 'Sky Steakhouse & Lounge at Capital',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Prime Dry-Aged Ribeye Steaks, Candlelit Panoramic City Skyline & Sommelier Wine Cellar',
    neighborhood: 'Kazanchis',
    address: 'Capital Hotel 9th Floor, Haile Gebreselassie Ave, Addis Ababa',
    lat: 9.0160,
    lng: 38.7750,
    priceLevel: 'ETB $$$$',
    avgCostForTwoETB: 4200,
    vibe: 'High-Altitude Luxury Dining, Candlelit Floor-to-Ceiling Windows & Intimate Romance',
    romanticHighlight: 'Addis Ababa’s premier high-altitude steakhouse: candlelit tables set right against floor-to-ceiling glass overlooking millions of city lights.',
    signatureOrder: 'Charbroiled Dry-Aged Ribeye (450g), Garlic Herb Butter & Cabernet Sauvignon',
    openingHours: '6:00 PM – 11:30 PM (Daily)',
    rating: 4.9,
    reviewCount: 460,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Sleek dark marble, ambient amber spotlights, glass wine cellar, romantic leather high-backed booths facing panoramic city night vistas.',
    menuHighlights: [
      { name: 'Prime Dry-Aged Ribeye (450g)', category: 'Food', priceETB: 1450, description: '28-day dry aged beef steak, charbroiled over volcanic stone, herb butter, truffle fries', isPopular: true },
      { name: 'Pan-Roasted Atlantic Salmon', category: 'Food', priceETB: 1250, description: 'Crisp skin salmon fillet with lemon dill cream, asparagus spears, and saffron mashed potatoes' },
      { name: 'Napa Valley Cabernet Sauvignon (Glass)', category: 'Cocktail', priceETB: 680, description: 'Rich, velvety full-bodied red wine with blackberry and oak finish' },
      { name: 'Warm Chocolate Fondant with Gold Leaf', category: 'Dessert', priceETB: 450, description: 'Gooey dark chocolate center with Madagascar vanilla gelato and 24k gold leaf', isPopular: true }
    ],
    tags: ['dinner', 'romantic dinner', 'steakhouse', 'fine dining', 'kazanchis', 'skyline', 'anniversary'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Capital+Hotel+Sky+Steakhouse+Addis+Ababa'
  },
  {
    id: 'spot-five-loaves-brass',
    name: 'Five Loaves Secret Garden Bistro',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Seductive Fairy-Lit Walled Garden, Grilled Rosemary Lamb Chops & Truffle Risotto',
    neighborhood: 'Bole',
    address: 'Bole Brass St, Addis Ababa',
    lat: 8.9925,
    lng: 38.7810,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2900,
    vibe: 'Magical Fairy-Lit Garden Courtyard, Whispering Trees & Candlelit Intimacy',
    romanticHighlight: 'Hidden behind a tranquil Bole residential wall, dine under tall trees illuminated by hundreds of twinkling fairy lights with tender rosemary lamb chops.',
    signatureOrder: 'Rosemary Garlic Lamb Chops with Mint Jus & Wild Mushroom Risotto',
    openingHours: '12:00 PM – 10:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Secret garden courtyard with pebble pathways, soft glowing fairy lights wrapped around tree trunks, candles in glass lanterns, and secluded bistro tables.',
    menuHighlights: [
      { name: 'Grilled Rosemary Lamb Chops', category: 'Food', priceETB: 980, description: 'Charred lamb chops marinated in garlic and rosemary, served with mint demi-glace and roasted root vegetables', isPopular: true },
      { name: 'Creamy Wild Mushroom & Truffle Risotto', category: 'Food', priceETB: 790, description: 'Carnaroli rice cooked in rich vegetable broth with porcini mushrooms and truffle oil', isPopular: true },
      { name: 'Classic Beef Carpaccio', category: 'Food', priceETB: 540, description: 'Thinly sliced raw beef fillet with capers, shaved parmesan, extra virgin olive oil, and arugula' },
      { name: 'French Apple Tarte Tatin', category: 'Dessert', priceETB: 360, description: 'Caramelized upside-down apple tart served warm with cinnamon gelato', isPopular: true }
    ],
    tags: ['dinner', 'romantic dinner', 'garden dining', 'bole', 'brass', 'lamb chops', 'fairy lights', 'bistro'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Five+Loaves+Bistro+Bole+Addis+Ababa'
  },
  {
    id: 'spot-nouvelle-etoile-atlas',
    name: 'La Nouvelle Etoile French Dining',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Crispy Duck Breast à l’Orange, Beef Bourguignon & Candlelit French Chanson Romance',
    neighborhood: 'Bole Atlas',
    address: 'Djibouti St, Bole Atlas, Addis Ababa',
    lat: 9.0135,
    lng: 38.7740,
    priceLevel: 'ETB $$$$',
    avgCostForTwoETB: 3600,
    vibe: 'Sophisticated French Fine Dining, Crisp Damask Linens & Soft Cello Melodies',
    romanticHighlight: 'An ultra-romantic French fine dining room where candlelight flickers against crystal wine glasses, savoring succulent duck breast à l\'orange.',
    signatureOrder: 'Canard à l’Orange with Potato Dauphinoise & Chocolate Soufflé',
    openingHours: '6:30 PM – 11:00 PM (Tue–Sun)',
    rating: 4.9,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Crisp white damask tablecloths, silver candelabras with real dripping wax candles, soft Edith Piaf and cello music, intimate French salon charm.',
    menuHighlights: [
      { name: 'Magret de Canard à l\'Orange', category: 'Food', priceETB: 1150, description: 'Seared duck breast cooked medium rare with Grand Marnier orange glaze and potato gratin', isPopular: true },
      { name: 'Boeuf Bourguignon Traditionnel', category: 'Food', priceETB: 920, description: 'Slow-braised tender beef cheek in Burgundy red wine with pearl onions and lardons' },
      { name: 'French Onion Soup Gratinée', category: 'Food', priceETB: 420, description: 'Caramelized onion broth topped with sourdough crouton and bubbly melted Gruyère cheese' },
      { name: 'Grand Marnier Chocolate Soufflé (For Two)', category: 'Dessert', priceETB: 490, description: 'Puffed warm chocolate soufflé with vanilla crème anglaise poured at table', isPopular: true }
    ],
    tags: ['dinner', 'romantic dinner', 'french', 'fine dining', 'bole atlas', 'atlas', 'duck', 'anniversary'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=French+Restaurant+Bole+Atlas+Addis+Ababa'
  },
  {
    id: 'spot-lighthouse-gerji-imperial',
    name: 'Lighthouse Garden Restaurant',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Sizzling Beef Tenderloin with Green Peppercorn Sauce & Secluded Garden Gazebos',
    neighborhood: 'Gerji Imperial',
    address: 'Behind Imperial Hotel, Gerji, Addis Ababa',
    lat: 8.9935,
    lng: 38.8040,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2400,
    vibe: 'Rustic Garden Gazebos Wrapped in Fairy Lights & Gentle Ambient Soft Music',
    romanticHighlight: 'Private wooden gazebos tucked among bamboo trees in Gerji, enjoying juicy sizzling steak by candlelight away from any prying eyes.',
    signatureOrder: 'Fillet Mignon au Poivre & Warm Apple Crumble',
    openingHours: '12:00 PM – 11:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Private individual thatched gazebos wrapped in warm fairy lights, stone fountain in the center garden, soft ambient music, very romantic and quiet.',
    menuHighlights: [
      { name: 'Fillet Mignon au Poivre (300g)', category: 'Food', priceETB: 880, description: 'Pan-seared tenderloin steak in creamy Madagascar green peppercorn and cognac sauce', isPopular: true },
      { name: 'Grilled Jumbo Tiger Prawns', category: 'Food', priceETB: 950, description: 'Charred prawns in garlic herb butter with saffron rice and steamed vegetables' },
      { name: 'South African Shiraz (Bottle for Two)', category: 'Cocktail', priceETB: 980, description: 'Spicy bold red wine with black pepper and plum notes' },
      { name: 'Warm Dutch Apple Crumble with Ice Cream', category: 'Dessert', priceETB: 320, description: 'Baked cinnamon spiced apples topped with buttery oat crumble and vanilla ice cream', isPopular: true }
    ],
    tags: ['dinner', 'romantic dinner', 'gerji', 'gerji imperial', 'steak', 'gazebo', 'candlelit'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lighthouse+Garden+Gerji+Addis+Ababa'
  },
  {
    id: 'spot-olive-grove-bulbula',
    name: 'The Olive Grove Courtyard & Grill',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Mediterranean Charred Lamb Cutlets, Olive Canopy Candlelight & Sangria Pitchers',
    neighborhood: 'Bole Bulbula',
    address: 'Bole Bulbula Gate 2, Addis Ababa',
    lat: 8.9645,
    lng: 38.7785,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2300,
    vibe: 'Olive Tree Canopy, Candlelit Lanterns & Private Romantic Alcoves',
    romanticHighlight: 'Dine in an enclosed Mediterranean courtyard beneath olive trees with hanging copper lanterns, sipping spiced red sangria with tender charred lamb.',
    signatureOrder: 'Wood-Fired Herb Lamb Cutlets & House Sangria Pitcher',
    openingHours: '12:00 PM – 11:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Enclosed courtyard with potted olive and lemon trees, warm copper lanterns, Spanish guitar background music, and private dining booths.',
    menuHighlights: [
      { name: 'Charred Mediterranean Lamb Cutlets', category: 'Food', priceETB: 850, description: 'Marinated in wild oregano, lemon, and garlic, char-grilled with roasted baby potatoes and tzatziki', isPopular: true },
      { name: 'Spanish Seafood Paella (For Two)', category: 'Food', priceETB: 980, description: 'Saffron bomba rice with calamari, prawns, mussels, sweet peppers, and peas', isPopular: true },
      { name: 'Pitcher of Spiced Red Wine Sangria', category: 'Cocktail', priceETB: 580, description: 'Red wine infused with fresh oranges, apples, cinnamon stick, and a splash of brandy' },
      { name: 'Catalan Burnt Cream (Crema Catalana)', category: 'Dessert', priceETB: 320, description: 'Silky citrus and cinnamon infused custard with brittle caramelized sugar crust' }
    ],
    tags: ['dinner', 'romantic dinner', 'bole bulbula', 'bulbula', 'mediterranean', 'lamb', 'sangria'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Olive+Grove+Grill+Bole+Bulbula+Addis+Ababa'
  },
  {
    id: 'spot-orchid-fine-dining-bole',
    name: 'Orchid Romantic Fine Dining',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Pan-Seared Nile Perch in Lemon Caper Butter, Soft Live Grand Piano & Silver Candelabras',
    neighborhood: 'Bole Medhanealem',
    address: 'Near Bole Medhanealem Cathedral, Addis Ababa',
    lat: 9.0010,
    lng: 38.7885,
    priceLevel: 'ETB $$$$',
    avgCostForTwoETB: 3500,
    vibe: 'Grand Piano Elegance, Tall Silver Candelabras & Impeccable White Glove Service',
    romanticHighlight: 'Live grand piano classics playing gently in the background while enjoying fresh Lake Tana Nile perch and vintage champagne for your anniversary.',
    signatureOrder: 'Pan-Seared Nile Perch Fillet & Molten Chocolate Fondant',
    openingHours: '6:00 PM – 11:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 370,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Baby grand piano at center stage, tall silver candelabras with flickering white tapers, plum velvet chairs, and discreet couple booths.',
    menuHighlights: [
      { name: 'Pan-Seared Nile Perch Meunière', category: 'Food', priceETB: 980, description: 'Fresh Lake Tana perch fillet in browned butter, capers, fresh parsley, and crushed herb potatoes', isPopular: true },
      { name: 'Chateaubriand Tenderloin for Two', category: 'Food', priceETB: 1800, description: 'Center-cut beef tenderloin carved tableside with béarnaise sauce and seasonal vegetables', isPopular: true },
      { name: 'Chilled Moët & Chandon Brut (Glass)', category: 'Cocktail', priceETB: 950, description: 'Crisp French champagne with fine bubbles and toasted brioche notes' },
      { name: 'Classic Molten Chocolate Lava Fondant', category: 'Dessert', priceETB: 420, description: 'Valrhona dark chocolate cake with warm molten center and pistachio gelato' }
    ],
    tags: ['dinner', 'romantic dinner', 'fine dining', 'bole medhanealem', 'bole', 'piano', 'anniversary'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Orchid+Restaurant+Bole+Medhanealem+Addis+Ababa'
  },

  // ================= 7. COCKTAIL HOUSES & LOUNGES ("COCTAIL HOUSE") =================
  {
    id: 'spot-flirt-lounge-medhanealem',
    name: 'Flirt Lounge & Cocktail Bar',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Neon-Lit Signature Passionfruit Martinis, Seductive Deep House Beats & Circular Velvet Booths',
    neighborhood: 'Bole Medhanealem',
    address: 'Next to Edna Mall, Bole, Addis Ababa',
    lat: 8.9985,
    lng: 38.7870,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2100,
    vibe: 'Sultry Neon Blue & Violet Glow, Plush Circular Velvet Booths & Hip Couple Vibes',
    romanticHighlight: 'Curl up in a private circular booth glowing with purple neon, sipping passionfruit martinis and vibing to deep house music on weekend nights.',
    signatureOrder: 'Signature Passionfruit Martini & Crispy Calamari with Spicy Aioli',
    openingHours: '5:00 PM – 2:00 AM (Daily)',
    rating: 4.7,
    reviewCount: 430,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Curved sapphire and ultraviolet LED underglow, black granite bar top, plush circular velvet banquettes, low coffee tables, and chilled lounge beats.',
    menuHighlights: [
      { name: 'Flirt Passionfruit Pornstar Martini', category: 'Cocktail', priceETB: 440, description: 'Vanilla vodka, passionfruit liqueur, fresh puree, served with shot of chilled prosecco', isPopular: true },
      { name: 'Smoky Mezcalita with Chili Rim', category: 'Cocktail', priceETB: 480, description: 'Artisanal mezcal, fresh lime, agave nectar, black volcanic salt and chili rim', isPopular: true },
      { name: 'Crispy Calamari with Garlic Aioli', category: 'Food', priceETB: 460, description: 'Tender squid rings dusted in seasoned flour with lemon wedge and garlic dip' },
      { name: 'Truffle Parmesan Hand-Cut Fries', category: 'Food', priceETB: 280, description: 'Crisp golden fries tossed in white truffle oil and shaved aged parmesan' }
    ],
    tags: ['cocktail', 'cocktail house', 'cocktails', 'lounge', 'bole medhanealem', 'bole', 'late night', 'music'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flirt+Lounge+Bole+Addis+Ababa'
  },
  {
    id: 'spot-the-hangover-atlas',
    name: 'The Hangover Sunset Deck & Tapas',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Open-Air Sunset Mojitos, Smoked BBQ Beef Sliders & 360-Degree Addis Lights',
    neighborhood: 'Bole Atlas',
    address: 'Top Floor, Atlas Plaza, Bole Atlas, Addis Ababa',
    lat: 9.0110,
    lng: 38.7750,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1600,
    vibe: 'High-Energy Sunset Deck, Ambient DJ Lounge Grooves & Starlit Skyline',
    romanticHighlight: 'Golden hour drinks high above the bustling Atlas strip, watching the sunset turn the sky purple while sharing craft mojitos and beef sliders.',
    signatureOrder: 'Classic Cuban Mint Mojito & Gourmet Sliders Trio',
    openingHours: '4:00 PM – 1:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Rooftop wooden decking, glass railings offering unobstructed panoramic views, glowing fire pits, high-top couple tables, and DJ booth playing chill sunset beats.',
    menuHighlights: [
      { name: 'Cuban Rum Mojito with Fresh Mint', category: 'Cocktail', priceETB: 390, description: 'Muddled fresh mint leaves, white rum, fresh lime juice, cane sugar, sparkling soda', isPopular: true },
      { name: 'Sunset Aperol Paloma', category: 'Cocktail', priceETB: 420, description: 'Tequila blanco, Aperol, pink grapefruit juice, lime, club soda', isPopular: true },
      { name: 'Trio of Gourmet Beef Sliders', category: 'Food', priceETB: 450, description: 'Three mini brioche burgers with cheddar, caramelized onions, and truffle mayo' },
      { name: 'Spicy Buffalo Wings with Blue Cheese', category: 'Food', priceETB: 380, description: 'Crisp wings tossed in tangy hot sauce with crunchy celery sticks and blue cheese dip' }
    ],
    tags: ['cocktail', 'cocktail house', 'cocktails', 'rooftop', 'sunset', 'bole atlas', 'atlas', 'tapas'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Hangover+Rooftop+Bole+Atlas+Addis+Ababa'
  },
  {
    id: 'spot-vibe-cocktail-bulbula',
    name: 'Vibe Cocktail Bar & Social Loft',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Craft Hibiscus Gin Fizzes, Smoky Mezcalita Cocktails & Dim Candlelit Couple Corners',
    neighborhood: 'Bole Bulbula',
    address: 'Bole Bulbula Commercial Center 3rd Floor, Addis Ababa',
    lat: 8.9675,
    lng: 38.7760,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1500,
    vibe: 'Intimate Industrial Chic, Brick Walls, Candlelit High-Tops & Chill Afro-Beats',
    romanticHighlight: 'Bulbula\'s trendiest cocktail retreat: craft mixology with house-infused Ethiopian hibiscus syrups and intimate, dim-lit corners.',
    signatureOrder: 'Hibiscus Smoked Gin Fizz & Truffle Parmesan Fries',
    openingHours: '5:00 PM – 1:30 AM (Daily)',
    rating: 4.8,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Exposed charcoal brick, warm copper piping, Edison bulb chandeliers, candlelit high-top tables for couples, smooth Afro-house beats.',
    menuHighlights: [
      { name: 'Addis Hibiscus Smoked Gin Fizz', category: 'Cocktail', priceETB: 380, description: 'Dry gin, home-brewed karkadeh hibiscus reduction, lemon juice, egg white foam, rosemary smoke', isPopular: true },
      { name: 'Spiced Honey Whiskey Sour', category: 'Cocktail', priceETB: 410, description: 'Bourbon, fresh lemon juice, organic Ethiopian highland honey, Angostura bitters', isPopular: true },
      { name: 'Crispy Mozzarella Sticks with Marinara', category: 'Food', priceETB: 320, description: 'Deep-fried herb-crusted mozzarella with warm tomato basil dip' },
      { name: 'BBQ Pulled Beef Quesadilla', category: 'Food', priceETB: 390, description: 'Toasted flour tortilla stuffed with slow-cooked shredded beef, melted cheddar, and jalapeños' }
    ],
    tags: ['cocktail', 'cocktail house', 'cocktails', 'bole bulbula', 'bulbula', 'craft drinks', 'cozy'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vibe+Cocktail+Bar+Bole+Bulbula+Addis+Ababa'
  },
  {
    id: 'spot-velvet-room-speakeasy-kazanchis',
    name: 'Velvet Room Secret Speakeasy',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Hidden Bookcase Secret Door, Smoked Old Fashioneds & Live Solo Jazz Trumpet',
    neighborhood: 'Kazanchis',
    address: 'Discreet Alley behind Tito St, Kazanchis, Addis Ababa',
    lat: 9.0190,
    lng: 38.7665,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2400,
    vibe: '1920s Prohibition Speakeasy, Red Velvet Curtains, Low Amber Lamps & Total Seclusion',
    romanticHighlight: 'Push open the unmarked faux bookcase door to discover an ultra-exclusive speakeasy with smoked hickory Old Fashioneds and solo live jazz trumpet.',
    signatureOrder: 'Smoked Hickory Old Fashioned & Dark Chocolate Truffles',
    openingHours: '7:00 PM – 2:00 AM (Wed–Sun)',
    rating: 4.9,
    reviewCount: 330,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Heavy crimson velvet drapery, brass oil lamps, dark mahogany bar, phonograph playing vintage jazz, secluded leather two-seater booths.',
    menuHighlights: [
      { name: 'Smoked Hickory Old Fashioned', category: 'Cocktail', priceETB: 490, description: 'Rye whiskey, angostura bitters, demerara sugar, smoked with fragrant hickory wood chips under glass cloche', isPopular: true },
      { name: 'French 75 Champagne Cocktail', category: 'Cocktail', priceETB: 520, description: 'London dry gin, freshly squeezed lemon juice, simple syrup, topped with Brut Champagne', isPopular: true },
      { name: 'Artisanal Cheese & Charcuterie Board', category: 'Food', priceETB: 650, description: 'Imported cheeses, prosciutto, cured beef, kalamata olives, dried figs, water crackers' },
      { name: 'Handmade Dark Chocolate Truffles (6 Pieces)', category: 'Dessert', priceETB: 290, description: 'Rich 70% dark chocolate truffles dusted in cocoa and sea salt' }
    ],
    tags: ['cocktail', 'cocktail house', 'speakeasy', 'kazanchis', 'jazz', 'hidden bar', 'secret', 'date night'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Velvet+Room+Speakeasy+Kazanchis+Addis+Ababa'
  },
  {
    id: 'spot-platinum-lounge-rwanda',
    name: 'Platinum Lounge & Runway Skyline Deck',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Watching Airport Jet Takeoffs Under the Stars, French Champagne & Fresh Sushi Rolls',
    neighborhood: 'Bole',
    address: 'Airport Link Road, Bole Rwanda, Addis Ababa',
    lat: 8.9890,
    lng: 38.7910,
    priceLevel: 'ETB $$$$',
    avgCostForTwoETB: 3200,
    vibe: 'Ultra-Modern Glass Lounge, Glowing Blue Countertops & Runway Starlight',
    romanticHighlight: 'Watch airplanes take off and land under the starlit Addis sky from a private glass balcony while sharing chilled champagne and sushi rolls.',
    signatureOrder: 'Dragon Sushi Roll Platter & Moët Champagne Flutes',
    openingHours: '5:00 PM – 2:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Glowing sapphire glass cocktail bar, plush low lounge couches, glass wind walls facing the runway flight paths, ambient progressive house music.',
    menuHighlights: [
      { name: 'Dragon Roll Sushi Platter (8 Pieces)', category: 'Food', priceETB: 780, description: 'Tempura prawn, avocado, cucumber, unagi eel sauce, spicy Japanese mayo', isPopular: true },
      { name: 'Moët & Chandon Brut Champagne (Glass)', category: 'Cocktail', priceETB: 890, description: 'Chilled French champagne served in crystal flutes with fresh strawberries', isPopular: true },
      { name: 'Tokyo Lychee Martini', category: 'Cocktail', priceETB: 460, description: 'Vodka, sweet lychee liqueur, cranberry juice, fresh lychee fruit garnish' },
      { name: 'Tempura Rock Shrimp with Spicy Sriracha Cream', category: 'Food', priceETB: 540, description: 'Crispy fried shrimp bites tossed in spicy creamy sauce with scallions' }
    ],
    tags: ['cocktail', 'cocktail house', 'cocktails', 'bole', 'rwanda', 'sushi', 'runway view', 'luxury'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Platinum+Lounge+Bole+Addis+Ababa'
  },
  {
    id: 'spot-jackros-nightcap-lounge',
    name: 'Jackros Nightcap Cocktail Retreat',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Intimate Spiced Rum Punches, Draft Craft Beers, Warm Hearth & Couple Board Games',
    neighborhood: 'Jackros / Gerji',
    address: 'Jackros Quiet Residential Gate 1, Addis Ababa',
    lat: 9.0100,
    lng: 38.8240,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1300,
    vibe: 'Low-Key Cozy Neighborhood Secret, Soft Wool Blankets & Warm Wooden Glow',
    romanticHighlight: 'A delightfully warm and unpretentious neighborhood secret in Jackros with board games, fleece blankets, hot toddies, and spiced rum punch.',
    signatureOrder: 'Spiced Honey Rum Punch & Garlic Butter Cheese Bread',
    openingHours: '5:30 PM – 1:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm timber walls, cozy fireplace hearth, soft wool throw blankets on sofas, low golden lighting, shelf of Scrabble and card games.',
    menuHighlights: [
      { name: 'Jackros Warm Spiced Rum Punch', category: 'Cocktail', priceETB: 360, description: 'Dark rum, spiced apple cider, orange juice, cinnamon stick, star anise, served warm or over ice', isPopular: true },
      { name: 'Cold St. George Draft Pitcher for Two', category: 'Cocktail', priceETB: 220, description: 'Freshly poured crisp cold Ethiopian draft beer' },
      { name: 'Pull-Apart Garlic Butter Cheese Bread', category: 'Food', priceETB: 290, description: 'Warm crusty loaf baked with garlic herb butter and melted mozzarella cheese', isPopular: true },
      { name: 'Spicy Chicken Quesadillas with Guacamole', category: 'Food', priceETB: 340, description: 'Grilled chicken, peppers, onions, melted cheddar with homemade salsa' }
    ],
    tags: ['cocktail', 'cocktail house', 'jackros', 'gerji', 'board games', 'cozy', 'fireplace', 'neighborhood bar'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cocktail+Lounge+Jackros+Addis+Ababa'
  },

  // ================= 8. SCENIC & NATURE SPOTS ("SCENIC SPOT") =================
  {
    id: 'spot-unity-park-gardens',
    name: 'Unity Park Royal Pavilions & Gardens',
    category: 'scenic',
    subCategory: 'Scenic',
    knownCategory: 'scenic',
    bestKnownFor: 'Strolling Grand Historic Imperial Palace Grounds, Royal Rose Gardens & Illuminated Fountains',
    neighborhood: 'Arat Kilo / Kirkos',
    address: 'Grand Palace Grounds, Arat Kilo, Addis Ababa',
    lat: 9.0265,
    lng: 38.7610,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1200,
    vibe: 'Majestic Imperial Gardens, Historic Stone Arches & Serene Couple Walkways',
    romanticHighlight: 'Walk hand-in-hand through lush historic royal rose gardens, marvel at the restored Imperial banquet palace, and watch dancing fountains together.',
    signatureOrder: 'Palace Rose Garden Walk, Royal Pavilion Tour & Afternoon Spiced Tea',
    openingHours: '9:00 AM – 6:00 PM (Daily)',
    rating: 4.9,
    reviewCount: 580,
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Immaculately manicured green lawns, blooming rose beds, historic 19th-century Ethiopian imperial architecture, quiet shaded wooden benches for couples.',
    menuHighlights: [
      { name: 'Palace Garden Spiced Tea for Two', category: 'Coffee', priceETB: 180, description: 'Brewed with cardamom, cinnamon, and fresh mint in the historic palace garden cafe', isPopular: true },
      { name: 'Traditional Honey Baklava Pastry', category: 'Dessert', priceETB: 150, description: 'Flaky phyllo pastry layers with walnuts and orange blossom honey' },
      { name: 'Chilled Hibiscus & Lemon Cooler', category: 'Cocktail', priceETB: 160, description: 'Tart refreshing hibiscus flower infusion over ice with lemon slices' }
    ],
    tags: ['scenic', 'scenic spot', 'nature', 'unity park', 'arat kilo', 'palace', 'garden', 'photo walk'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Unity+Park+Addis+Ababa'
  },
  {
    id: 'spot-bole-medhanealem-walk',
    name: 'Bole Medhanealem Promenade & Fountains',
    category: 'scenic',
    subCategory: 'Scenic',
    knownCategory: 'scenic',
    bestKnownFor: 'Evening Hand-in-Hand Strolls, Illuminated Fountains & Vibrant Cafe Scene',
    neighborhood: 'Bole Medhanealem',
    address: 'Medhanealem Promenade, Bole, Addis Ababa',
    lat: 8.9975,
    lng: 38.7865,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 500,
    vibe: 'Lively City Starlight Romance, Street Performers, Colorful Lights & Gelato Stops',
    romanticHighlight: 'An easy, carefree romantic evening stroll along the vibrant Medhanealem promenade, watching colorful water fountains and grabbing artisanal gelato.',
    signatureOrder: 'Evening Walk, Artisanal Gelato Cone & Roasted Nuts',
    openingHours: 'Open 24/7 (Best at Sunset – 10:00 PM)',
    rating: 4.7,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Pedestrian-friendly stone promenade, vibrant cafe awnings, colorful fountain lighting, laughter of strolling couples, cool evening breeze.',
    menuHighlights: [
      { name: 'Double Scoop Gelato Waffle Cone', category: 'Dessert', priceETB: 190, description: 'Pistachio and dark chocolate gelato served in a crisp homemade waffle cone', isPopular: true },
      { name: 'Steaming Spiced Chai Latte', category: 'Coffee', priceETB: 120, description: 'Fragrant spiced tea latte with frothed milk to keep warm while strolling' },
      { name: 'Fresh Roasted Salted Cashews & Peanuts', category: 'Food', priceETB: 100, description: 'Paper cone of hot roasted nuts from street vendors' }
    ],
    tags: ['scenic', 'scenic spot', 'walk', 'bole medhanealem', 'bole', 'promenade', 'evening date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bole+Medhanealem+Promenade+Addis+Ababa'
  },
  {
    id: 'spot-entoto-mary-viewpoint',
    name: 'Entoto Mount Mary Viewpoint & Pine Trails',
    category: 'scenic',
    subCategory: 'Scenic',
    knownCategory: 'scenic',
    bestKnownFor: 'Breathless 3,200m Elevation Panoramas of the Entire City Basin & Mountain Horse Trail',
    neighborhood: 'Entoto Hills',
    address: 'Mary Church Ridge, Entoto Hills, Addis Ababa',
    lat: 9.0720,
    lng: 38.7420,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 600,
    vibe: 'Crisp Pine-scented Mountain Breeze, Misty Cloudscapes & Majestic Horizons',
    romanticHighlight: 'Stand together at 3,200 meters above sea level overlooking the sprawling city of Addis Ababa through the scent of towering blue eucalyptus trees.',
    signatureOrder: 'Mountain Ridge Sunset Walk & Steaming Thermos of Spiced Tea',
    openingHours: '6:00 AM – 7:00 PM (Daily)',
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Crisp mountain air, towering century-old eucalyptus forest, natural wooden observation decks, breathtaking 360-degree vista of the Addis Ababa skyline below.',
    menuHighlights: [
      { name: 'Mountain Thermos Spiced Tea with Mint', category: 'Coffee', priceETB: 120, description: 'Steaming hot spiced mountain tea to keep hands warm as sunset approaches', isPopular: true },
      { name: 'Warm Fresh Baked Sweet Bread (Defo Dabo)', category: 'Food', priceETB: 100, description: 'Traditional spiced bread baked in false banana (enset) leaves', isPopular: true },
      { name: 'Hot Roasted Corn on the Cob', category: 'Food', priceETB: 80, description: 'Fresh corn roasted over hot mountain charcoal embers with salt and chili' }
    ],
    tags: ['scenic', 'scenic spot', 'nature', 'entoto', 'entoto hills', 'viewpoint', 'mountain', 'sunset'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Entoto+Viewpoint+Addis+Ababa'
  }
];

// Helper to update initial-spots.ts and db.json
function main() {
  const dbPath = path.join(__dirname, '..', 'data', 'db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  let addedCount = 0;
  NEW_SPOTS.forEach(spot => {
    const existingIdx = db.spots.findIndex(s => s.id === spot.id);
    if (existingIdx === -1) {
      db.spots.push(spot);
      addedCount++;
    } else {
      db.spots[existingIdx] = { ...db.spots[existingIdx], ...spot };
    }
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Successfully updated data/db.json. Total spots now:', db.spots.length, 'Added:', addedCount);

  // Group by category to print verification
  const cats = {};
  db.spots.forEach(s => cats[s.knownCategory] = (cats[s.knownCategory] || 0) + 1);
  console.log('Spots by category in db.json:', cats);

  const hoods = {};
  db.spots.forEach(s => hoods[s.neighborhood] = (hoods[s.neighborhood] || 0) + 1);
  console.log('Spots by neighborhood:', hoods);
}

main();
