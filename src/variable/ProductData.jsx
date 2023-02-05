const productData = [
    {
        category: "Small Appliances",
        model: "AREF",
        brand: "AQUA",
        description: "Air Cooler"
    },
    {
        category: "Small Appliances",
        model: "AEM-",
        brand: "AQUA",
        description: "Electronical MWO without grill"
    },
    {
        category: "Small Appliances",
        model: "AB-K",
        brand: "AQUA",
        description: "Blender"
    },
    {
        category: "Small Appliances",
        model: "BAC-",
        brand: "AQUA",
        description: "Vacuum Cleaner"
    },
    {
        category: "Small Appliances",
        model: "AJK-",
        brand: "AQUA",
        description: "Kettle"
    },
    {
        category: "Small Appliances",
        model: "ARJ-",
        brand: "AQUA",
        description: "Rice cooker"
    },
    {
        category: "Small Appliances",
        model: "AEF-",
        brand: "AQUA",
        description: "Electric Stand Fan"
    },
    {
        category: "Others",
        model: "9999",
        brand: "AQUA",
        description: "C-MRV outdoor"
    },
    {
        category: "Refrigerator",
        model: "AQR-",
        brand: "AQUA",
        description: "Double-door top freezer and bottom refrigerator"
    },
    {
        category: "Home Air Conditioner",
        model: "AQA-",
        brand: "AQUA",
        description: "Cabinet CAC one by one(indoor)"
    },
    {
        category: "Washing Machine",
        model: "QW-8",
        brand: "AQUA",
        description: "Semi Automatic WM"
    },
    {
        category: "Washing Machine",
        model: "QW-9",
        brand: "AQUA",
        description: "Semi Automatic WM"
    },
    {
        category: "Washing Machine",
        model: "QW-P",
        brand: "AQUA",
        description: "Semi Automatic WM"
    },
    {
        category: "Freezer",
        model: "SC-3",
        brand: "HAIER",
        description: "chest freezer"
    },
    {
        category: "Home Air Conditioner",
        model: "AQA-",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Others",
        model: "9999",
        brand: "AQUA",
        description: "Fully Automatic WM"
    },
    {
        category: "Washing Machine",
        model: "QW-7",
        brand: "AQUA",
        description: "Semi Automatic WM"
    },
    {
        category: "Freezer",
        model: "AQF-",
        brand: "AQUA",
        description: "chest freezer"
    },
    {
        category: "Washing Machine",
        model: "AQW-",
        brand: "AQUA",
        description: "Fully Automatic WM"
    },
    {
        category: "Freezer",
        model: "BC-8",
        brand: "HAIER",
        description: "Beverage cooler"
    },
    {
        category: "Commercial AC",
        model: "1U40",
        brand: "HAIER",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "1U50",
        brand: "HAIER",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Home Air Conditioner",
        model: "AQA-",
        brand: "AQUA",
        description: "AC Fix Indoor Unit"
    },
    {
        category: "Freezer",
        model: "AQB-",
        brand: "AQUA",
        description: "Beverage cooler"
    },
    {
        category: "Others",
        model: "9999",
        brand: "HAIER",
        description: "chest freezer"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "AQUA",
        description: "32 inch TV"
    },
    {
        category: "TV",
        model: "LE49",
        brand: "AQUA",
        description: "49 inch TV"
    },
    {
        category: "TV",
        model: "LE55",
        brand: "AQUA",
        description: "55 inch TV"
    },
    {
        category: "Refrigerator",
        model: "8314",
        brand: "AQUA",
        description: "Single-door top freezer and bottom refrigerator"
    },
    {
        category: "Home Air Conditioner",
        model: "AS05",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Freezer",
        model: "BD-7",
        brand: "AQUA",
        description: "Chest freezer(big-sized)"
    },
    {
        category: "Refrigerator",
        model: "HW00",
        brand: "AQUA",
        description: "Single-door top freezer and bottom refrigerator"
    },
    {
        category: "Refrigerator",
        model: "HRF-",
        brand: "AQUA",
        description: "Side- by- side refrigerator"
    },
    {
        category: "Refrigerator",
        model: "8315",
        brand: "AQUA",
        description: "Double-door top freezer and bottom refrigerator"
    },
    {
        category: "Refrigerator",
        model: "3831",
        brand: "AQUA",
        description: "Single-door top freezer and bottom refrigerator"
    },
    {
        category: "Home Air Conditioner",
        model: "AS09",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Small Appliances",
        model: "AC-F",
        brand: "AQUA",
        description: "Vacuum Cleaner"
    },
    {
        category: "Refrigerator",
        model: "AQR-",
        brand: "AQUA",
        description: "Double-door top refrigerator and bottom freezer"
    },
    {
        category: "TV",
        model: "LE40",
        brand: "AQUA",
        description: "40 inch TV"
    },
    {
        category: "Home Air Conditioner",
        model: "1U09",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Home Air Conditioner",
        model: "1U05",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Freezer",
        model: "BD-2",
        brand: "HAIER",
        description: "chest freezer"
    },
    {
        category: "Water Heater",
        model: "AES1",
        brand: "AQUA",
        description: "Electric Water Heater"
    },
    {
        category: "Freezer",
        model: "BD-3",
        brand: "AQUA",
        description: "Chest freezer(big-sized)"
    },
    {
        category: "Water Heater",
        model: "AES3",
        brand: "AQUA",
        description: "Electric Water Heater"
    },
    {
        category: "Washing Machine",
        model: "HWM2",
        brand: "AQUA",
        description: "Twin-tub WM"
    },
    {
        category: "Home Air Conditioner",
        model: "1U18",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Washing Machine",
        model: "HWM5",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Drum Washing Machine",
        model: "HW12",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Freezer",
        model: "SD-3",
        brand: "HAIER",
        description: "Commercial chest freezer"
    },
    {
        category: "Freezer",
        model: "BD-4",
        brand: "AQUA",
        description: "Chest freezer(big-sized)"
    },
    {
        category: "Washing Machine",
        model: "HWM1",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Drum Washing Machine",
        model: "HW80",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Freezer",
        model: "SD-2",
        brand: "HAIER",
        description: "Commercial chest freezer"
    },
    {
        category: "Washing Machine",
        model: "HWM6",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Washing Machine",
        model: "HWM7",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Home Air Conditioner",
        model: "AP24",
        brand: "AQUA",
        description: "Cabinet split AC"
    },
    {
        category: "Refrigerator",
        model: "SR-D",
        brand: "SANYO",
        description: "Single-door top freezer and bottom refrigerator"
    },
    {
        category: "Freezer",
        model: "BD-2",
        brand: "AQUA",
        description: "Chest Freezer(small-sized)"
    },
    {
        category: "TV",
        model: "LE28",
        brand: "SANYO",
        description: "TV attatchment"
    },
    {
        category: "TV",
        model: "LE29",
        brand: "HAIER",
        description: "TV attatchment"
    },
    {
        category: "Home Air Conditioner",
        model: "AS18",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Home Air Conditioner",
        model: "1U10",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Washing Machine",
        model: "HCW-",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Freezer",
        model: "BD-1",
        brand: "AQUA",
        description: "Chest Freezer(small-sized)"
    },
    {
        category: "Freezer",
        model: "SC-3",
        brand: "HAIER",
        description: "Beverage cooler"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "SANYO",
        description: "32 inch TV"
    },
    {
        category: "TV",
        model: "LE42",
        brand: "AQUA",
        description: "42 inch TV"
    },
    {
        category: "Refrigerator",
        model: "AQR-",
        brand: "AQUA",
        description: "Side- by- side refrigerator"
    },
    {
        category: "Freezer",
        model: "SF-C",
        brand: "SANYO",
        description: "chest freezer"
    },
    {
        category: "TV",
        model: "LE24",
        brand: "AQUA",
        description: "24 inch TV"
    },
    {
        category: "Washing Machine",
        model: "SW-8",
        brand: "SANYO",
        description: "Free standing washer&dryer electronical DWM"
    },
    {
        category: "TV",
        model: "LE24",
        brand: "HAIER",
        description: "24 inch TV"
    },
    {
        category: "TV",
        model: "LE24",
        brand: "SANYO",
        description: "24 inch TV"
    },
    {
        category: "Small Appliances",
        model: "AJ-K",
        brand: "AQUA",
        description: "Juicer"
    },
    {
        category: "Commercial AC",
        model: "ATC-",
        brand: "AQUA",
        description: "43 inch TV"
    },
    {
        category: "Others",
        model: "9999",
        brand: "AQUA",
        description: "C-MRV Cassette indoor"
    },
    {
        category: "Washing Machine",
        model: "QW-1",
        brand: "AQUA",
        description: "Semi Automatic WM"
    },
    {
        category: "Washing Machine",
        model: "QW-2",
        brand: "AQUA",
        description: ""
    },
    {
        category: "TV",
        model: "LE48",
        brand: "AQUA",
        description: "48 inch TV"
    },
    {
        category: "Refrigerator",
        model: "8340",
        brand: "AQUA",
        description: "Single-door freezer"
    },
    {
        category: "Refrigerator",
        model: "8345",
        brand: "AQUA",
        description: "Single-door freezer"
    },
    {
        category: "Drum Washing Machine",
        model: "HW10",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Refrigerator",
        model: "AQUA",
        brand: "AQUA",
        description: "Double-door top refrigerator and bottom freezer"
    },
    {
        category: "Freezer",
        model: "BD-7",
        brand: "HAIER",
        description: "Chest freezer(big-sized)"
    },
    {
        category: "Home Air Conditioner",
        model: "AS12",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Commercial AC",
        model: "AB50",
        brand: "HAIER",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AB40",
        brand: "HAIER",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "PB-9",
        brand: "HAIER",
        description: "CAC one by one(panel)"
    },
    {
        category: "TV",
        model: "LE43",
        brand: "AQUA",
        description: "43 inch TV"
    },
    {
        category: "Home Air Conditioner",
        model: "SAP-",
        brand: "SANYO",
        description: "AC Fix Indoor Unit"
    },
    {
        category: "Cooking",
        model: "AQC-",
        brand: "AQUA",
        description: "COOKING - FS COOKERS 60x60"
    },
    {
        category: "Small Appliances",
        model: "AC-E",
        brand: "AQUA",
        description: "Vacuum Cleaner"
    },
    {
        category: "Cooking",
        model: "AQC-",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Freezer",
        model: "BD-5",
        brand: "AQUA",
        description: "Chest freezer(big-sized)"
    },
    {
        category: "Home Air Conditioner",
        model: "1U12",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Drum Washing Machine",
        model: "G806",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Home Air Conditioner",
        model: "1U07",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Freezer",
        model: "SD-1",
        brand: "HAIER",
        description: "Commercial chest freezer"
    },
    {
        category: "Drum Washing Machine",
        model: "HW70",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Freezer",
        model: "BC/B",
        brand: "AQUA",
        description: "Chest freezer(big-sized)"
    },
    {
        category: "Drum Washing Machine",
        model: "G706",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Freezer",
        model: "SC-1",
        brand: "HAIER",
        description: "Others"
    },
    {
        category: "Freezer",
        model: "SC-2",
        brand: "HAIER",
        description: "Others"
    },
    {
        category: "Home Air Conditioner",
        model: "1U24",
        brand: "AQUA",
        description: "Cabinet split AC"
    },
    {
        category: "Washing Machine",
        model: "MB10",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Drum Washing Machine",
        model: "C1 B",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Washing Machine",
        model: "FQB1",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Cooking",
        model: "AQC-",
        brand: "AQUA",
        description: "Others"
    },
    {
        category: "Refrigerator",
        model: "H000",
        brand: "AQUA",
        description: "Double-door top freezer and bottom refrigerator"
    },
    {
        category: "Home Air Conditioner",
        model: "AS10",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Washing Machine",
        model: "MS10",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Freezer",
        model: "SD-2",
        brand: "HAIER",
        description: "chest freezer"
    },
    {
        category: "Freezer",
        model: "SC-2",
        brand: "HAIER",
        description: "Beverage cooler"
    },
    {
        category: "Refrigerator",
        model: "H000",
        brand: "AQUA",
        description: "Single-door freezer"
    },
    {
        category: "Refrigerator",
        model: "H000",
        brand: "AQUA",
        description: "Single-door top freezer and bottom refrigerator"
    },
    {
        category: "Others",
        model: "9999",
        brand: "AQUA",
        description: "top freezer and bottom refrigerator"
    },
    {
        category: "Home Air Conditioner",
        model: "AS07",
        brand: "AQUA",
        description: "Wall-mounted split AC one by one"
    },
    {
        category: "Drum Washing Machine",
        model: "C8 U",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Washing Machine",
        model: "AHW-",
        brand: "AQUA",
        description: "Free standing washer&dryer electronical DWM"
    },
    {
        category: "Commercial AC",
        model: "1U30",
        brand: "HAIER",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "HAIER",
        description: "32 inch TV"
    },
    {
        category: "Commercial AC",
        model: "AB30",
        brand: "HAIER",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "TV",
        model: "LE39",
        brand: "SANYO",
        description: "39 inch TV"
    },
    {
        category: "TV",
        model: "LE40",
        brand: "SANYO",
        description: "40 inch TV"
    },
    {
        category: "Washing Machine",
        model: "SW-7",
        brand: "SANYO",
        description: "Free standing washer&dryer electronical DWM"
    },
    {
        category: "Others",
        model: "Dumm",
        brand: "HAIER",
        description: "C-MRV outdoor"
    },
    {
        category: "Others",
        model: "Dumm",
        brand: "HAIER",
        description: "C-MRV Cassette indoor"
    },
    {
        category: "Others",
        model: "Dumm",
        brand: "HAIER",
        description: "Fully Automatic WM"
    },
    {
        category: "Others",
        model: "Dumm",
        brand: "HAIER",
        description: "chest freezer"
    },
    {
        category: "Others",
        model: "Dumm",
        brand: "HAIER",
        description: "top freezer and bottom refrigerator"
    },
    {
        category: "TV",
        model: "LE24",
        brand: "SANYO",
        description: "CKD"
    },
    {
        category: "TV",
        model: "LE24",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE43",
        brand: "AQUA",
        description: "CKD"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "Freezer",
        model: "SD-3",
        brand: "HAIER",
        description: "Chest Freezer(small-sized)"
    },
    {
        category: "Refrigerator",
        model: "SR-D",
        brand: "SANYO",
        description: "Single-door semi-conductor refrigerator"
    },
    {
        category: "Refrigerator",
        model: "8315",
        brand: "HAIER",
        description: "Double-door top freezer and bottom refrigerator"
    },
    {
        category: "Freezer",
        model: "SD-2",
        brand: "HAIER",
        description: "Chest Freezer(small-sized)"
    },
    {
        category: "Freezer",
        model: "SD-5",
        brand: "HAIER",
        description: "Commercial chest freezer"
    },
    {
        category: "TV",
        model: "LE55",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE40",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "Freezer",
        model: "BD-1",
        brand: "HAIER",
        description: "Chest Freezer(small-sized)"
    },
    {
        category: "Washing Machine",
        model: "SW-P",
        brand: "SANYO",
        description: "Wash only WM"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "AQUA",
        description: "CKD"
    },
    {
        category: "TV",
        model: "LE42",
        brand: "AQUA",
        description: "CKD"
    },
    {
        category: "TV",
        model: "LE32",
        brand: "SANYO",
        description: "CKD"
    },
    {
        category: "TV",
        model: "LE48",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE24",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "Refrigerator",
        model: "AQR-",
        brand: "AQUA",
        description: "Single-door semi-conductor refrigerator"
    },
    {
        category: "TV",
        model: "LE42",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE43",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE39",
        brand: "SANYO",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE29",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE28",
        brand: "SANYO",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE48",
        brand: "AQUA",
        description: "CKD"
    },
    {
        category: "TV",
        model: "LE42",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE40",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE49",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE40",
        brand: "SANYO",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE22",
        brand: "SANYO",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE22",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "TV",
        model: "LE39",
        brand: "HAIER",
        description: "LCD large screen(>21\")"
    },
    {
        category: "Commercial AC",
        model: "AS07",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Washing Machine",
        model: "AQW-",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Commercial AC",
        model: "FQG-",
        brand: "AQUA",
        description: "CAC accessory attachment"
    },
    {
        category: "Commercial AC",
        model: "AD16",
        brand: "AQUA",
        description: "H-MRV duct-tpye ceiling-concealed indoor"
    },
    {
        category: "Commercial AC",
        model: "HA-M",
        brand: "AQUA",
        description: "CAC accessory attachment"
    },
    {
        category: "Commercial AC",
        model: "AV14",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AV10",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AV18",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AV24",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AD54",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AS28",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Commercial AC",
        model: "AS18",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Freezer",
        model: "BC/B",
        brand: "AQUA",
        description: "Commercial chest freezer"
    },
    {
        category: "Freezer",
        model: "BC/B",
        brand: "AQUA",
        description: "chest freezer"
    },
    {
        category: "Commercial AC",
        model: "AD09",
        brand: "AQUA",
        description: "H-MRV duct-tpye ceiling-concealed indoor"
    },
    {
        category: "Commercial AC",
        model: "AV16",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AV08",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "HZG-",
        brand: "AQUA",
        description: "CAC accessory attachment"
    },
    {
        category: "Commercial AC",
        model: "AV12",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AS12",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Commercial AC",
        model: "AS16",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Commercial AC",
        model: "AS05",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Commercial AC",
        model: "AS24",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Commercial AC",
        model: "AD48",
        brand: "AQUA",
        description: "Fan-coil conmercial air conditioner"
    },
    {
        category: "Commercial AC",
        model: "AV22",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AS09",
        brand: "AQUA",
        description: "H-MRV wall-mounted indoor"
    },
    {
        category: "Refrigerator",
        model: "AQUA",
        brand: "AQUA",
        description: "Double-door top freezer and bottom refrigerator"
    },
    {
        category: "Commercial AC",
        model: "AD24",
        brand: "AQUA",
        description: "H-MRV duct-tpye ceiling-concealed indoor"
    },
    {
        category: "Commercial AC",
        model: "CC04",
        brand: "AQUA",
        description: "CAC chiller"
    },
    {
        category: "Washing Machine",
        model: "AQW-",
        brand: "OTHERS",
        description: "Automatic WM"
    },
    {
        category: "Commercial AC",
        model: "AD12",
        brand: "AQUA",
        description: "H-MRV duct-tpye ceiling-concealed indoor"
    },
    {
        category: "Commercial AC",
        model: "YR-E",
        brand: "AQUA",
        description: "CAC accessory attachment"
    },
    {
        category: "Refrigerator",
        model: "BCD-",
        brand: "AQUA",
        description: "top freezer and bottom refrigerator"
    },
    {
        category: "Refrigerator",
        model: "AQR-",
        brand: "AQUA",
        description: "top freezer and bottom refrigerator"
    },
    {
        category: "Freezer",
        model: "Stik",
        brand: "AQUA",
        description: "others for non stock materials"
    },
    {
        category: "Freezer",
        model: "Ongk",
        brand: "AQUA",
        description: "others for non stock materials"
    },
    {
        category: "Freezer",
        model: "SC-3",
        brand: "AQUA",
        description: "Beverage cooler"
    },
    {
        category: "Freezer",
        model: "SD-1",
        brand: "AQUA",
        description: "Commercial chest freezer"
    },
    {
        category: "Freezer",
        model: "SD-2",
        brand: "AQUA",
        description: "Commercial chest freezer"
    },
    {
        category: "Drum Washing Machine",
        model: "FQD-",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Freezer",
        model: "AL-P",
        brand: "AQUA",
        description: "others for non stock materials"
    },
    {
        category: "Freezer",
        model: "ID C",
        brand: "AQUA",
        description: "others for non stock materials"
    },
    {
        category: "Freezer",
        model: "SD-3",
        brand: "AQUA",
        description: "Commercial chest freezer"
    },
    {
        category: "Drum Washing Machine",
        model: "FQW-",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "TV",
        model: "LE50",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "Washing Machine",
        model: "HWM2",
        brand: "AQUA",
        description: "Automatic WM"
    },
    {
        category: "Commercial AC",
        model: "AU28",
        brand: "AQUA",
        description: "C-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AD28",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AD25",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "PB-9",
        brand: "AQUA",
        description: "CAC one by one(panel)"
    },
    {
        category: "Commercial AC",
        model: "AB60",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AB25",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AB30",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AB20",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "1U20",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "AD40",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AD20",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AD50",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AD35",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AD30",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AD60",
        brand: "AQUA",
        description: "Duct-type CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "1U25",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "1U35",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "AB50",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AB40",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "AB35",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Refrigerator",
        model: "0001",
        brand: "AQUA",
        description: "Double-door top freezer and bottom refrigerator"
    },
    {
        category: "Commercial AC",
        model: "PB-7",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AB09",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AB12",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AB16",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AD30",
        brand: "AQUA",
        description: "Fan-coil conmercial air conditioner"
    },
    {
        category: "Commercial AC",
        model: "AD38",
        brand: "AQUA",
        description: "Fan-coil conmercial air conditioner"
    },
    {
        category: "Commercial AC",
        model: "YR-H",
        brand: "AQUA",
        description: "CAC accessory attachment"
    },
    {
        category: "Commercial AC",
        model: "AB30",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AB48",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "AV20",
        brand: "AQUA",
        description: "H-MRV outdoor"
    },
    {
        category: "Commercial AC",
        model: "AB38",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "P1B-",
        brand: "AQUA",
        description: "H-MRV duct-tpye ceiling-concealed indoor"
    },
    {
        category: "Commercial AC",
        model: "PB-9",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Commercial AC",
        model: "YCZ-",
        brand: "AQUA",
        description: "CAC accessory attachment"
    },
    {
        category: "Commercial AC",
        model: "YR-E",
        brand: "AQUA",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Commercial AC",
        model: "1U40",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "1U50",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "1U60",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "1U30",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Drum Washing Machine",
        model: "TE12",
        brand: "OTHERS",
        description: "Drier ventend DWM"
    },
    {
        category: "TV",
        model: "LE58",
        brand: "AQUA",
        description: "LCD large screen(>21\")"
    },
    {
        category: "Drum Washing Machine",
        model: "WE11",
        brand: "OTHERS",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Washing Machine",
        model: "AQW-",
        brand: "OTHERS",
        description: "Fully Automatic WM"
    },
    {
        category: "Commercial AC",
        model: "CA00",
        brand: "HAIER",
        description: "CAC chiller"
    },
    {
        category: "Freezer",
        model: "FCD-",
        brand: "AQUA",
        description: "chest freezer"
    },
    {
        category: "Drum Washing Machine",
        model: "HDV7",
        brand: "AQUA",
        description: "Drier WM"
    },
    {
        category: "Washing Machine",
        model: "HWM9",
        brand: "OTHERS",
        description: "Fully Automatic WM"
    },


    {
        category: "Commercial AC",
        model: "AAB1",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Drum Washing Machine",
        model: "FQV-7",
        brand: "AQUA",
        description: ""
    },
    {
        category: "TV",
        model: "LE70",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "AD18",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "AB18",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "AB24",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Freezer",
        model: "SD-7",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "1U38",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "1U34",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "AB34",
        brand: "AQUA",
        description: ""
    },
    
    // Penambahan
    {
        category: "Home Air Conditioner",
        model: "R32/",
        brand: "AQUA",
        description: "AC Fix Indoor Unit"
    },
    {
        category: "Commercial AC",
        model: "1U45",
        brand: "AQUA",
        description: ""
    },
    {
        category: "Commercial AC",
        model: "AB45",
        brand: "AQUA",
        description: "H-MRV cassette indoor"
    },
    {
        category: "Drum Washing Machine",
        model: "HW15",
        brand: "AQUA",
        description: "Free standing front-loading electronical DWM"
    },
    {
        category: "Commercial AC",
        model: "1U55",
        brand: "HAIER",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Commercial AC",
        model: "AB55",
        brand: "HAIER",
        description: "Cassette CAC one by one(indoor)"
    },
    {
        category: "Home Air Conditioner",
        model: "AP48",
        brand: "AQUA",
        description: "Cabinet split AC"
    },
    {
        category: "Commercial AC",
        model: "1U48",
        brand: "AQUA",
        description: "CAC one by one(outdoor)"
    },
    {
        category: "Freezer",
        model: "beve",
        brand: "AQUA",
        description: "Beverage cooler"
    },
    {
        category: "TV",
        model: "AQT6",
        brand: "AQUA",
        description: ""
    },
]

export {
    productData
}