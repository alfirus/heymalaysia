const MALAYSIA_POI_GROUPS = {
	religious: {
		types: ['mosque', 'place_of_worship', 'church', 'hindu_temple', 'buddhist_temple', 'cemetery'],
		keywords: ['masjid', 'surau', 'balai ibadat', 'kuil', 'tokong'],
	},

	food: {
		types: ['restaurant', 'cafe', 'food', 'bakery', 'meal_takeaway', 'meal_delivery', 'bar', 'night_club'],
		keywords: ['mamak', 'kopitiam', 'warung', 'gerai', 'nasi lemak', 'halal', 'tomyam'],
	},

	tourism: {
		types: ['tourist_attraction', 'point_of_interest', 'museum', 'art_gallery', 'zoo', 'amusement_park', 'aquarium', 'stadium'],
		keywords: ['heritage', 'historical', 'muzium', 'galeri', 'monumen'],
	},

	/** ---------------------------
	 * NATURE, HIKING & OUTDOOR
	 * (Malaysia-Optimized)
	 * --------------------------- */
	nature_outdoor: {
		types: ['park', 'natural_feature', 'campground', 'rv_park', 'tourist_attraction'],
		keywords: {
			hiking: ['hiking', 'trail', 'trek', 'trekking', 'bukit', 'gunung', 'hill', 'mount', 'peak', 'denai'],
			waterfall: ['waterfall', 'air terjun', 'falls'],
			beach: ['beach', 'pantai', 'teluk'],
			island: ['island', 'pulau'],
			river: ['river', 'sungai'],
			lake: ['lake', 'tasik'],
			forest: ['forest', 'hutan', 'rainforest', 'jungle', 'hutan simpan', 'taman negara'],
		},
	},

	shopping: {
		types: ['shopping_mall', 'supermarket', 'convenience_store', 'department_store', 'clothing_store', 'electronics_store', 'hardware_store', 'home_goods_store', 'furniture_store', 'jewelry_store', 'shoe_store', 'book_store', 'pet_store', 'store'],
		keywords: ['pasar', 'pasar malam', 'kedai', 'mall'],
	},

	transport: {
		types: ['airport', 'bus_station', 'transit_station', 'train_station', 'subway_station', 'taxi_stand', 'parking', 'car_rental', 'gas_station'],
		keywords: ['stesen', 'terminal', 'lapangan terbang', 'parkir'],
	},

	healthcare: {
		types: ['hospital', 'clinic', 'doctor', 'dentist', 'pharmacy', 'veterinary_care', 'physiotherapist', 'spa', 'gym'],
		keywords: ['klinik', 'hospital kerajaan', 'farmasi'],
	},

	education_government: {
		types: ['school', 'primary_school', 'secondary_school', 'university', 'library', 'local_government_office', 'city_hall', 'courthouse', 'police', 'fire_station', 'post_office'],
		keywords: ['balai polis', 'ipd', 'pdrm', 'sekolah', 'universiti', 'perpustakaan'],
	},

	accommodation: {
		types: ['lodging', 'hotel', 'hostel', 'guest_house', 'resort', 'motel'],
		keywords: ['inap', 'penginapan', 'resort', 'homestay'],
	},

	services: {
		types: ['bank', 'atm', 'insurance_agency', 'real_estate_agency', 'travel_agency', 'laundry', 'hair_care', 'beauty_salon', 'car_repair', 'car_wash', 'locksmith'],
		keywords: ['dobi', 'salon', 'bengkel', 'agensi'],
	},
};
