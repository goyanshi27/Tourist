/* ============================================================
   INDIA IN MOTION — Data Loader
   All data inlined — works on file:// without any server
   ============================================================ */

const TOURISM_DATA = {

  /* ── national-tourism.json ──────────────────────────── */
  "national-tourism": {
    "_meta": { "source": "Ministry of Tourism, Government of India" },
    "yearly": [
      { "year": 2013, "fta": 6.97,  "fte": 5.24, "dtv": 1145.27, "forex_usd": 18.4, "forex_inr": 1088, "tourism_gdp_pct": 6.8, "employment_million": 37.4 },
      { "year": 2014, "fta": 7.68,  "fte": 5.79, "dtv": 1282.80, "forex_usd": 20.2, "forex_inr": 1236, "tourism_gdp_pct": 7.0, "employment_million": 38.4 },
      { "year": 2015, "fta": 8.03,  "fte": 5.97, "dtv": 1431.97, "forex_usd": 21.1, "forex_inr": 1351, "tourism_gdp_pct": 7.1, "employment_million": 39.3 },
      { "year": 2016, "fta": 8.80,  "fte": 6.48, "dtv": 1615.39, "forex_usd": 22.9, "forex_inr": 1543, "tourism_gdp_pct": 7.3, "employment_million": 40.3 },
      { "year": 2017, "fta": 10.18, "fte": 7.32, "dtv": 1657.55, "forex_usd": 27.3, "forex_inr": 1769, "tourism_gdp_pct": 7.7, "employment_million": 41.6 },
      { "year": 2018, "fta": 10.56, "fte": 7.72, "dtv": 1854.93, "forex_usd": 28.7, "forex_inr": 1941, "tourism_gdp_pct": 8.0, "employment_million": 42.7 },
      { "year": 2019, "fta": 10.93, "fte": 8.11, "dtv": 2321.98, "forex_usd": 30.1, "forex_inr": 2109, "tourism_gdp_pct": 6.8, "employment_million": 75.0 },
      { "year": 2020, "fta": 2.74,  "fte": 1.77, "dtv": 610.22,  "forex_usd": 6.9,  "forex_inr": 507,  "tourism_gdp_pct": 4.7, "employment_million": 62.6 },
      { "year": 2021, "fta": 1.52,  "fte": 0.68, "dtv": 677.63,  "forex_usd": 8.8,  "forex_inr": 655,  "tourism_gdp_pct": 5.8, "employment_million": 68.9 },
      { "year": 2022, "fta": 6.19,  "fte": 4.75, "dtv": 1447.11, "forex_usd": 14.0, "forex_inr": 1120.7,"tourism_gdp_pct": 7.1, "employment_million": 77.2 },
      { "year": 2023, "fta": 9.24,  "fte": 7.08, "dtv": 2005.31, "forex_usd": 22.9, "forex_inr": 1899.9,"tourism_gdp_pct": 7.6, "employment_million": 80.0 }
    ],
    "kpi_2023": {
      "fta":                { "value": 9.24,    "unit": "Million",    "prev_year": 6.19,   "source": "Ministry of Tourism / Bureau of Immigration" },
      "fte":                { "value": 7.08,    "unit": "Million",    "prev_year": 4.75,   "source": "Ministry of Tourism" },
      "dtv":                { "value": 2005.31, "unit": "Million",    "prev_year": 1447.11,"source": "State Tourism Departments" },
      "forex_usd":          { "value": 22.9,    "unit": "Billion USD","prev_year": 14.0,   "source": "Reserve Bank of India" },
      "forex_inr":          { "value": 1899.9,  "unit": "Billion INR","prev_year": 1120.7, "source": "Reserve Bank of India" },
      "tourism_gdp_pct":    { "value": 7.6,     "unit": "% of GDP",  "prev_year": 7.1,    "source": "WTTC / Ministry of Tourism" },
      "employment_million": { "value": 80.0,    "unit": "Million",    "prev_year": 77.2,   "source": "WTTC / Ministry of Tourism" },
      "avg_stay_days":      { "value": 21.6,    "unit": "Days",       "prev_year": 20.8,   "source": "Ministry of Tourism" },
      "avg_spend_usd":      { "value": 1392,    "unit": "USD",        "prev_year": 1210,   "source": "Ministry of Tourism" }
    }
  },

  /* ── states.json ────────────────────────────────────── */
  "states": {
    "states": [
      { "name":"Uttar Pradesh",   "code":"UP", "dtv_2022":321.6, "dtv_2019":540.1, "fta_2022":2.3,  "fta_2019":4.5,  "growth_dtv_pct":121.9, "top_destinations":["Agra","Varanasi","Mathura","Vrindavan","Allahabad"], "categories":["Heritage","Spiritual","Cultural"], "lat":27.13, "lng":80.86, "capital":"Lucknow",          "tourism_tagline":"The Land of Heritage" },
      { "name":"Tamil Nadu",      "code":"TN", "dtv_2022":225.3, "dtv_2019":348.6, "fta_2022":0.66, "fta_2019":0.91, "growth_dtv_pct":155.8, "top_destinations":["Chennai","Madurai","Ooty","Kanyakumari","Rameswaram"], "categories":["Heritage","Spiritual","Beach"], "lat":11.13, "lng":78.66, "capital":"Chennai",          "tourism_tagline":"The Land of Temples" },
      { "name":"Andhra Pradesh",  "code":"AP", "dtv_2022":166.7, "dtv_2019":265.4, "fta_2022":0.35, "fta_2019":0.52, "growth_dtv_pct":130.2, "top_destinations":["Tirupati","Vijayawada","Visakhapatnam","Araku Valley"], "categories":["Spiritual","Heritage","Nature"], "lat":15.91, "lng":79.74, "capital":"Amaravati",        "tourism_tagline":"The Sunrise State" },
      { "name":"Karnataka",       "code":"KA", "dtv_2022":155.6, "dtv_2019":175.1, "fta_2022":1.22, "fta_2019":1.48, "growth_dtv_pct":118.4, "top_destinations":["Mysore","Hampi","Coorg","Bangalore","Badami"], "categories":["Heritage","Nature","Wildlife"], "lat":15.32, "lng":75.71, "capital":"Bengaluru",        "tourism_tagline":"One State, Many Worlds" },
      { "name":"Maharashtra",     "code":"MH", "dtv_2022":121.0, "dtv_2019":155.6, "fta_2022":1.89, "fta_2019":2.36, "growth_dtv_pct":109.3, "top_destinations":["Mumbai","Pune","Aurangabad","Nashik","Lonavala"], "categories":["Cultural","Heritage","Beach"], "lat":19.75, "lng":75.71, "capital":"Mumbai",           "tourism_tagline":"Unlimited" },
      { "name":"Madhya Pradesh",  "code":"MP", "dtv_2022":97.4,  "dtv_2019":116.5, "fta_2022":0.58, "fta_2019":0.85, "growth_dtv_pct":141.9, "top_destinations":["Khajuraho","Bhopal","Ujjain","Gwalior","Orchha"], "categories":["Heritage","Wildlife","Spiritual"], "lat":22.97, "lng":78.66, "capital":"Bhopal",           "tourism_tagline":"Heart of Incredible India" },
      { "name":"Rajasthan",       "code":"RJ", "dtv_2022":76.6,  "dtv_2019":118.0, "fta_2022":1.26, "fta_2019":1.61, "growth_dtv_pct":101.4, "top_destinations":["Jaipur","Udaipur","Jodhpur","Jaisalmer","Pushkar"], "categories":["Heritage","Cultural","Desert"], "lat":27.02, "lng":74.22, "capital":"Jaipur",           "tourism_tagline":"Padharo Mhare Desh" },
      { "name":"West Bengal",     "code":"WB", "dtv_2022":72.2,  "dtv_2019":91.4,  "fta_2022":1.28, "fta_2019":1.58, "growth_dtv_pct":122.7, "top_destinations":["Kolkata","Darjeeling","Sundarbans","Digha","Murshidabad"], "categories":["Cultural","Nature","Heritage"], "lat":22.99, "lng":87.85, "capital":"Kolkata",          "tourism_tagline":"Biswa Bangla" },
      { "name":"Kerala",          "code":"KL", "dtv_2022":63.0,  "dtv_2019":173.6, "fta_2022":0.47, "fta_2019":1.22, "growth_dtv_pct":167.2, "top_destinations":["Kochi","Munnar","Alleppey","Thekkady","Kovalam"], "categories":["Nature","Wellness","Beach"], "lat":10.85, "lng":76.27, "capital":"Thiruvananthapuram","tourism_tagline":"God's Own Country" },
      { "name":"Gujarat",         "code":"GJ", "dtv_2022":55.6,  "dtv_2019":65.6,  "fta_2022":0.54, "fta_2019":0.72, "growth_dtv_pct":96.0,  "top_destinations":["Ahmedabad","Rann of Kutch","Gir","Somnath","Dwarka"], "categories":["Heritage","Wildlife","Spiritual"], "lat":22.26, "lng":71.19, "capital":"Gandhinagar",      "tourism_tagline":"Vibrant Gujarat" },
      { "name":"Odisha",          "code":"OD", "dtv_2022":50.7,  "dtv_2019":63.1,  "fta_2022":0.14, "fta_2019":0.17, "growth_dtv_pct":113.0, "top_destinations":["Puri","Bhubaneswar","Konark","Cuttack","Chilika Lake"], "categories":["Spiritual","Heritage","Beach"], "lat":20.95, "lng":85.10, "capital":"Bhubaneswar",      "tourism_tagline":"Incredible Odisha" },
      { "name":"Uttarakhand",     "code":"UK", "dtv_2022":38.4,  "dtv_2019":43.7,  "fta_2022":0.16, "fta_2019":0.24, "growth_dtv_pct":92.5,  "top_destinations":["Haridwar","Rishikesh","Mussoorie","Nainital","Jim Corbett"], "categories":["Spiritual","Nature","Adventure"], "lat":30.07, "lng":79.02, "capital":"Dehradun",         "tourism_tagline":"Simply Heaven" },
      { "name":"Bihar",           "code":"BR", "dtv_2022":40.4,  "dtv_2019":49.3,  "fta_2022":0.64, "fta_2019":0.76, "growth_dtv_pct":130.0, "top_destinations":["Patna","Bodh Gaya","Nalanda","Rajgir","Vaishali"], "categories":["Spiritual","Heritage","Cultural"], "lat":25.10, "lng":85.31, "capital":"Patna",            "tourism_tagline":"Blissful Bihar" },
      { "name":"Delhi",           "code":"DL", "dtv_2022":18.2,  "dtv_2019":19.8,  "fta_2022":2.94, "fta_2019":3.43, "growth_dtv_pct":97.8,  "top_destinations":["Red Fort","Qutub Minar","Humayun's Tomb","India Gate","Lotus Temple"], "categories":["Heritage","Cultural","Shopping"], "lat":28.70, "lng":77.10, "capital":"New Delhi",        "tourism_tagline":"Dil Walon Ki Delhi" },
      { "name":"Himachal Pradesh","code":"HP", "dtv_2022":19.1,  "dtv_2019":17.0,  "fta_2022":0.13, "fta_2019":0.21, "growth_dtv_pct":71.0,  "top_destinations":["Shimla","Manali","Dharamsala","Dalhousie","Spiti"], "categories":["Nature","Adventure","Spiritual"], "lat":31.10, "lng":77.17, "capital":"Shimla",           "tourism_tagline":"Himachal — Unforgettable" },
      { "name":"Goa",             "code":"GA", "dtv_2022":7.4,   "dtv_2019":9.3,   "fta_2022":0.72, "fta_2019":0.84, "growth_dtv_pct":132.1, "top_destinations":["Panaji","Calangute","Baga","Old Goa","Dudhsagar"], "categories":["Beach","Heritage","Nature"], "lat":15.30, "lng":74.12, "capital":"Panaji",           "tourism_tagline":"Go Goa" },
      { "name":"Assam",           "code":"AS", "dtv_2022":8.6,   "dtv_2019":9.2,   "fta_2022":0.06, "fta_2019":0.08, "growth_dtv_pct":82.5,  "top_destinations":["Guwahati","Kaziranga","Manas","Majuli Island"], "categories":["Wildlife","Nature","Cultural"], "lat":26.20, "lng":92.94, "capital":"Dispur",           "tourism_tagline":"Flavours of Assam" },
      { "name":"Punjab",          "code":"PB", "dtv_2022":16.2,  "dtv_2019":21.4,  "fta_2022":0.26, "fta_2019":0.35, "growth_dtv_pct":86.4,  "top_destinations":["Amritsar","Chandigarh","Ludhiana","Anandpur Sahib"], "categories":["Spiritual","Heritage","Cultural"], "lat":31.15, "lng":75.34, "capital":"Chandigarh",       "tourism_tagline":"Punjab: India's Heartland" }
    ]
  },

  /* ── countries.json ─────────────────────────────────── */
  "countries": {
    "top_sources_2022": [
      { "rank":1,  "country":"Bangladesh", "code":"BD", "arrivals":1993.1, "share_pct":32.2, "prev_year":242.3, "continent":"Asia" },
      { "rank":2,  "country":"USA",        "code":"US", "arrivals":631.4,  "share_pct":10.2, "prev_year":259.9, "continent":"Americas" },
      { "rank":3,  "country":"UK",         "code":"GB", "arrivals":453.1,  "share_pct":7.3,  "prev_year":181.0, "continent":"Europe" },
      { "rank":4,  "country":"Australia",  "code":"AU", "arrivals":198.6,  "share_pct":3.2,  "prev_year":70.4,  "continent":"Oceania" },
      { "rank":5,  "country":"Canada",     "code":"CA", "arrivals":188.9,  "share_pct":3.0,  "prev_year":60.3,  "continent":"Americas" },
      { "rank":6,  "country":"Germany",    "code":"DE", "arrivals":155.2,  "share_pct":2.5,  "prev_year":51.2,  "continent":"Europe" },
      { "rank":7,  "country":"Sri Lanka",  "code":"LK", "arrivals":148.6,  "share_pct":2.4,  "prev_year":12.1,  "continent":"Asia" },
      { "rank":8,  "country":"Malaysia",   "code":"MY", "arrivals":134.4,  "share_pct":2.2,  "prev_year":13.3,  "continent":"Asia" },
      { "rank":9,  "country":"France",     "code":"FR", "arrivals":123.1,  "share_pct":2.0,  "prev_year":43.5,  "continent":"Europe" },
      { "rank":10, "country":"Nepal",      "code":"NP", "arrivals":118.4,  "share_pct":1.9,  "prev_year":8.4,   "continent":"Asia" },
      { "rank":11, "country":"China",      "code":"CN", "arrivals":85.6,   "share_pct":1.4,  "prev_year":1.2,   "continent":"Asia" },
      { "rank":12, "country":"UAE",        "code":"AE", "arrivals":80.4,   "share_pct":1.3,  "prev_year":26.8,  "continent":"Middle East" },
      { "rank":13, "country":"Singapore",  "code":"SG", "arrivals":75.3,   "share_pct":1.2,  "prev_year":20.1,  "continent":"Asia" },
      { "rank":14, "country":"Italy",      "code":"IT", "arrivals":72.1,   "share_pct":1.2,  "prev_year":24.3,  "continent":"Europe" },
      { "rank":15, "country":"Japan",      "code":"JP", "arrivals":68.9,   "share_pct":1.1,  "prev_year":8.2,   "continent":"Asia" },
      { "rank":16, "country":"Pakistan",   "code":"PK", "arrivals":63.2,   "share_pct":1.0,  "prev_year":3.2,   "continent":"Asia" },
      { "rank":17, "country":"Russia",     "code":"RU", "arrivals":58.7,   "share_pct":0.9,  "prev_year":18.9,  "continent":"Europe" },
      { "rank":18, "country":"Switzerland","code":"CH", "arrivals":48.2,   "share_pct":0.8,  "prev_year":16.3,  "continent":"Europe" },
      { "rank":19, "country":"Netherlands","code":"NL", "arrivals":44.8,   "share_pct":0.7,  "prev_year":13.9,  "continent":"Europe" },
      { "rank":20, "country":"Israel",     "code":"IL", "arrivals":42.3,   "share_pct":0.7,  "prev_year":9.1,   "continent":"Middle East" }
    ],
    "continental_2022": [
      { "continent":"Asia",        "arrivals":2792.4, "share_pct":45.1 },
      { "continent":"Europe",      "arrivals":1110.2, "share_pct":17.9 },
      { "continent":"Americas",    "arrivals":879.3,  "share_pct":14.2 },
      { "continent":"Middle East", "arrivals":370.1,  "share_pct":6.0  },
      { "continent":"Africa",      "arrivals":207.8,  "share_pct":3.4  },
      { "continent":"Oceania",     "arrivals":221.4,  "share_pct":3.6  },
      { "continent":"Other/NRI",   "arrivals":609.8,  "share_pct":9.8  }
    ],
    "trend_top5": {
      "years": [2017,2018,2019,2020,2021,2022],
      "Bangladesh": [754.9,888.0,1129.9,242.3,215.6,1993.1],
      "USA":        [1267.6,1332.1,1436.0,259.9,143.8,631.4],
      "UK":         [940.9,1000.7,1071.3,181.0,104.5,453.1],
      "Canada":     [368.1,395.7,431.9,60.3,38.8,188.9],
      "Australia":  [326.0,361.8,387.9,70.4,42.1,198.6]
    }
  },

  /* ── economy.json ───────────────────────────────────── */
  "economy": {
    "forex_earnings": [
      {"year":2013,"usd_billion":18.4,"inr_billion":1088,"growth_pct":null},
      {"year":2014,"usd_billion":20.2,"inr_billion":1236,"growth_pct":9.8},
      {"year":2015,"usd_billion":21.1,"inr_billion":1351,"growth_pct":4.5},
      {"year":2016,"usd_billion":22.9,"inr_billion":1543,"growth_pct":8.5},
      {"year":2017,"usd_billion":27.3,"inr_billion":1769,"growth_pct":19.2},
      {"year":2018,"usd_billion":28.7,"inr_billion":1941,"growth_pct":5.1},
      {"year":2019,"usd_billion":30.1,"inr_billion":2109,"growth_pct":4.9},
      {"year":2020,"usd_billion":6.9, "inr_billion":507, "growth_pct":-77.1},
      {"year":2021,"usd_billion":8.8, "inr_billion":655, "growth_pct":27.5},
      {"year":2022,"usd_billion":14.0,"inr_billion":1120.7,"growth_pct":59.1},
      {"year":2023,"usd_billion":22.9,"inr_billion":1899.9,"growth_pct":63.6}
    ],
    "gdp_contribution": [
      {"year":2013,"direct_pct":2.7,"total_pct":6.8,"direct_inr_billion":3240,"total_inr_billion":8160},
      {"year":2014,"direct_pct":2.8,"total_pct":7.0,"direct_inr_billion":3580,"total_inr_billion":8950},
      {"year":2015,"direct_pct":2.9,"total_pct":7.1,"direct_inr_billion":3920,"total_inr_billion":9590},
      {"year":2016,"direct_pct":3.0,"total_pct":7.3,"direct_inr_billion":4280,"total_inr_billion":10440},
      {"year":2017,"direct_pct":3.1,"total_pct":7.7,"direct_inr_billion":4810,"total_inr_billion":11960},
      {"year":2018,"direct_pct":3.2,"total_pct":8.0,"direct_inr_billion":5360,"total_inr_billion":13400},
      {"year":2019,"direct_pct":2.7,"total_pct":6.8,"direct_inr_billion":4860,"total_inr_billion":12240},
      {"year":2020,"direct_pct":1.9,"total_pct":4.7,"direct_inr_billion":2940,"total_inr_billion":7280},
      {"year":2021,"direct_pct":2.3,"total_pct":5.8,"direct_inr_billion":3820,"total_inr_billion":9630},
      {"year":2022,"direct_pct":2.9,"total_pct":7.1,"direct_inr_billion":5420,"total_inr_billion":13280},
      {"year":2023,"direct_pct":3.1,"total_pct":7.6,"direct_inr_billion":6290,"total_inr_billion":15420}
    ],
    "employment": [
      {"year":2013,"direct_million":19.8,"total_million":37.4},
      {"year":2014,"direct_million":20.4,"total_million":38.4},
      {"year":2015,"direct_million":20.9,"total_million":39.3},
      {"year":2016,"direct_million":21.4,"total_million":40.3},
      {"year":2017,"direct_million":22.1,"total_million":41.6},
      {"year":2018,"direct_million":22.7,"total_million":42.7},
      {"year":2019,"direct_million":39.5,"total_million":75.0},
      {"year":2020,"direct_million":33.1,"total_million":62.6},
      {"year":2021,"direct_million":36.4,"total_million":68.9},
      {"year":2022,"direct_million":40.8,"total_million":77.2},
      {"year":2023,"direct_million":42.2,"total_million":80.0}
    ],
    "spending_composition": {
      "year":2022,"data_type":"illustrative",
      "categories":[
        {"category":"Accommodation","share_pct":28},
        {"category":"Food & Beverage","share_pct":22},
        {"category":"Local Transport","share_pct":18},
        {"category":"Shopping","share_pct":14},
        {"category":"Entertainment","share_pct":8},
        {"category":"Tour Operators","share_pct":6},
        {"category":"Other","share_pct":4}
      ]
    },
    "gateway_arrivals": {
      "year":2022,
      "data": [
        {"gateway":"Delhi",     "arrivals_thousand":2241.4,"share_pct":36.2},
        {"gateway":"Mumbai",    "arrivals_thousand":1178.3,"share_pct":19.0},
        {"gateway":"Chennai",   "arrivals_thousand":612.4, "share_pct":9.9},
        {"gateway":"Bengaluru", "arrivals_thousand":521.8, "share_pct":8.4},
        {"gateway":"Hyderabad", "arrivals_thousand":248.2, "share_pct":4.0},
        {"gateway":"Kolkata",   "arrivals_thousand":245.0, "share_pct":4.0},
        {"gateway":"Kochi",     "arrivals_thousand":218.9, "share_pct":3.5},
        {"gateway":"Ahmedabad", "arrivals_thousand":116.4, "share_pct":1.9},
        {"gateway":"Others",    "arrivals_thousand":817.5, "share_pct":13.2}
      ]
    }
  },

  /* ── destinations.json ──────────────────────────────── */
  "destinations": {
    "destinations": [
      {"id":"agra",      "name":"Agra",      "state":"Uttar Pradesh",  "category":"Heritage",  "sub_tags":["UNESCO","Mughal","Monument"], "lat":27.18,"lng":78.01,"key_site":"Taj Mahal",      "domestic_visitors_2022":6.1, "foreign_visitors_2022":0.62,"unit":"Million","domestic_share_pct":90.8,"peak_months":["Oct","Nov","Dec","Feb","Mar"],"trend":[4.2,5.8,7.4,0.8,1.2,6.7],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"Home to the Taj Mahal, Agra Fort, and Fatehpur Sikri — all UNESCO World Heritage Sites.","connectivity":{"airports":["Agra Airport"],"nearest_major":"Delhi (200 km)"}},
      {"id":"varanasi",  "name":"Varanasi",  "state":"Uttar Pradesh",  "category":"Spiritual", "sub_tags":["Pilgrimage","Heritage","Cultural"], "lat":25.32,"lng":82.97,"key_site":"Kashi Vishwanath","domestic_visitors_2022":7.2,"foreign_visitors_2022":0.28,"unit":"Million","domestic_share_pct":96.2,"peak_months":["Oct","Nov","Dec","Jan","Feb"],"trend":[5.8,6.5,8.1,0.9,1.4,7.5],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"One of the world's oldest inhabited cities — major pilgrimage and cultural destination.","connectivity":{"airports":["Lal Bahadur Shastri Airport"],"nearest_major":"Lucknow (330 km)"}},
      {"id":"jaipur",    "name":"Jaipur",    "state":"Rajasthan",      "category":"Heritage",  "sub_tags":["UNESCO","Fort","Palace","Cultural"], "lat":26.91,"lng":75.79,"key_site":"Amber Fort",    "domestic_visitors_2022":3.8,"foreign_visitors_2022":0.46,"unit":"Million","domestic_share_pct":89.2,"peak_months":["Oct","Nov","Dec","Jan","Feb","Mar"],"trend":[3.2,3.5,4.2,0.4,0.7,4.3],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"The Pink City — featuring Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar.","connectivity":{"airports":["Jaipur International Airport"],"nearest_major":"Delhi (280 km)"}},
      {"id":"goa",       "name":"Goa",       "state":"Goa",            "category":"Beach",     "sub_tags":["Heritage","Nature","Cultural"], "lat":15.30,"lng":74.12,"key_site":"Calangute Beach",  "domestic_visitors_2022":6.9,"foreign_visitors_2022":0.72,"unit":"Million","domestic_share_pct":90.6,"peak_months":["Nov","Dec","Jan","Feb"],"trend":[6.5,7.2,8.4,0.7,1.4,7.6],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"India's premier beach destination — beaches, Portuguese heritage and vibrant culture.","connectivity":{"airports":["Dabolim Airport","Mopa Airport"],"nearest_major":"Mumbai (600 km)"}},
      {"id":"kerala",    "name":"Kerala Backwaters","state":"Kerala",  "category":"Nature",    "sub_tags":["Wellness","Backwaters","Wildlife"], "lat":9.50,"lng":76.34,"key_site":"Alleppey Backwaters","domestic_visitors_2022":4.2,"foreign_visitors_2022":0.38,"unit":"Million","domestic_share_pct":91.7,"peak_months":["Sep","Oct","Nov","Dec","Jan","Feb"],"trend":[3.8,4.2,5.1,0.3,0.6,4.6],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"Famous for backwater houseboat experiences, Ayurveda wellness retreats, and natural scenery.","connectivity":{"airports":["Cochin International Airport"],"nearest_major":"Kochi (90 km)"}},
      {"id":"hampi",     "name":"Hampi",     "state":"Karnataka",      "category":"Heritage",  "sub_tags":["UNESCO","Ruins","Adventure"], "lat":15.34,"lng":76.46,"key_site":"Virupaksha Temple", "domestic_visitors_2022":2.1,"foreign_visitors_2022":0.12,"unit":"Million","domestic_share_pct":94.6,"peak_months":["Oct","Nov","Dec","Jan","Feb","Mar"],"trend":[1.6,1.8,2.3,0.1,0.3,2.2],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"UNESCO World Heritage Site — ruins of the Vijayanagara Empire.","connectivity":{"airports":["Hubli Airport"],"nearest_major":"Hubli (150 km)"}},
      {"id":"bodh-gaya", "name":"Bodh Gaya", "state":"Bihar",          "category":"Spiritual", "sub_tags":["UNESCO","Buddhist","Pilgrimage"], "lat":24.70,"lng":84.99,"key_site":"Mahabodhi Temple", "domestic_visitors_2022":1.8,"foreign_visitors_2022":0.32,"unit":"Million","domestic_share_pct":84.9,"peak_months":["Oct","Nov","Dec","Jan","Feb"],"trend":[1.4,1.6,1.9,0.1,0.2,2.1],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"UNESCO World Heritage Site — the place of Buddha's enlightenment.","connectivity":{"airports":["Gaya Airport"],"nearest_major":"Patna (130 km)"}},
      {"id":"kaziranga", "name":"Kaziranga", "state":"Assam",          "category":"Wildlife",  "sub_tags":["UNESCO","Rhino","National Park"], "lat":26.58,"lng":93.17,"key_site":"Kaziranga NP",    "domestic_visitors_2022":0.28,"foreign_visitors_2022":0.02,"unit":"Million","domestic_share_pct":93.3,"peak_months":["Nov","Dec","Jan","Feb","Mar","Apr"],"trend":[0.18,0.21,0.26,0.01,0.04,0.30],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"UNESCO World Heritage Site — home to world's largest population of one-horned rhinoceroses.","connectivity":{"airports":["Jorhat Airport"],"nearest_major":"Jorhat (97 km)"}},
      {"id":"rishikesh", "name":"Rishikesh", "state":"Uttarakhand",    "category":"Spiritual", "sub_tags":["Adventure","Yoga","Nature"], "lat":30.09,"lng":78.27,"key_site":"Laxman Jhula",      "domestic_visitors_2022":3.4,"foreign_visitors_2022":0.08,"unit":"Million","domestic_share_pct":97.7,"peak_months":["Feb","Mar","Apr","Sep","Oct","Nov"],"trend":[2.8,3.0,3.6,0.2,0.4,3.5],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"The Yoga Capital of the World — gateway to Char Dham pilgrimage and adventure sports.","connectivity":{"airports":["Jolly Grant Airport"],"nearest_major":"Dehradun (44 km)"}},
      {"id":"amritsar",  "name":"Amritsar",  "state":"Punjab",         "category":"Spiritual", "sub_tags":["Heritage","Cultural","Pilgrimage"], "lat":31.63,"lng":74.87,"key_site":"Golden Temple",  "domestic_visitors_2022":7.8,"foreign_visitors_2022":0.22,"unit":"Million","domestic_share_pct":97.3,"peak_months":["Oct","Nov","Dec","Jan","Apr","May"],"trend":[6.2,6.8,8.0,0.5,1.1,8.0],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"Home to the Golden Temple — holiest shrine of Sikhism and one of India's most visited sites.","connectivity":{"airports":["Sri Guru Ram Dass Jee International Airport"],"nearest_major":"Chandigarh (230 km)"}},
      {"id":"konark",    "name":"Konark",    "state":"Odisha",         "category":"Heritage",  "sub_tags":["UNESCO","Temple","Sun Temple"], "lat":19.89,"lng":86.09,"key_site":"Sun Temple",        "domestic_visitors_2022":2.4,"foreign_visitors_2022":0.04,"unit":"Million","domestic_share_pct":98.4,"peak_months":["Oct","Nov","Dec","Jan","Feb"],"trend":[1.8,2.0,2.6,0.1,0.3,2.4],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"UNESCO World Heritage Site — the 13th-century Sun Temple, a masterpiece of Kalinga architecture.","connectivity":{"airports":["Bhubaneswar Airport"],"nearest_major":"Puri (35 km)"}},
      {"id":"manali",    "name":"Manali",    "state":"Himachal Pradesh","category":"Adventure","sub_tags":["Nature","Trekking","Skiing"], "lat":32.24,"lng":77.19,"key_site":"Rohtang Pass",       "domestic_visitors_2022":2.6,"foreign_visitors_2022":0.06,"unit":"Million","domestic_share_pct":97.8,"peak_months":["May","Jun","Jul","Dec","Jan","Feb"],"trend":[2.0,2.2,2.8,0.1,0.3,2.7],"trend_years":[2017,2018,2019,2020,2021,2022],"description":"High-altitude resort town — gateway to Rohtang Pass and Lahaul valley.","connectivity":{"airports":["Bhuntar Airport"],"nearest_major":"Chandigarh (310 km)"}}
    ]
  },

  /* ── infrastructure.json ────────────────────────────── */
  "infrastructure": {
    "hotels_classified": {
      "year":2022,"total":10536,"rooms":1023000,
      "by_category":[
        {"category":"5 Star Deluxe","hotels":152,"rooms":43200},
        {"category":"5 Star",       "hotels":189,"rooms":39800},
        {"category":"4 Star",       "hotels":385,"rooms":56400},
        {"category":"3 Star",       "hotels":1840,"rooms":148200},
        {"category":"2 Star",       "hotels":1927,"rooms":94800},
        {"category":"1 Star",       "hotels":780,"rooms":26400},
        {"category":"Heritage",     "hotels":128,"rooms":5940},
        {"category":"Approved",     "hotels":5135,"rooms":608200}
      ]
    },
    "hotels_trend":[
      {"year":2017,"classified":8032},{"year":2018,"classified":8641},{"year":2019,"classified":9338},
      {"year":2020,"classified":9158},{"year":2021,"classified":9403},{"year":2022,"classified":10536}
    ],
    "airports":{
      "year":2023,"total_operational":148,"international":34,"domestic":114,
      "major_airports":[
        {"name":"Delhi IGI",      "city":"Delhi",     "lat":28.56,"lng":77.10,"pax_million_2022":59.5,"type":"International"},
        {"name":"Mumbai CSIA",    "city":"Mumbai",    "lat":19.09,"lng":72.87,"pax_million_2022":45.8,"type":"International"},
        {"name":"Bengaluru KIAL", "city":"Bengaluru", "lat":13.20,"lng":77.71,"pax_million_2022":33.2,"type":"International"},
        {"name":"Hyderabad RGIA", "city":"Hyderabad", "lat":17.24,"lng":78.43,"pax_million_2022":21.6,"type":"International"},
        {"name":"Chennai IAA",    "city":"Chennai",   "lat":12.99,"lng":80.17,"pax_million_2022":20.4,"type":"International"},
        {"name":"Kolkata NSIA",   "city":"Kolkata",   "lat":22.65,"lng":88.45,"pax_million_2022":14.6,"type":"International"},
        {"name":"Kochi CIA",      "city":"Kochi",     "lat":10.15,"lng":76.39,"pax_million_2022":11.6,"type":"International"},
        {"name":"Ahmedabad SVPI", "city":"Ahmedabad", "lat":23.07,"lng":72.63,"pax_million_2022":10.2,"type":"International"}
      ]
    },
    "state_infrastructure_index": {
      "data_type":"derived",
      "states":[
        {"state":"Goa",             "hotels":840, "airports":2, "tic":12},
        {"state":"Delhi",           "hotels":680, "airports":1, "tic":18},
        {"state":"Maharashtra",     "hotels":2140,"airports":14,"tic":45},
        {"state":"Rajasthan",       "hotels":1620,"airports":8, "tic":38},
        {"state":"Karnataka",       "hotels":1380,"airports":7, "tic":32},
        {"state":"Kerala",          "hotels":1240,"airports":3, "tic":28},
        {"state":"Tamil Nadu",      "hotels":1480,"airports":4, "tic":36},
        {"state":"Uttar Pradesh",   "hotels":1820,"airports":9, "tic":52},
        {"state":"Himachal Pradesh","hotels":920, "airports":3, "tic":22},
        {"state":"Uttarakhand",     "hotels":780, "airports":2, "tic":18}
      ]
    }
  },

  /* ── heritage.json ──────────────────────────────────── */
  "heritage": {
    "summary":{"unesco_world_heritage_sites":42,"asi_protected_monuments":3693,"asi_ticketed_monuments":143},
    "asi_visitors_trend":[
      {"year":2017,"domestic_million":176.2,"foreign_million":5.4},
      {"year":2018,"domestic_million":183.6,"foreign_million":5.7},
      {"year":2019,"domestic_million":195.1,"foreign_million":6.3},
      {"year":2020,"domestic_million":40.2, "foreign_million":0.8},
      {"year":2021,"domestic_million":58.4, "foreign_million":0.4},
      {"year":2022,"domestic_million":163.2,"foreign_million":4.1}
    ],
    "top_ticketed_monuments":[
      {"rank":1, "monument":"Taj Mahal",           "state":"Uttar Pradesh",  "domestic_2022":5812000,"foreign_2022":618000},
      {"rank":2, "monument":"Red Fort",            "state":"Delhi",          "domestic_2022":4241000,"foreign_2022":286000},
      {"rank":3, "monument":"Qutub Minar",         "state":"Delhi",          "domestic_2022":3842000,"foreign_2022":312000},
      {"rank":4, "monument":"Agra Fort",           "state":"Uttar Pradesh",  "domestic_2022":3124000,"foreign_2022":284000},
      {"rank":5, "monument":"Humayun's Tomb",      "state":"Delhi",          "domestic_2022":1842000,"foreign_2022":198000},
      {"rank":6, "monument":"Sun Temple Konark",   "state":"Odisha",         "domestic_2022":2284000,"foreign_2022":42000},
      {"rank":7, "monument":"Khajuraho",           "state":"Madhya Pradesh", "domestic_2022":824000, "foreign_2022":82000},
      {"rank":8, "monument":"Fatehpur Sikri",      "state":"Uttar Pradesh",  "domestic_2022":1524000,"foreign_2022":164000}
    ],
    "unesco_sites":[
      {"name":"Taj Mahal",            "state":"Uttar Pradesh",  "year":1983,"category":"Cultural"},
      {"name":"Agra Fort",            "state":"Uttar Pradesh",  "year":1983,"category":"Cultural"},
      {"name":"Ajanta Caves",         "state":"Maharashtra",    "year":1983,"category":"Cultural"},
      {"name":"Ellora Caves",         "state":"Maharashtra",    "year":1983,"category":"Cultural"},
      {"name":"Kaziranga NP",         "state":"Assam",          "year":1985,"category":"Natural"},
      {"name":"Keoladeo NP",          "state":"Rajasthan",      "year":1985,"category":"Natural"},
      {"name":"Manas NP",             "state":"Assam",          "year":1985,"category":"Natural"},
      {"name":"Hampi",                "state":"Karnataka",      "year":1986,"category":"Cultural"},
      {"name":"Khajuraho",            "state":"Madhya Pradesh", "year":1986,"category":"Cultural"},
      {"name":"Fatehpur Sikri",       "state":"Uttar Pradesh",  "year":1986,"category":"Cultural"},
      {"name":"Sun Temple Konark",    "state":"Odisha",         "year":1984,"category":"Cultural"},
      {"name":"Mahabalipuram",        "state":"Tamil Nadu",     "year":1984,"category":"Cultural"},
      {"name":"Sundarbans NP",        "state":"West Bengal",    "year":1987,"category":"Natural"},
      {"name":"Nanda Devi",           "state":"Uttarakhand",    "year":1988,"category":"Natural"},
      {"name":"Mahabodhi Temple",     "state":"Bihar",          "year":2002,"category":"Cultural"},
      {"name":"Western Ghats",        "state":"Multiple",       "year":2012,"category":"Natural"},
      {"name":"Great Himalayan NP",   "state":"Himachal Pradesh","year":2014,"category":"Natural"}
    ]
  },

  /* ── sustainability.json ────────────────────────────── */
  "sustainability": {
    "protected_areas":{
      "year":2023,"national_parks":106,"wildlife_sanctuaries":551,
      "tiger_reserves":54,"biosphere_reserves":18,"ramsar_wetlands":75,"total_protected_area_sq_km":165088
    },
    "eco_tourism_destinations":[
      {"name":"Munnar",        "state":"Kerala",           "type":"Nature"},
      {"name":"Coorg",         "state":"Karnataka",        "type":"Nature"},
      {"name":"Spiti Valley",  "state":"Himachal Pradesh", "type":"Adventure"},
      {"name":"Ziro Valley",   "state":"Arunachal Pradesh","type":"Cultural"},
      {"name":"Chilika Lake",  "state":"Odisha",           "type":"Wildlife"},
      {"name":"Rann of Kutch", "state":"Gujarat",          "type":"Nature"},
      {"name":"Majuli Island", "state":"Assam",            "type":"Cultural"},
      {"name":"Tawang",        "state":"Arunachal Pradesh","type":"Nature"}
    ],
    "tourism_pressure_index":{
      "data_type":"derived",
      "states":[
        {"state":"Goa",             "visitors_2022":7.4,  "area_km2":3702,   "population_million":1.6, "index":9.2},
        {"state":"Delhi",           "visitors_2022":18.2, "area_km2":1484,   "population_million":20.0,"index":8.4},
        {"state":"Tamil Nadu",      "visitors_2022":225.3,"area_km2":130058, "population_million":77.8,"index":7.8},
        {"state":"Uttar Pradesh",   "visitors_2022":321.6,"area_km2":240928, "population_million":241.5,"index":7.1},
        {"state":"Kerala",          "visitors_2022":63.0, "area_km2":38852,  "population_million":35.7,"index":7.4},
        {"state":"Uttarakhand",     "visitors_2022":38.4, "area_km2":53483,  "population_million":11.1,"index":6.9},
        {"state":"Himachal Pradesh","visitors_2022":19.1, "area_km2":55673,  "population_million":7.5, "index":6.8},
        {"state":"Karnataka",       "visitors_2022":155.6,"area_km2":191791, "population_million":67.6,"index":6.2},
        {"state":"Rajasthan",       "visitors_2022":76.6, "area_km2":342239, "population_million":81.0,"index":5.8},
        {"state":"Maharashtra",     "visitors_2022":121.0,"area_km2":307713, "population_million":126.4,"index":5.2}
      ]
    },
    "sustainability_initiatives":[
      {"name":"Swadesh Darshan 2.0",      "focus":"Sustainable & Responsible Tourism","ministry":"Tourism",    "year":2022},
      {"name":"PRASHAD Scheme",           "focus":"Pilgrimage Rejuvenation",          "ministry":"Tourism",    "year":2015},
      {"name":"Incredible India 2.0",     "focus":"Sustainable Tourism Marketing",    "ministry":"Tourism",    "year":2017},
      {"name":"Project Tiger",            "focus":"Tiger Conservation",               "ministry":"Environment","year":1973},
      {"name":"Project Elephant",         "focus":"Elephant Conservation",            "ministry":"Environment","year":1992},
      {"name":"Green Tourism Certification","focus":"Eco-Hotel Standards",            "ministry":"Tourism",    "year":2019}
    ]
  },

  /* ── projects.json ──────────────────────────────────── */
  "projects": {
    "projects":[
      {"id":1, "name":"Ramayana Circuit",       "scheme":"Swadesh Darshan",    "state":"Uttar Pradesh",  "category":"Spiritual",  "investment_crore":185.0,"status":"Completed","year":2016},
      {"id":2, "name":"Buddhist Circuit",       "scheme":"Swadesh Darshan",    "state":"Bihar",          "category":"Spiritual",  "investment_crore":325.0,"status":"Completed","year":2016},
      {"id":3, "name":"Wildlife Circuit",       "scheme":"Swadesh Darshan",    "state":"Madhya Pradesh", "category":"Wildlife",   "investment_crore":98.0, "status":"Completed","year":2016},
      {"id":4, "name":"North East Discovery",   "scheme":"Swadesh Darshan",    "state":"Assam",          "category":"Eco-Tourism","investment_crore":56.0, "status":"Ongoing",  "year":2018},
      {"id":5, "name":"Himalayan Circuit HP",   "scheme":"Swadesh Darshan",    "state":"Himachal Pradesh","category":"Adventure", "investment_crore":142.0,"status":"Completed","year":2017},
      {"id":6, "name":"Coastal Circuit Kerala", "scheme":"Swadesh Darshan",    "state":"Kerala",         "category":"Beach",      "investment_crore":116.0,"status":"Completed","year":2017},
      {"id":7, "name":"Heritage Rajasthan",     "scheme":"Swadesh Darshan",    "state":"Rajasthan",      "category":"Heritage",   "investment_crore":98.0, "status":"Ongoing",  "year":2019},
      {"id":8, "name":"Tirupati PRASHAD",       "scheme":"PRASHAD",            "state":"Andhra Pradesh", "category":"Spiritual",  "investment_crore":48.0, "status":"Completed","year":2015},
      {"id":9, "name":"Varanasi PRASHAD",       "scheme":"PRASHAD",            "state":"Uttar Pradesh",  "category":"Spiritual",  "investment_crore":89.0, "status":"Completed","year":2016},
      {"id":10,"name":"Puri PRASHAD",           "scheme":"PRASHAD",            "state":"Odisha",         "category":"Spiritual",  "investment_crore":52.0, "status":"Completed","year":2017},
      {"id":11,"name":"Amritsar PRASHAD",       "scheme":"PRASHAD",            "state":"Punjab",         "category":"Spiritual",  "investment_crore":44.0, "status":"Completed","year":2017},
      {"id":12,"name":"Tribal Circuit Odisha",  "scheme":"Swadesh Darshan",    "state":"Odisha",         "category":"Tribal",     "investment_crore":68.0, "status":"Ongoing",  "year":2020},
      {"id":13,"name":"Rural Circuit Gujarat",  "scheme":"Swadesh Darshan",    "state":"Gujarat",        "category":"Rural",      "investment_crore":42.0, "status":"Planned",  "year":2023},
      {"id":14,"name":"Adventure Circuit HP-2", "scheme":"Swadesh Darshan 2.0","state":"Himachal Pradesh","category":"Adventure", "investment_crore":96.0, "status":"Ongoing",  "year":2023},
      {"id":15,"name":"Eco Circuit W.Ghats",    "scheme":"Swadesh Darshan 2.0","state":"Karnataka",      "category":"Eco-Tourism","investment_crore":78.0, "status":"Planned",  "year":2023}
    ],
    "status_summary":[
      {"status":"Completed","count":8, "investment_crore":1057.0},
      {"status":"Ongoing",  "count":5, "investment_crore":440.0},
      {"status":"Planned",  "count":2, "investment_crore":174.0}
    ],
    "category_summary":[
      {"category":"Spiritual",  "count":5,"investment_crore":743.0},
      {"category":"Adventure",  "count":2,"investment_crore":238.0},
      {"category":"Heritage",   "count":2,"investment_crore":196.0},
      {"category":"Eco-Tourism","count":2,"investment_crore":134.0},
      {"category":"Beach",      "count":1,"investment_crore":116.0},
      {"category":"Wildlife",   "count":1,"investment_crore":98.0},
      {"category":"Tribal",     "count":1,"investment_crore":68.0},
      {"category":"Rural",      "count":1,"investment_crore":42.0}
    ]
  }
};

