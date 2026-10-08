const fs = require('fs');
const path = require('path');

const PLACES = [
  // ================= BOLE: EDNA =================
  {
    id: 'spot-edna-cinema-vip',
    name: 'Edna Cinema VIP Date Lounge & Cafe',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Cozy Couple Velvet Love-Seats, Warm Buttered Caramel Popcorn & Frappes',
    neighborhood: 'Bole (Edna Mall)',
    address: 'Inside Edna Mall Complex 3rd Floor, Bole, Addis Ababa',
    lat: 8.9982,
    lng: 38.7872,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 900,
    vibe: 'Intimate Movie Date Sanctuary, Plush Recliners & Sweet Cinema Scents',
    romanticHighlight: 'Sinking into private double velvet recliners before or after watching a movie, sharing giant warm caramel popcorn and iced espresso frappes.',
    signatureOrder: 'Warm Buttered Caramel Popcorn for Two & Double Chocolate Frappe',
    openingHours: '10:00 AM – 11:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Dim cinematic ambient lighting, plush velvet couple recliners, neon cinema signs, warm buttery popcorn scent, and secluded corner high-tops.',
    menuHighlights: [
      { name: 'Warm Buttered Caramel Popcorn Tub (For Two)', category: 'Dessert', priceETB: 240, description: 'Freshly popped giant kernels glazed with rich golden caramel and sea salt', isPopular: true },
      { name: 'Double Chocolate Espresso Frappe', category: 'Coffee', priceETB: 220, description: 'Blended espresso, Belgian chocolate sauce, milk, crowned with whipped cream', isPopular: true },
      { name: 'Movie Couple Loaded Nachos', category: 'Food', priceETB: 380, description: 'Crisp tortilla chips baked with cheddar cheese sauce, jalapeños, and salsa' },
      { name: 'Iced Spanish Caramel Latte', category: 'Coffee', priceETB: 180, description: 'Espresso poured over chilled condensed milk and whole milk' }
    ],
    tags: ['bole', 'edna', 'edna mall', 'cinema', 'movie date', 'popcorn', 'dessert'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Edna+Mall+Bole+Addis+Ababa'
  },
  {
    id: 'spot-bora-amusement-park',
    name: 'Bora Amusement & Couple Fun Park',
    category: 'scenic',
    subCategory: 'Scenic',
    knownCategory: 'scenic',
    bestKnownFor: 'Ferris Wheel Sunset Panorama, Bumper Cars & Fresh Sugar Churros',
    neighborhood: 'Bole (Edna Mall)',
    address: 'Behind Edna Mall, Bole, Addis Ababa',
    lat: 8.9970,
    lng: 38.7880,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 700,
    vibe: 'Playful Nostalgic Romance, Whimsical Carnival Lights & Laughter',
    romanticHighlight: 'Holding hands at the top of the Ferris wheel as sunset turns into evening lights across Bole, sharing sweet fried carnival churros.',
    signatureOrder: 'Ferris Wheel Couple Ride, Bumper Cars & Fresh Cinnamon Churros',
    openingHours: '1:00 PM – 10:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Illuminated carnival arches, cheerful fairground music, glowing Ferris wheel pods against the night sky, cotton candy carts, and couple photo spots.',
    menuHighlights: [
      { name: 'Fresh Fried Cinnamon Churros (6 pcs)', category: 'Dessert', priceETB: 240, description: 'Crispy fried dough coated in cinnamon sugar with warm chocolate dip', isPopular: true },
      { name: 'Pastel Pink Cotton Candy Cloud', category: 'Dessert', priceETB: 120, description: 'Whimsical sweet cloud on a stick for date selfies' },
      { name: 'Double Scoop Ice Cream Waffle Cone', category: 'Dessert', priceETB: 180, description: 'Strawberry and chocolate ice cream in a freshly baked cone' },
      { name: 'Chilled Citrus Lemonade Cooler', category: 'Cocktail', priceETB: 140, description: 'Freshly squeezed lemon juice over crushed ice and mint' }
    ],
    tags: ['bole', 'edna', 'edna mall', 'bora', 'amusement park', 'ferris wheel', 'playful date', 'scenic'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bora+Amusement+Park+Bole+Addis+Ababa'
  },

  // ================= BOLE: BRASS =================
  {
    id: 'spot-brass-garden-bistro',
    name: 'Brass Garden Terrace & Bistro',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Secluded Bamboo Patio Dining, Charred Pepper Ribeye & Passionfruit Mojitos',
    neighborhood: 'Bole (Brass)',
    address: 'Adjacent to Brass Clinic, Bole Brass, Addis Ababa',
    lat: 8.9918,
    lng: 38.7795,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2600,
    vibe: 'Verdant Bamboo Haven, Soft Hanging Lanterns & Intimate Dining Alcoves',
    romanticHighlight: 'A private candlelit table secluded behind tall green bamboo shoots in Bole Brass, enjoying sizzling pepper ribeye and chilled passionfruit mojitos.',
    signatureOrder: 'Charred Pepper Ribeye Steak, Truffle Mash & Passionfruit Mojito',
    openingHours: '11:30 AM – 11:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 350,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Private bamboo groves, hanging amber glass lamps, rustic timber dining tables, soft bossa nova music, secluded romantic atmosphere.',
    menuHighlights: [
      { name: 'Charred Pepper Ribeye Steak (350g)', category: 'Food', priceETB: 920, description: 'Grilled prime beef cut in crushed Madagascar black peppercorn cream with truffle mash', isPopular: true },
      { name: 'Pan-Seared Herb Chicken Breast', category: 'Food', priceETB: 680, description: 'Juicy chicken breast with rosemary garlic butter and roasted baby carrots' },
      { name: 'Fresh Passionfruit Mojito', category: 'Cocktail', priceETB: 380, description: 'White rum, fresh passionfruit pulp, lime juice, mint leaves, sparkling soda', isPopular: true },
      { name: 'Warm Chocolate Lava Cake', category: 'Dessert', priceETB: 350, description: 'Gooey chocolate center with vanilla bean ice cream' }
    ],
    tags: ['bole', 'brass', 'bole brass', 'dinner', 'garden', 'steak', 'romantic dinner'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Brass+Garden+Bistro+Bole+Addis+Ababa'
  },

  // ================= BOLE: ALEM =================
  {
    id: 'spot-alem-cinema-lounge',
    name: 'Alem Cinema Couples Lounge & Cafe',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Classic Vintage Cinema Date, Rich Mocha Lattes & Warm Cinnamon Rolls',
    neighborhood: 'Bole (Alem Cinema)',
    address: 'Alem Cinema Building 2nd Floor, Bole, Addis Ababa',
    lat: 8.9950,
    lng: 38.7830,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 750,
    vibe: 'Nostalgic Film Lore, Velvet Loveseats & Steaming Espresso Aromas',
    romanticHighlight: 'Before watching an evening screening at historic Alem Cinema, share a warm cinnamon roll and velvet macchiatos in the quiet upper cinema lounge.',
    signatureOrder: 'Double Macchiato, Warm Cinnamon Roll & Loaded Cheddar Nachos',
    openingHours: '9:00 AM – 11:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 330,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Vintage cinema posters from classic Ethiopian and world cinema, cozy velvet loveseats, aroma of roasted coffee and cinnamon, warm golden lighting.',
    menuHighlights: [
      { name: 'Alem Double Macchiato', category: 'Coffee', priceETB: 110, description: 'Rich Ethiopian espresso layered with dense micro-foamed milk', isPopular: true },
      { name: 'Warm Glazed Cinnamon Roll', category: 'Dessert', priceETB: 190, description: 'Soft swirled pastry with cinnamon spice and melted sugar glaze', isPopular: true },
      { name: 'Cinema Loaded Nacho Platter', category: 'Food', priceETB: 340, description: 'Crunchy tortilla chips with melted cheddar cheese and fresh jalapeños' },
      { name: 'Iced Hazelnut Mocha', category: 'Coffee', priceETB: 180, description: 'Chilled espresso, chocolate milk, toasted hazelnut syrup, ice' }
    ],
    tags: ['bole', 'alem', 'alem cinema', 'coffee', 'cinema date', 'movie', 'macchiato'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Alem+Cinema+Bole+Addis+Ababa'
  },
  {
    id: 'spot-alem-cityview-terrace',
    name: 'Alem City View Cafe & Terrace',
    category: 'breakfast',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Bole Road Sunset Panorama, Fluffy Belgian Waffles & Iced Vanilla Lattes',
    neighborhood: 'Bole (Alem Cinema)',
    address: 'Alem Building 4th Floor Terrace, Bole, Addis Ababa',
    lat: 8.9955,
    lng: 38.7835,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 950,
    vibe: 'Breezy Elevated Terrace, Golden Hour Sun & Panoramic Bole Road Views',
    romanticHighlight: 'Sitting high above Bole Road at golden hour, watching the evening city rush below while enjoying warm Belgian waffles and iced lattes.',
    signatureOrder: 'Belgian Waffle with Berries, Enkulal Tibs & Iced Vanilla Latte',
    openingHours: '8:00 AM – 10:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Open-air wooden terrace with glass wind partitions overlooking Bole Avenue, cozy two-seater high-tops, soft acoustic music, warm sunset breezes.',
    menuHighlights: [
      { name: 'Golden Belgian Waffle with Berries', category: 'Food', priceETB: 380, description: 'Crispy waffle with fresh strawberries, powdered sugar, and maple syrup', isPopular: true },
      { name: 'Spiced Enkulal Tibs with Toast', category: 'Food', priceETB: 320, description: 'Scrambled eggs with onions, jalapeños, tomatoes, and warm toast' },
      { name: 'Iced Vanilla Bean Latte', category: 'Coffee', priceETB: 180, description: 'Chilled espresso, whole milk, and real vanilla bean syrup over ice', isPopular: true },
      { name: 'Fresh Tropical Fruit Smoothie', category: 'Cocktail', priceETB: 160, description: 'Blended mango, avocado, and papaya layers' }
    ],
    tags: ['bole', 'alem', 'terrace', 'view', 'breakfast', 'brunch', 'waffle'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Alem+Building+Bole+Addis+Ababa'
  },

  // ================= BOLE: MILLENNIUM (MILINEUM) =================
  {
    id: 'spot-skylight-taverna-millennium',
    name: 'Skyline Taverna & Grill at Skylight Hotel',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: '5-Star Luxury Poolside Cabanas, Mediterranean Seafood Skewers & Live Violin',
    neighborhood: 'Bole (Millennium)',
    address: 'Ethiopian Skylight Hotel, Millennium Hall Area, Bole, Addis Ababa',
    lat: 8.9870,
    lng: 38.7895,
    priceLevel: 'ETB $$$$',
    avgCostForTwoETB: 4500,
    vibe: 'World-Class Luxury Resort, Floating Cabana Lights & Gentle Pool Reflections',
    romanticHighlight: 'Dining in a private curtained poolside cabana at Skylight Hotel with gentle acoustic violin playing under palm trees.',
    signatureOrder: 'Grilled Jumbo Prawn Skewers, Sizzling Ribeye & Skylight Signature Cocktails',
    openingHours: '12:00 PM – 11:30 PM (Daily)',
    rating: 4.9,
    reviewCount: 540,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Illuminated turquoise resort swimming pool, private white fabric cabanas, candlelit marble tables, live violin acoustic sets, ultra-luxurious.',
    menuHighlights: [
      { name: 'Grilled Mediterranean Jumbo Prawns', category: 'Food', priceETB: 1450, description: 'Charred king prawns with garlic herb butter, saffron rice, and grilled asparagus', isPopular: true },
      { name: 'Prime Black Angus Ribeye (400g)', category: 'Food', priceETB: 1550, description: 'Charbroiled over volcanic stone with truffle herb glaze and crispy potatoes', isPopular: true },
      { name: 'Skylight Royal Champagne Cocktail', category: 'Cocktail', priceETB: 750, description: 'French champagne, Grand Marnier, angostura bitters, sugar cube' },
      { name: 'Molten Chocolate Soufflé with Gold Dust', category: 'Dessert', priceETB: 480, description: 'Warm Valrhona chocolate soufflé with vanilla crème anglaise' }
    ],
    tags: ['bole', 'millennium', 'milineum', 'skylight', 'dinner', 'fine dining', 'luxury date', 'poolside'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ethiopian+Skylight+Hotel+Addis+Ababa'
  },
  {
    id: 'spot-millennium-garden-cafe',
    name: 'Millennium Secret Garden Cafe & Lounge',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Expansive Manicured Lawns, Private Couple Gazebos & Sunset Aperol Spritz',
    neighborhood: 'Bole (Millennium)',
    address: 'Adjacent to Millennium Hall, Bole, Addis Ababa',
    lat: 8.9900,
    lng: 38.7885,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2100,
    vibe: 'Tranquil Grassy Oasis, Twilight Lanterns & Breezy Open Air',
    romanticHighlight: 'Sprawling green lawns in the heart of Bole where couples lounge in private wooden gazebos surrounded by flowering hedges.',
    signatureOrder: 'Wood-Fired Margherita Pizza, Aperol Spritz & Tiramisu Cup',
    openingHours: '11:00 AM – 11:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 370,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Manicured green lawn with private wooden gazebos, twinkling string lights, outdoor gas heaters, ambient chillout lounge music.',
    menuHighlights: [
      { name: 'Wood-Fired Pizza Margherita Speciale', category: 'Food', priceETB: 560, description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil', isPopular: true },
      { name: 'Classic Aperol Spritz', category: 'Cocktail', priceETB: 420, description: 'Aperol, Italian prosecco, club soda, fresh orange wheel', isPopular: true },
      { name: 'Crispy Calamari Rings with Aioli', category: 'Food', priceETB: 460, description: 'Lightly battered squid rings with homemade lemon garlic dip' },
      { name: 'Venetian Tiramisu in Glass', category: 'Dessert', priceETB: 320, description: 'Espresso-soaked ladyfingers with whipped mascarpone cream and cocoa' }
    ],
    tags: ['bole', 'millennium', 'milineum', 'garden', 'cocktail', 'lounge', 'gazebo'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Millennium+Hall+Bole+Addis+Ababa'
  },
  {
    id: 'spot-harmony-terrace-wine',
    name: 'Harmony Terrace & Wine Bar',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Starlit Rooftop Deck, Swiss Cheese Fondue & Fine Chilean Reserva Wines',
    neighborhood: 'Bole (Millennium)',
    address: 'Harmony Hotel Top Terrace, Millennium Area, Bole, Addis Ababa',
    lat: 8.9935,
    lng: 38.7875,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2500,
    vibe: 'Sophisticated Rooftop Haven, Candlelit Glass Windscreens & Chill Melodies',
    romanticHighlight: 'Sharing a bubbling warm Swiss cheese fondue pot on a starlit terrace overlooking Bole with a rich bottle of Chilean Cabernet.',
    signatureOrder: 'Artisanal Cheese Fondue for Two with Baguette Bites & Chilean Cabernet',
    openingHours: '4:00 PM – 12:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 360,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Glass-walled starlit rooftop deck, gas fire pit tables, candlelit wine barrels, soft jazz acoustics, romantic couple couches.',
    menuHighlights: [
      { name: 'Warm Swiss Cheese Fondue Pot (For Two)', category: 'Food', priceETB: 850, description: 'Gruyère and Emmental cheeses melted with white wine and garlic, served with crusty sourdough bread cubes', isPopular: true },
      { name: 'Chilean Cabernet Sauvignon Reserva (Glass)', category: 'Cocktail', priceETB: 480, description: 'Full-bodied red wine with blackberry, plum, and oak nuances', isPopular: true },
      { name: 'Gourmet Tapas Sampler Platter', category: 'Food', priceETB: 620, description: 'Prosciutto-wrapped melon, stuffed olives, garlic prawns, and bruschetta' },
      { name: 'Dark Chocolate Fondant with Berries', category: 'Dessert', priceETB: 360, description: 'Warm molten chocolate cake with fresh raspberries' }
    ],
    tags: ['bole', 'millennium', 'milineum', 'harmony', 'rooftop', 'wine', 'fondue', 'cocktail'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Harmony+Hotel+Bole+Addis+Ababa'
  },

  // ================= BULBULA: 93 MAZORIA =================
  {
    id: 'spot-bulbula-93-sunset-deck',
    name: '93 Mazoria Sunset Deck & Grill',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Sizzling Special Tibs on Clay Coals, 2nd-Floor Sunset Deck & Cold Draft Beer',
    neighborhood: 'Bole Bulbula (93 Mazoria)',
    address: 'Bulbula 93 Mazoria Roundabout, Addis Ababa',
    lat: 8.9665,
    lng: 38.7775,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1600,
    vibe: 'Lively Neighborhood Balcony, Sizzling Clay Burners & Cool Evening Breeze',
    romanticHighlight: 'Breezy open balcony overlooking 93 Mazoria, sharing a clay charcoal burner of sizzling rosemary beef tibs with fresh injera.',
    signatureOrder: 'Sizzling Derek Tibs on Clay Charcoal Burner & Cold Draft Beer Pitcher',
    openingHours: '12:00 PM – 11:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Elevated wooden deck overlooking the vibrant 93 Mazoria junction, red embers glowing in clay burners, cool mountain breeze, cozy couple corner tables.',
    menuHighlights: [
      { name: 'Special Sizzling Derek Tibs on Clay Burner', category: 'Food', priceETB: 680, description: 'Tender beef cubes tossed with rosemary, garlic, and sliced green peppers served sizzling over hot charcoal embers', isPopular: true },
      { name: 'Spicy Shiro Tegabino with Kibe', category: 'Food', priceETB: 340, description: 'Bubbling clay pot of spiced chickpea stew with purified clarified butter' },
      { name: 'Cold St. George Draft Pitcher for Two', category: 'Cocktail', priceETB: 220, description: 'Fresh, crisp draft beer poured ice-cold', isPopular: true },
      { name: 'Fresh Fruit Parfait with Honey', category: 'Dessert', priceETB: 190, description: 'Diced seasonal fruits layered with sweet yogurt and highland honey' }
    ],
    tags: ['bulbula', 'bole bulbula', '93 mazoria', '93', 'mazoria', 'tibs', 'dinner', 'sunset'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bulbula+93+Mazoria+Addis+Ababa'
  },
  {
    id: 'spot-bulbula-93-gelato-crepe',
    name: '93 Mazoria Gelato & Crepe Corner',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Warm French Nutella Crepes, Churned Italian Gelato & Iced Spanish Lattes',
    neighborhood: 'Bole Bulbula (93 Mazoria)',
    address: 'Next to 93 Commercial Mall, Bole Bulbula, Addis Ababa',
    lat: 8.9662,
    lng: 38.7772,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 650,
    vibe: 'Charming Pastel Sweet Shop, Warm Crepe Griddle Aromas & Cozy Tables',
    romanticHighlight: 'Watching thin crepes swirl onto hot iron plates, filled with melted Belgian chocolate and sliced bananas for an easy romantic sweet treat.',
    signatureOrder: 'Warm Nutella Banana Crepe & Pistachio Gelato Cup',
    openingHours: '10:00 AM – 10:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Pastel mint and pink tiles, cheerful counter with glass pozzetti gelato containers, sweet crepe iron aroma, cozy two-seater bistro chairs.',
    menuHighlights: [
      { name: 'Warm Nutella & Banana French Crepe', category: 'Dessert', priceETB: 280, description: 'Folded paper-thin crepe with melted Nutella, banana slices, and toasted almonds', isPopular: true },
      { name: 'Double Scoop Pistachio & Dark Chocolate Gelato', category: 'Dessert', priceETB: 220, description: 'Artisanal churned gelato served with wafer cookie', isPopular: true },
      { name: 'Iced Spanish Condensed Milk Latte', category: 'Coffee', priceETB: 160, description: 'Double espresso poured over sweet cold milk layer and ice' },
      { name: 'Berry Lemonade Cooler', category: 'Cocktail', priceETB: 140, description: 'Fresh lemon juice, muddled blackberries, sparkling water' }
    ],
    tags: ['bulbula', 'bole bulbula', '93 mazoria', '93', 'mazoria', 'crepe', 'gelato', 'dessert'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gelato+Crepe+Bole+Bulbula+93+Addis+Ababa'
  },

  // ================= BULBULA: MARIYAM =================
  {
    id: 'spot-bulbula-mariyam-hilltop-cafe',
    name: 'Mariyam Hilltop Garden Cafe',
    category: 'breakfast',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Valley Hilltop Morning Views, Cheerful Breakfast Omelets & Fresh Passion Tea',
    neighborhood: 'Bole Bulbula (Mariyam)',
    address: 'Near Bulbula Mariyam Church, Bole Bulbula, Addis Ababa',
    lat: 8.9695,
    lng: 38.7740,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1100,
    vibe: 'Peaceful Hillside Greenery, Cool Mountain Wind & Church Chimes',
    romanticHighlight: 'A serene garden perched near Mariyam Church with morning sunshine pouring over blooming geraniums, eating herb omelets with freshly pressed juice.',
    signatureOrder: 'Garden Herb Omelet with Sourdough, Fluffy Pancakes & Fresh Passionfruit Juice',
    openingHours: '7:30 AM – 6:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Hillside terraced garden with blooming flowers, wrought-iron umbrella tables, soft chirping birds, cool mountain air, and peaceful couples seclusion.',
    menuHighlights: [
      { name: 'Mariyam Garden Herb Omelet', category: 'Food', priceETB: 360, description: 'Three eggs with garden herbs, sautéed mushrooms, feta cheese, and warm toast', isPopular: true },
      { name: 'Fluffy Buttermilk Pancakes with Honey', category: 'Food', priceETB: 340, description: 'Triple stack of pancakes with pure butter and organic highland honey', isPopular: true },
      { name: 'Fresh Pressed Passionfruit Juice', category: 'Cocktail', priceETB: 180, description: 'Sweet tart cold juice pressed from ripe yellow passionfruits' },
      { name: 'Spiced Black Tea Pot for Two', category: 'Coffee', priceETB: 140, description: 'Tea brewed with cardamom, cinnamon, and cloves in a glass teapot' }
    ],
    tags: ['bulbula', 'bole bulbula', 'mariyam', 'bulbula mariyam', 'breakfast', 'garden', 'quiet date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mariyam+Church+Bole+Bulbula+Addis+Ababa'
  },
  {
    id: 'spot-bulbula-mariyam-traditional-buna',
    name: 'Bulbula Mariyam Traditional Buna & Popcorn House',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Aromatic Clay Jebena Coffee Ceremony, Sweet Popcorn & Fresh Grass (Ketema)',
    neighborhood: 'Bole Bulbula (Mariyam)',
    address: 'Mariyam Church Lower Gate, Bole Bulbula, Addis Ababa',
    lat: 8.9690,
    lng: 38.7745,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 400,
    vibe: 'Authentic Cultural Serenity, Frankincense Smoke & Intimate Low Wooden Stools',
    romanticHighlight: 'Sitting close on traditional woven stools amidst sweet frankincense smoke, watching the clay pot boil while sharing freshly popped salted popcorn.',
    signatureOrder: '3-Round Clay Jebena Buna Ceremony with Rue & Popcorn Basket',
    openingHours: '8:00 AM – 8:30 PM (Daily)',
    rating: 4.9,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Green grass rushes carpeting the floor, clay incense burner billowing sweet frankincense, handwoven Mesob tables, peaceful traditional sanctuary.',
    menuHighlights: [
      { name: 'Traditional 3-Round Clay Jebena Buna (Abol, Tona, Baraka)', category: 'Coffee', priceETB: 160, description: 'Clay pot roasted coffee served with sprig of rue (tena\'adam) and sugar', isPopular: true },
      { name: 'Freshly Popped Salted Fendisha (Popcorn)', category: 'Food', priceETB: 80, description: 'Warm popcorn popped over hot charcoal with gentle butter glaze', isPopular: true },
      { name: 'Roasted Kolo with Spiced Peanuts', category: 'Food', priceETB: 90, description: 'Barley, chickpeas, and peanuts seasoned with sea salt' },
      { name: 'Spiced Shai with Tena\'adam', category: 'Coffee', priceETB: 70, description: 'Steaming black tea with aromatic garden rue' }
    ],
    tags: ['bulbula', 'bole bulbula', 'mariyam', 'traditional', 'coffee', 'jebena', 'cultural date'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bulbula+Mariyam+Buna+Addis+Ababa'
  },

  // ================= BULBULA: REFENTI =================
  {
    id: 'spot-bulbula-refenti-lounge',
    name: 'Refenti Garden Lounge & Cocktail Terrace',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Illuminated Wooden Deck, Craft Passionfruit Mojitos & Sizzling Chicken Wings',
    neighborhood: 'Bole Bulbula (Refenti)',
    address: 'Bulbula Refenti Main Link Road, Addis Ababa',
    lat: 8.9635,
    lng: 38.7790,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1550,
    vibe: 'Boutique Suburban Lounge, Polished Timber & Ambient Low Lighting',
    romanticHighlight: 'Tucked away in quiet Refenti with leafy privacy, sipping craft mojitos on a candlelit timber terrace under starlight.',
    signatureOrder: 'Refenti Spiced Passion Mojito & Crispy Honey Garlic Wings',
    openingHours: '4:30 PM – 1:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Warm timber slatted walls, outdoor bamboo garden screens, warm spotlight glow, cozy two-person wicker couches, chilled deep house playlist.',
    menuHighlights: [
      { name: 'Refenti Spiced Passion Mojito', category: 'Cocktail', priceETB: 370, description: 'White rum, fresh passionfruit, crushed mint, lime, ginger ale, chili sugar rim', isPopular: true },
      { name: 'Crispy Honey Garlic Chicken Wings', category: 'Food', priceETB: 390, description: 'Tender wings tossed in sticky honey garlic glaze with ranch dipping sauce', isPopular: true },
      { name: 'Beef Tenderloin Sliders (Trio)', category: 'Food', priceETB: 440, description: 'Three mini brioche burgers with cheddar cheese and caramelized onions' },
      { name: 'Smoky Whiskey Sour with Orange', category: 'Cocktail', priceETB: 390, description: 'Bourbon, lemon juice, organic honey, orange peel' }
    ],
    tags: ['bulbula', 'bole bulbula', 'refenti', 'reffenti', 'cocktail', 'lounge', 'terrace'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bulbula+Refenti+Addis+Ababa'
  },
  {
    id: 'spot-bulbula-refenti-bakery',
    name: 'Refenti Bakery & Sweet Studio',
    category: 'bakery',
    subCategory: 'Food',
    knownCategory: 'bakery',
    bestKnownFor: 'Oven-Fresh Cinnamon Rolls with Cream Cheese Glaze & Silky Macchiatos',
    neighborhood: 'Bole Bulbula (Refenti)',
    address: 'Refenti Gate 1 Shopping Row, Bole Bulbula, Addis Ababa',
    lat: 8.9630,
    lng: 38.7795,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 600,
    vibe: 'Sweet Smelling Morning Nook, Warm Pastry Cases & Sunny Window Counters',
    romanticHighlight: 'Warm, pillowy cinnamon rolls dripping in sweet cream cheese frosting, paired with strong double macchiatos for an early morning couple treat.',
    signatureOrder: 'Warm Glazed Cinnamon Roll & Layered Ethiopian Macchiato',
    openingHours: '7:00 AM – 8:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Sunlit corner bakery with white subway tiles, wooden pastry trays, aroma of baking yeast and melted brown sugar, cozy two-seater high counter.',
    menuHighlights: [
      { name: 'Warm Cream Cheese Cinnamon Roll', category: 'Food', priceETB: 210, description: 'Fluffy yeast roll swirled with Saigon cinnamon and covered in vanilla cream cheese glaze', isPopular: true },
      { name: 'Red Velvet Cupcake with Frosting', category: 'Dessert', priceETB: 180, description: 'Moist cocoa-buttermilk sponge topped with cream cheese rosette', isPopular: true },
      { name: 'Flaky Chocolate Croissant', category: 'Food', priceETB: 190, description: 'Butter laminated pastry filled with dark chocolate batons' },
      { name: 'Silky Double Macchiato', category: 'Coffee', priceETB: 95, description: 'Classic Ethiopian macchiato with velvety micro-foam' }
    ],
    tags: ['bulbula', 'bole bulbula', 'refenti', 'bakery', 'cinnamon roll', 'macchiato', 'pastry'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bakery+Refenti+Bulbula+Addis+Ababa'
  },

  // ================= GERJI: MEBRATHAIL =================
  {
    id: 'spot-gerji-mebrathail-terrace',
    name: 'Mebrathail Sunset Terrace & Lounge',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Panoramic Sunset Vistas toward Bole, Sizzling Lamb Ribs & Craft Sangria',
    neighborhood: 'Gerji (Mebrathail)',
    address: 'Mebrathail Commercial Plaza 4th Floor, Gerji, Addis Ababa',
    lat: 8.9910,
    lng: 38.8070,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1650,
    vibe: 'Rooftop Sunset Glow, Ambient Lounge Melodies & Soft Fairy String Lights',
    romanticHighlight: 'Watching the crimson sunset fade into city lights over Gerji from a top-floor terrace while sipping fruit sangria.',
    signatureOrder: 'Craft Red Sangria Pitcher & Charred Lamb Riblets with Spicy BBQ',
    openingHours: '4:00 PM – 1:30 AM (Daily)',
    rating: 4.8,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Open-air wooden rooftop deck with glass wind barriers, cozy fire pit tables, glowing string lanterns, ambient downtempo beats.',
    menuHighlights: [
      { name: 'Red Wine Fruit Sangria Pitcher (For Two)', category: 'Cocktail', priceETB: 540, description: 'Red wine steeped with sliced oranges, apples, cinnamon, and a splash of brandy', isPopular: true },
      { name: 'Charred Lamb Riblets with BBQ Glaze', category: 'Food', priceETB: 490, description: 'Crispy charcoal grilled lamb ribs tossed in sweet spicy sauce with herb fries', isPopular: true },
      { name: 'Cheesy Garlic Bread Pull-Apart', category: 'Food', priceETB: 280, description: 'Warm bread with melted mozzarella and garlic herb butter' },
      { name: 'Cosmopolitan Cocktail with Cranberry', category: 'Cocktail', priceETB: 360, description: 'Vodka, triple sec, cranberry juice, fresh lime juice' }
    ],
    tags: ['gerji', 'mebrathail', 'mebrat hail', 'rooftop', 'sunset', 'cocktail', 'lounge'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gerji+Mebrathail+Addis+Ababa'
  },
  {
    id: 'spot-gerji-mebrathail-sweet',
    name: 'Mebrathail Sweet Corner & Patisserie',
    category: 'dessert',
    subCategory: 'Dessert',
    knownCategory: 'dessert',
    bestKnownFor: 'Warm Double Chocolate Fudge Cake, Velvet Tiramisu Cups & Cappuccinos',
    neighborhood: 'Gerji (Mebrathail)',
    address: 'Near Mebrathail Condominium Gate, Gerji, Addis Ababa',
    lat: 8.9905,
    lng: 38.8075,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 700,
    vibe: 'Chic Neighborhood Patisserie, Glass Cake Towers & Comfortable Armchairs',
    romanticHighlight: 'A cozy sweet sanctuary in Mebrathail serving luscious chocolate fudge cake with molten centers and rich Italian tiramisu.',
    signatureOrder: 'Double Chocolate Fudge Cake Slice & Traditional Tiramisu Cup',
    openingHours: '8:00 AM – 9:30 PM (Daily)',
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Glass display cases filled with glistening gateaux and tartlets, comfortable blush velvet armchairs, warm coffee aromas, quiet date ambiance.',
    menuHighlights: [
      { name: 'Warm Double Chocolate Fudge Cake Slice', category: 'Dessert', priceETB: 260, description: 'Moist dark chocolate sponge layered with rich fudge ganache and cocoa dusting', isPopular: true },
      { name: 'Venetian Tiramisu Cup', category: 'Dessert', priceETB: 240, description: 'Espresso-soaked sponge with sweet mascarpone cream', isPopular: true },
      { name: 'Strawberry Glazed Fruit Tart', category: 'Dessert', priceETB: 220, description: 'Shortcrust shell filled with pastry cream and fresh strawberries' },
      { name: 'Double Foam Cappuccino with Cocoa', category: 'Coffee', priceETB: 120, description: 'Velvety espresso with dense foam dusted in cocoa' }
    ],
    tags: ['gerji', 'mebrathail', 'mebrat hail', 'dessert', 'cake', 'tiramisu', 'sweet'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sweet+Patisserie+Gerji+Mebrathail+Addis+Ababa'
  },
  {
    id: 'spot-gerji-mebrathail-buna',
    name: 'Buna Time Specialty Coffee at Mebrathail',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Single-Origin Guji Pour-Overs, Smashed Avocado Toast & Velvet Flat Whites',
    neighborhood: 'Gerji (Mebrathail)',
    address: 'Mebrathail Main Ave, Gerji, Addis Ababa',
    lat: 8.9915,
    lng: 38.8065,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 650,
    vibe: 'Modern Minimalist Coffee Bar, Warm Wood Counters & Chill Acoustic Tunes',
    romanticHighlight: 'Savoring clean, fragrant Guji pour-overs and creamy flat whites sitting side-by-side at a sunny wooden counter.',
    signatureOrder: 'Guji V60 Filter Brew & Smashed Avocado Sourdough Toast',
    openingHours: '7:30 AM – 8:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Blonde Scandinavian wood counter, Hario pour-over cones dripping hot amber coffee, green potted plants, soft indie folk music.',
    menuHighlights: [
      { name: 'Single-Origin Guji V60 Filter Brew', category: 'Coffee', priceETB: 170, description: 'Fragrant coffee with peach and floral jasmine aromatics', isPopular: true },
      { name: 'Velvet Flat White', category: 'Coffee', priceETB: 150, description: 'Double ristretto with micro-foamed whole milk and latte art', isPopular: true },
      { name: 'Smashed Avocado & Chili Flakes on Toast', category: 'Food', priceETB: 290, description: 'Crushed ripe avocado on toasted sourdough with sea salt and chili' },
      { name: 'Toasted Banana Nut Bread', category: 'Dessert', priceETB: 180, description: 'Warm slice with butter and honey drizzle' }
    ],
    tags: ['gerji', 'mebrathail', 'mebrat hail', 'coffee', 'specialty coffee', 'pourover'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Coffee+Gerji+Mebrathail+Addis+Ababa'
  },

  // ================= GERJI: UNITY =================
  {
    id: 'spot-gerji-unity-campus-crepe',
    name: 'Unity Campus Garden Cafe & Creperie',
    category: 'breakfast',
    subCategory: 'Food',
    knownCategory: 'breakfast',
    bestKnownFor: 'Sweet & Savory French Crepes, Iced Caramel Macchiatos & Shaded Garden Parasols',
    neighborhood: 'Gerji (Unity University)',
    address: 'Directly facing Unity University Gate 1, Gerji, Addis Ababa',
    lat: 8.9868,
    lng: 38.8085,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 750,
    vibe: 'Youthful Romantic Energy, Garden Umbrellas & Sweet Griddle Aromas',
    romanticHighlight: 'Sitting under striped garden umbrellas outside Unity University, sharing hot savory chicken-mushroom crepes and iced caramel macchiatos.',
    signatureOrder: 'Chicken Mushroom Bechamel Crepe & Iced Caramel Macchiato',
    openingHours: '8:00 AM – 8:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Open-air patio with colorful parasols, wooden garden benches, aromas of sizzling crepes, cheerful date conversations, sunny daytime warmth.',
    menuHighlights: [
      { name: 'Savory Chicken & Mushroom Crepe', category: 'Food', priceETB: 340, description: 'Shredded chicken breast, button mushrooms, creamy béchamel, and melted cheese', isPopular: true },
      { name: 'Sweet Nutella Strawberry Crepe', category: 'Dessert', priceETB: 280, description: 'Folded crepe with warm Nutella and fresh sliced strawberries', isPopular: true },
      { name: 'Iced Caramel Macchiato', category: 'Coffee', priceETB: 150, description: 'Espresso over cold vanilla milk with rich caramel crosshatch' },
      { name: 'Fresh Tropical Mango Juice', category: 'Cocktail', priceETB: 140, description: 'Thick, fresh-squeezed mango puree served ice-cold' }
    ],
    tags: ['gerji', 'unity', 'unity university', 'crepe', 'breakfast', 'brunch', 'garden cafe'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Unity+University+Gerji+Addis+Ababa'
  },
  {
    id: 'spot-gerji-unity-green-yard',
    name: 'The Green Yard Bistro at Unity',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Lush Backyard Picnic Tables, Gourmet Smashed Burgers & Fresh Strawberry Shakes',
    neighborhood: 'Gerji (Unity University)',
    address: 'Behind Unity Univ Commerce Campus, Gerji, Addis Ababa',
    lat: 8.9850,
    lng: 38.8095,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1200,
    vibe: 'Green Grassy Backyard, Rustic Wood Benches & Cheerful Casual Romance',
    romanticHighlight: 'Sprawling on wooden picnic benches on manicured green grass, enjoying juicy homemade burgers and thick milkshakes together.',
    signatureOrder: 'Double Cheddar Smash Burger & Real Strawberry Milkshake',
    openingHours: '11:00 AM – 9:30 PM (Daily)',
    rating: 4.7,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Enclosed green grass courtyard, rustic wooden picnic tables with cushions, string bulbs draped overhead, casual and unhurried couple atmosphere.',
    menuHighlights: [
      { name: 'Double Cheddar Smash Burger', category: 'Food', priceETB: 390, description: 'Two smashed beef patties, melted sharp cheddar, caramelized onions, house sauce on brioche bun', isPopular: true },
      { name: 'Crispy Truffle Fries with Parmesan', category: 'Food', priceETB: 240, description: 'Golden fries tossed in white truffle oil and grated cheese' },
      { name: 'Real Strawberry Thick Milkshake', category: 'Dessert', priceETB: 220, description: 'Blended whole strawberries, ice cream, whipped cream top', isPopular: true },
      { name: 'Chilled Hibiscus Limeade', category: 'Cocktail', priceETB: 140, description: 'Refreshing iced hibiscus with fresh lime juice' }
    ],
    tags: ['gerji', 'unity', 'unity university', 'burger', 'garden', 'casual date', 'dinner'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bistro+Unity+University+Gerji+Addis+Ababa'
  },

  // ================= GERJI: TOTOT =================
  {
    id: 'spot-totot-cultural-restaurant',
    name: 'Totot Traditional Cultural Restaurant & Tej House',
    category: 'restaurant',
    subCategory: 'Food',
    knownCategory: 'dinner',
    bestKnownFor: 'Legendary Gurage Kitfo Feasts, Golden Tej in Berele Flasks & Live Folk Dance',
    neighborhood: 'Gerji (Totot)',
    address: 'Totot Cultural Complex, Gerji, Addis Ababa',
    lat: 8.9890,
    lng: 38.8120,
    priceLevel: 'ETB $$$',
    avgCostForTwoETB: 2200,
    vibe: 'Rich Gurage Heritage, Thatched Straw Huts, Masenqo Melodies & Cultural Magic',
    romanticHighlight: 'Addis Ababa\'s top cultural date spot! Seated inside an intimate thatched hut, sharing warm Special Kitfo with Kocho and Ayib, drinking sweet Tej from traditional berele flasks while watching energetic folklore dances.',
    signatureOrder: 'Special Gurage Kitfo with Kocho & Ayib, Carafe of Pure Honey Tej',
    openingHours: '11:30 AM – 11:00 PM (Daily)',
    rating: 4.9,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Traditional thatched Gurage grass huts, hand-carved wooden pillars, soft glowing lanterns, live masenqo and krar musicians, warm communal cultural celebration.',
    menuHighlights: [
      { name: 'Special Gurage Kitfo with Kocho & Ayib', category: 'Food', priceETB: 780, description: 'Minced prime beef warmed with seasoned kibe (clarified butter) and mitmita, served with freshly steamed kocho and cottage cheese', isPopular: true },
      { name: 'Carafe of Pure Filtered Tej (Honey Wine)', category: 'Cocktail', priceETB: 360, description: 'Traditional berele glass flasks filled with sweet fermented highland honey wine', isPopular: true },
      { name: 'Gored Gored Tenderloin Cubes', category: 'Food', priceETB: 720, description: 'Raw tender beef cubes tossed in awaze and spiced butter' },
      { name: 'Warm Ambasha Bread with Honey Dip', category: 'Dessert', priceETB: 180, description: 'Traditional round cardamom spiced bread with wild honey' }
    ],
    tags: ['gerji', 'totot', 'kitfo', 'cultural', 'tej', 'traditional', 'dinner', 'live music'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Totot+Cultural+Restaurant+Gerji+Addis+Ababa'
  },
  {
    id: 'spot-totot-garden-buna-pavilion',
    name: 'Totot Garden & Coffee Pavilion',
    category: 'coffee',
    subCategory: 'Coffee',
    knownCategory: 'coffee',
    bestKnownFor: 'Private Grass Huts, Authentic Jebena Ceremony, Sweet Popcorn & Frankincense',
    neighborhood: 'Gerji (Totot)',
    address: 'Adjacent to Totot Cultural Village, Gerji, Addis Ababa',
    lat: 8.9885,
    lng: 38.8125,
    priceLevel: 'ETB $',
    avgCostForTwoETB: 450,
    vibe: 'Peaceful Grass Thatched Huts, Fragrant Frankincense & Whispered Romance',
    romanticHighlight: 'Complete privacy inside an authentic grass pavilion, enjoying freshly brewed clay jebena coffee and sweet fendisha popcorn with fragrant frankincense smoke.',
    signatureOrder: 'Full Clay Jebena Buna Ceremony with Popcorn & Roasted Kolo',
    openingHours: '9:00 AM – 9:00 PM (Daily)',
    rating: 4.8,
    reviewCount: 350,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Individual private grass thatched pavilions nestled in a green courtyard, clay charcoal stove smoking with frankincense, handwoven Mesob tables.',
    menuHighlights: [
      { name: 'Traditional 3-Round Clay Jebena Buna Ceremony', category: 'Coffee', priceETB: 180, description: 'Abol, Tona, Baraka served in cini cups with aromatic rue', isPopular: true },
      { name: 'Hot Buttered Fendisha Popcorn Basket', category: 'Food', priceETB: 90, description: 'Freshly popped corn tossed with spiced clarified butter', isPopular: true },
      { name: 'Traditional Kolo & Roasted Beans', category: 'Food', priceETB: 80, description: 'Barley, chickpeas, and peanuts roasted over charcoal' },
      { name: 'Spiced Black Tea with Cinnamon', category: 'Coffee', priceETB: 80, description: 'Black tea brewed with cinnamon, cloves, and ginger' }
    ],
    tags: ['gerji', 'totot', 'coffee', 'jebena', 'garden', 'traditional', 'grass hut'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Totot+Gerji+Addis+Ababa'
  },
  {
    id: 'spot-totot-sunset-gazebo-grill',
    name: 'Totot Grill & Sunset Gazebo',
    category: 'cocktail',
    subCategory: 'Cocktails',
    knownCategory: 'cocktail',
    bestKnownFor: 'Charcoal-Grilled Sizzling Tibs, Draft St. George Pitchers & Private Couple Gazebos',
    neighborhood: 'Gerji (Totot)',
    address: 'Totot Bypass Road, Gerji, Addis Ababa',
    lat: 8.9880,
    lng: 38.8130,
    priceLevel: 'ETB $$',
    avgCostForTwoETB: 1500,
    vibe: 'Rustic Wooden Gazebos, Sizzling Charcoal Aroma & Cool Night Air',
    romanticHighlight: 'Private outdoor wooden gazebo with soft amber lights, enjoying sizzling charcoal tibs and cold drinks in secluded romantic comfort.',
    signatureOrder: 'Charcoal Derek Tibs with Green Chilies & Draft Beer Pitcher',
    openingHours: '12:00 PM – 11:30 PM (Daily)',
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    interiorPhotos: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80'
    ],
    interiorVibe: 'Private secluded wooden gazebos enveloped in green creeping ivy, warm amber Edison bulbs, aroma of sizzling beef over wood charcoal.',
    menuHighlights: [
      { name: 'Charcoal-Grilled Derek Tibs', category: 'Food', priceETB: 640, description: 'Charred crispy beef cubes served on sizzling clay burner with awaze and mitmita', isPopular: true },
      { name: 'Cold St. George Draft Pitcher for Two', category: 'Cocktail', priceETB: 220, description: 'Fresh crisp draft beer on tap', isPopular: true },
      { name: 'Roasted Garlic Butter Flatbread', category: 'Food', priceETB: 220, description: 'Warm bread with melted garlic butter' },
      { name: 'Fresh Passionfruit Spritz', category: 'Cocktail', priceETB: 240, description: 'Tart passionfruit pulp with sparkling soda and lime' }
    ],
    tags: ['gerji', 'totot', 'tibs', 'gazebo', 'cocktail', 'draft beer', 'grill'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Totot+Grill+Gerji+Addis+Ababa'
  }
];

function main() {
  const dbPath = path.join(__dirname, '..', 'data', 'db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // Ensure all existing spots have rich tags for their sub-areas:
  db.spots.forEach(s => {
    const name = s.name.toLowerCase();
    const addr = s.address.toLowerCase();
    const hood = s.neighborhood.toLowerCase();
    
    // Tag bole sub-areas
    if (name.includes('atlas') || addr.includes('atlas') || hood.includes('atlas')) {
      if (!s.tags.includes('atlas')) s.tags.push('atlas');
    }
    if (name.includes('edna') || addr.includes('edna') || hood.includes('edna')) {
      if (!s.tags.includes('edna')) s.tags.push('edna');
    }
    if (name.includes('brass') || addr.includes('brass') || hood.includes('brass')) {
      if (!s.tags.includes('brass')) s.tags.push('brass');
    }
    if (name.includes('alem') || addr.includes('alem') || hood.includes('alem')) {
      if (!s.tags.includes('alem')) s.tags.push('alem');
    }
    if (name.includes('millennium') || name.includes('milineum') || addr.includes('millennium') || name.includes('skylight') || name.includes('harmony')) {
      if (!s.tags.includes('millennium')) s.tags.push('millennium');
      if (!s.tags.includes('milineum')) s.tags.push('milineum');
    }
    if (name.includes('medhanealem') || name.includes('medhanialem') || addr.includes('medhanealem') || hood.includes('medhanealem')) {
      if (!s.tags.includes('medhanealem')) s.tags.push('medhanealem');
      if (!s.tags.includes('medhanialem')) s.tags.push('medhanialem');
    }

    // Tag bulbula sub-areas
    if (name.includes('93') || addr.includes('93') || s.bestKnownFor?.includes('93')) {
      if (!s.tags.includes('93 mazoria')) s.tags.push('93 mazoria');
      if (!s.tags.includes('93')) s.tags.push('93');
    }
    if (name.includes('mariyam') || addr.includes('mariyam')) {
      if (!s.tags.includes('mariyam')) s.tags.push('mariyam');
    }
    if (name.includes('refenti') || addr.includes('refenti') || addr.includes('reffenti')) {
      if (!s.tags.includes('refenti')) s.tags.push('refenti');
    }

    // Tag gerji sub-areas
    if (name.includes('mebrathail') || addr.includes('mebrathail') || name.includes('mebrat')) {
      if (!s.tags.includes('mebrathail')) s.tags.push('mebrathail');
    }
    if (name.includes('unity') || addr.includes('unity')) {
      if (!s.tags.includes('unity')) s.tags.push('unity');
    }
    if (name.includes('totot') || addr.includes('totot')) {
      if (!s.tags.includes('totot')) s.tags.push('totot');
    }
  });

  // Add the 22 new spots
  let added = 0;
  PLACES.forEach(place => {
    const idx = db.spots.findIndex(s => s.id === place.id);
    if (idx === -1) {
      db.spots.push(place);
      added++;
    } else {
      db.spots[idx] = { ...db.spots[idx], ...place };
    }
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated db.json. Total spots now:', db.spots.length, 'Added:', added);

  // Sync to initial-spots.ts
  const initialSpotsPath = path.join(__dirname, '..', 'lib', 'data', 'initial-spots.ts');
  const tsContent = `import { DateSpot } from '../types';

export const INITIAL_SPOTS: DateSpot[] = ${JSON.stringify(db.spots, null, 2)};
`;
  fs.writeFileSync(initialSpotsPath, tsContent, 'utf8');
  console.log('Synced to lib/data/initial-spots.ts');
}

main();