/* ============================================================
   DataLoader API — reads from inlined TOURISM_DATA object
   No fetch() — works on file:// without any server
   ============================================================ */
const DataLoader = (() => {
  const cache = {};

  async function load(file) {
    const key = file.replace('.json', '').replace('../data/', '').replace('data/', '');
    if (cache[key]) return cache[key];
    const data = TOURISM_DATA[key] || null;
    if (!data) console.warn('DataLoader: key not found:', key);
    cache[key] = data;
    return data;
  }

  async function loadAll(files) {
    const out = {};
    for (const f of files) {
      const key = f.replace('.json', '').replace('../data/', '').replace('data/', '');
      out[key] = await load(f);
    }
    return out;
  }

  return { load, loadAll };
})();

/* ── Insights Engine ─────────────────────────────────────── */
const InsightsEngine = (() => {

  function yearOverYearChange(current, previous) {
    if (!previous || previous === 0) return null;
    return ((current - previous) / Math.abs(previous) * 100).toFixed(1);
  }

  function generateNationalInsights(data) {
    if (!data) return [];
    const insights = [];
    const yearly = data.yearly;
    const latest = yearly[yearly.length - 1];
    const prev   = yearly[yearly.length - 2];

    const ftaChange = yearOverYearChange(latest.fta, prev.fta);
    if (ftaChange !== null) {
      insights.push({
        type: ftaChange > 0 ? 'positive' : 'negative',
        text: `Foreign tourist arrivals ${ftaChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(ftaChange)}% in ${latest.year} compared to ${prev.year}.`,
        source: 'Ministry of Tourism / Bureau of Immigration'
      });
    }

    const dtvChange = yearOverYearChange(latest.dtv, prev.dtv);
    if (dtvChange !== null) {
      insights.push({
        type: dtvChange > 0 ? 'positive' : 'negative',
        text: `Domestic tourist visits ${dtvChange > 0 ? 'grew' : 'fell'} by ${Math.abs(dtvChange)}% to ${latest.dtv.toFixed(0)} million in ${latest.year}.`,
        source: 'Ministry of Tourism / State Tourism Departments'
      });
    }

    const kpi = data.kpi_2023;
    if (kpi && kpi.forex_usd) {
      const fxChange = yearOverYearChange(kpi.forex_usd.value, kpi.forex_usd.prev_year);
      insights.push({
        type: 'info',
        text: `Foreign exchange earnings reached USD ${kpi.forex_usd.value} billion — a ${fxChange}% change year-on-year.`,
        source: 'Reserve Bank of India'
      });
    }

    const pre2019 = yearly.find(y => y.year === 2019);
    if (pre2019 && latest.fta) {
      const recovery = ((latest.fta / pre2019.fta) * 100).toFixed(1);
      insights.push({
        type: 'info',
        text: `Foreign tourist arrivals in ${latest.year} reached ${recovery}% of pre-pandemic 2019 levels.`,
        source: 'Ministry of Tourism'
      });
    }

    return insights;
  }

  function generateStateInsights(statesData) {
    if (!statesData || !statesData.states) return [];
    const states  = statesData.states;
    const sorted  = [...states].sort((a, b) => b.dtv_2022 - a.dtv_2022);
    const top     = sorted[0];
    const total   = states.reduce((s, st) => s + st.dtv_2022, 0);
    const top3Share = (sorted.slice(0, 3).reduce((s, st) => s + st.dtv_2022, 0) / total * 100).toFixed(1);
    return [
      { type:'info', text:`${top.name} recorded the highest domestic tourist visits in 2022 at ${top.dtv_2022.toFixed(1)} million.`, source:'Ministry of Tourism / State Tourism Departments' },
      { type:'info', text:`The top 3 states accounted for ${top3Share}% of total domestic tourist visits across tracked states in 2022.`, source:'Derived from Ministry of Tourism data' }
    ];
  }

  return { generateNationalInsights, generateStateInsights, yearOverYearChange };
})();
