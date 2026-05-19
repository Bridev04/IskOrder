restaurants = [
    {
        "id": "econ-lounge",
        "name": "The Food Nook - Econ Lounge",
        "category": "Coffee / Drinks",
        "description": "Cafe drinks, fruit shakes, lemonade, and student-friendly sips from the Food Nook.",
        "image": "/images/econlounge.jpg",
        "headerImage": "/images/stores/food-nook-header.jpg",
        "fallbackImage": "/images/econlounge.jpg",
        "location": "Econ Lounge, UP Diliman",
        "service_types": ["pickup"],
        "status": "Open now",
        "availability": "Available today",
        "wait_time": "8-12 min",
        "menu": [
            {"id": "econ-brewed-coffee", "name": "Brewed coffee", "description": "Fresh brewed coffee.", "price": 95, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-cafe-americano", "name": "Cafe americano", "description": "Espresso with hot water.", "price": 95, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-coffee-latte", "name": "Coffee latte", "description": "Coffee with steamed milk.", "price": 95, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-cappuccino", "name": "Cappuccino", "description": "Espresso, milk, and foam.", "price": 95, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-macchiato", "name": "Macchiato", "description": "Espresso marked with milk.", "price": 95, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-spanish-latte", "name": "Spanish latte", "description": "Sweet creamy latte.", "price": 110, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-taro-latte", "name": "Taro latte", "description": "Creamy taro latte.", "price": 125, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-frappe", "name": "Frappe", "description": "Choice of vanilla, mocha, salted caramel, hazelnut, or oreo.", "price": 125, "category": "Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-chocolate-drink", "name": "Chocolate drink", "description": "Chocolate drink served cafe-style.", "price": 50, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-fruit-shake-single", "name": "Fruit shake - single", "description": "Single fruit shake.", "price": 75, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-fruit-shake-combo", "name": "Fruit shake - combination", "description": "Combination fruit shake.", "price": 90, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-lemonade", "name": "Lemonade", "description": "Cold lemonade.", "price": 75, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-strawberry-lemonade", "name": "Strawberry lemonade", "description": "Lemonade with strawberry.", "price": 90, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-strawberry-milk", "name": "Strawberry milk", "description": "Sweet strawberry milk.", "price": 110, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-matcha-latte", "name": "Matcha latte", "description": "Matcha latte with milk.", "price": 110, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
            {"id": "econ-coconut-tablea", "name": "Coconut tablea", "description": "Coconut tablea drink.", "price": 115, "category": "Non-Coffee", "image": "/images/econlounge.jpg", "availability": "Available now"},
        ],
        "recommended_orders": [
            {
                "id": "econ-coffee-break",
                "name": "Coffee Break",
                "description": "Coffee latte with strawberry lemonade for a quick campus drink run.",
                "items": [
                    {"menu_item_id": "econ-coffee-latte", "quantity": 1},
                    {"menu_item_id": "econ-strawberry-lemonade", "quantity": 1},
                ],
            },
            {
                "id": "econ-non-coffee-set",
                "name": "Non-Coffee Pair",
                "description": "Matcha latte and chocolate drink.",
                "items": [
                    {"menu_item_id": "econ-matcha-latte", "quantity": 1},
                    {"menu_item_id": "econ-chocolate-drink", "quantity": 1},
                ],
            },
        ],
    },
    {
        "id": "chicken-city",
        "name": "Chicken City - Area 2",
        "category": "Chicken / Rice Meals",
        "description": "Boneless fried chicken rice meals, nuggets, poppers, and shareable boxes in Area 2.",
        "image": "/images/chickencity.jpg",
        "headerImage": "/images/stores/chicken-city-header.jpg",
        "fallbackImage": "/images/chickencity.jpg",
        "location": "Area 2, UP Diliman",
        "service_types": ["pickup"],
        "status": "Open now",
        "availability": "Available today",
        "wait_time": "12-18 min",
        "menu": [
            {"id": "cc-daegu", "name": "Daegu", "description": "3 pcs boneless fried chicken with rice.", "price": 99, "category": "Rice Meals", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-chicken-steak-xl", "name": "Chicken Steak XL", "description": "Extra large boneless fried chicken with rice.", "price": 130, "category": "Rice Meals", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-chicken-poppers", "name": "Chicken Poppers", "description": "Bite-sized pieces of chicken with rice.", "price": 50, "category": "Rice Meals", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-chicken-nuggets", "name": "Chicken Nuggets", "description": "4 pcs chicken nuggets with rice.", "price": 50, "category": "Rice Meals", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-cheezy-chicken", "name": "Cheezy Chicken", "description": "Cheese-filled chicken fillet with rice.", "price": 69, "category": "Rice Meals", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-student-meals", "name": "Student meals", "description": "Budget student meal.", "price": 50, "category": "Student Meals", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-bucket-poppers-small", "name": "Bucket of Poppers - Small", "description": "Small bucket of chicken poppers.", "price": 80, "category": "For Sharing", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-bucket-poppers-large", "name": "Bucket of Poppers - Large", "description": "Large bucket of chicken poppers.", "price": 150, "category": "For Sharing", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-box-nuggets-12", "name": "Box of Nuggets - 12 pcs", "description": "12 pcs chicken nuggets.", "price": 150, "category": "For Sharing", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-box-nuggets-24", "name": "Box of Nuggets - 24 pcs", "description": "24 pcs chicken nuggets.", "price": 300, "category": "For Sharing", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-box-busan", "name": "Box of Chicken - Busan", "description": "8-9 pcs boneless fried chicken.", "price": 249, "category": "For Sharing", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-box-seoul", "name": "Box of Chicken - Seoul", "description": "15 pcs boneless fried chicken.", "price": 399, "category": "For Sharing", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-hashbrown", "name": "Hashbrown", "description": "Crispy hashbrown add-on.", "price": 30, "category": "Add-ons", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-chicken-skin", "name": "Chicken Skin", "description": "Crispy chicken skin add-on.", "price": 50, "category": "Add-ons", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-bottled-water", "name": "Bottled Water", "description": "Price not shown by kiosk.", "price": 0, "category": "Add-ons", "image": "/images/chickencity.jpg", "availability": "Ask kiosk"},
            {"id": "cc-softdrinks", "name": "Softdrinks", "description": "Price not shown by kiosk.", "price": 0, "category": "Add-ons", "image": "/images/chickencity.jpg", "availability": "Ask kiosk"},
            {"id": "cc-extra-rice", "name": "Extra Rice", "description": "Extra rice add-on.", "price": 15, "category": "Add-ons", "image": "/images/chickencity.jpg", "availability": "Available now"},
            {"id": "cc-flavors", "name": "Flavor choices", "description": "Original, CC Secret Sauce, Salted Egg, Spicy Salted Egg, Honey Butter, Garlic Parmesan, Soy Garlic, Buffalo City, Cheesy Cheese, Teriyaki, BBQ, Sweet Chili, Snow Cheese, Chili Cheese, Honey Garlic, or Sisig Sauce.", "price": 0, "category": "Flavors", "image": "/images/chickencity.jpg", "availability": "Available now"},
        ],
        "recommended_orders": [
            {
                "id": "cc-area-2-lunch",
                "name": "Area 2 Lunch",
                "description": "Daegu, hashbrown, and extra rice.",
                "items": [
                    {"menu_item_id": "cc-daegu", "quantity": 1},
                    {"menu_item_id": "cc-hashbrown", "quantity": 1},
                    {"menu_item_id": "cc-extra-rice", "quantity": 1},
                ],
            },
            {
                "id": "cc-share-box",
                "name": "Chicken City Share Box",
                "description": "Busan box with a large bucket of poppers.",
                "items": [
                    {"menu_item_id": "cc-box-busan", "quantity": 1},
                    {"menu_item_id": "cc-bucket-poppers-large", "quantity": 1},
                ],
            },
        ],
    },
    {
        "id": "tess-store",
        "name": "Tess' Store",
        "category": "Combo Meals / Snacks",
        "description": "Pancit canton combos, street food, sandwiches, rice meals, and drinks from Tess' Store.",
        "image": "/images/tess-store.jpg",
        "headerImage": "/images/stores/tess-store-header.jpg",
        "fallbackImage": "/images/tess-store.jpg",
        "location": "UP Diliman kiosk",
        "service_types": ["pickup"],
        "status": "Open now",
        "availability": "Available today",
        "wait_time": "10-15 min",
        "menu": [
            {"id": "tess-combo-1", "name": "Combo 1", "description": "Pancit canton, 8 pcs cheese stick, juice.", "price": 73, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-2", "name": "Combo 2", "description": "Pancit canton, 4 pcs squid balls, juice.", "price": 73, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-3", "name": "Combo 3", "description": "Pancit canton, 3 pcs dynamite, juice.", "price": 82, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-4", "name": "Combo 4", "description": "Pancit canton, pandesal, boiled egg, juice.", "price": 73, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-5", "name": "Combo 5", "description": "Pancit canton, egg sandwich, juice.", "price": 78, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-6", "name": "Combo 6", "description": "Pancit canton, 4 pcs siomai, Smart C.", "price": 113, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-7", "name": "Combo 7", "description": "Pancit canton, 7 pcs kikiam, juice.", "price": 73, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-8", "name": "Combo 8", "description": "Pancit canton, hotdog on stick, 4 pcs kwek-kwek, juice.", "price": 103, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-9", "name": "Combo 9", "description": "Pancit canton, burger, juice.", "price": 83, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-10", "name": "Combo 10", "description": "Pancit canton, burger with cheese, juice.", "price": 88, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-11", "name": "Combo 11", "description": "Pancit canton, 4 pcs fish balls, 4 pcs squid balls.", "price": 83, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-12", "name": "Combo 12", "description": "Pancit canton, cheeseburger, 4 pcs kwek-kwek.", "price": 103, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-13", "name": "Combo 13", "description": "Pancit canton, hotdog on stick, juice.", "price": 73, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-14", "name": "Combo 14", "description": "Pancit canton, hotdog sandwich, juice.", "price": 88, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-15", "name": "Combo 15", "description": "Pancit canton, boiled egg, pandesal with peanut butter.", "price": 63, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-16", "name": "Combo 16", "description": "Pancit canton, pandesal, coffee.", "price": 63, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-17", "name": "Combo 17", "description": "Pancit canton, 4 pcs siomai, juice.", "price": 83, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-18", "name": "Combo 18", "description": "Pancit canton, 8 pcs cheese sticks, C2 Big.", "price": 103, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-19", "name": "Combo 19", "description": "Pancit canton, 4 pcs kwek-kwek, 4 pcs fish balls, juice.", "price": 103, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-20", "name": "Combo 20", "description": "Pancit canton, 4 pcs dynamite, 4 pcs squid balls, juice.", "price": 108, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-21", "name": "Combo 21", "description": "Pancit canton, 4 pcs chicken ball, Mountain Dew.", "price": 80, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-22", "name": "Combo 22", "description": "Pancit canton, pandesal, juice.", "price": 58, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-23", "name": "Combo 23", "description": "Pancit canton, boiled egg, juice.", "price": 63, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-24", "name": "Combo 24", "description": "Bun, juice.", "price": 58, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-25", "name": "Combo 25", "description": "Pancit canton, 4 pcs fish balls, Mountain Dew.", "price": 83, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-26", "name": "Combo 26", "description": "Pancit canton, 7 pcs kikiam, C2 Big.", "price": 103, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-27", "name": "Combo 27", "description": "Pancit canton, 4 pcs kwek-kwek, juice.", "price": 78, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-28", "name": "Combo 28", "description": "Pancit canton, 4 pcs siomai, 4 pcs kwek-kwek, juice.", "price": 113, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-29", "name": "Combo 29", "description": "Pancit canton, 4 pcs chicken balls, 4 pcs kwek-kwek, 4 pcs fish balls, juice.", "price": 128, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-combo-30", "name": "Combo 30", "description": "Pancit canton, 4 pcs squid balls, 4 pcs chicken balls, 7 pcs kikiam.", "price": 108, "category": "Combo Meals", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-kwek-kwek", "name": "Kwek-kwek (4 pcs)", "description": "4 pcs kwek-kwek.", "price": 30, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-fish-ball", "name": "Fish ball (15 pcs)", "description": "15 pcs fish balls.", "price": 25, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-squid-ball", "name": "Squid ball (4 pcs)", "description": "4 pcs squid balls.", "price": 25, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-chicken-ball", "name": "Chicken ball (4 pcs)", "description": "4 pcs chicken balls.", "price": 25, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-kikiam", "name": "Kikiam (7 pcs)", "description": "7 pcs kikiam.", "price": 25, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-hotdog-stick-snack", "name": "Hotdog on stick", "description": "Hotdog on stick snack.", "price": 25, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-cheese-stick", "name": "Cheese stick (8 pcs)", "description": "8 pcs cheese sticks.", "price": 25, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-tokwa", "name": "Tokwa (4 pcs)", "description": "4 pcs tokwa.", "price": 20, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-siomai", "name": "Siomai (4 pcs, steamed/fried)", "description": "4 pcs siomai, steamed or fried.", "price": 35, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-dynamite", "name": "Dynamite (3 pcs)", "description": "3 pcs dynamite.", "price": 35, "category": "Street Food / Snacks", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-tonkatsu-rice", "name": "Tonkatsu with rice", "description": "Tonkatsu served with rice.", "price": 70, "category": "Rice Meals and Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-hungarian-rice", "name": "Hungarian with rice", "description": "Hungarian sausage with rice.", "price": 70, "category": "Rice Meals and Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-chicken-fillet-rice", "name": "Chicken fillet with rice", "description": "Chicken fillet served with rice.", "price": 70, "category": "Rice Meals and Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-hotdog-stick-sandwich", "name": "Hotdog on stick", "description": "Hotdog on stick.", "price": 20, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-hotdog-sandwich", "name": "Hotdog sandwich", "description": "Hotdog sandwich.", "price": 35, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-burger", "name": "Burger", "description": "Burger.", "price": 30, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-burger-cheese", "name": "Burger with cheese", "description": "Burger with cheese.", "price": 60, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-egg-sandwich", "name": "Egg sandwich", "description": "Egg sandwich.", "price": 35, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-egg-sandwich-cheese", "name": "Egg sandwich with cheese", "description": "Egg sandwich with cheese.", "price": 45, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-peanut-butter-sandwich", "name": "Peanut butter sandwich", "description": "Peanut butter sandwich.", "price": 15, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-cheese-sandwich", "name": "Cheese sandwich", "description": "Cheese sandwich.", "price": 15, "category": "Sandwiches / Burgers", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-water", "name": "Water", "description": "Bottled water.", "price": 35, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-coffee", "name": "Coffee", "description": "Coffee.", "price": 35, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-smart-c", "name": "Smart C", "description": "Smart C drink.", "price": 45, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-c2-small", "name": "C2 Small", "description": "C2 small.", "price": 45, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-c2-big", "name": "C2 Big", "description": "C2 big.", "price": 70, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-mountain-dew", "name": "Mountain Dew", "description": "Mountain Dew.", "price": 25, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-popple-apple-soda", "name": "Popple Apple Soda", "description": "Popple Apple Soda.", "price": 45, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-pocari-sweat", "name": "Pocari Sweat", "description": "Pocari Sweat.", "price": 65, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
            {"id": "tess-gatorade", "name": "Gatorade", "description": "Gatorade.", "price": 65, "category": "Drinks / Extras", "image": "/images/tess-store.jpg", "availability": "Available now"},
        ],
        "recommended_orders": [
            {
                "id": "tess-combo-snack",
                "name": "Combo 8 Snack",
                "description": "Pancit canton, hotdog on stick, kwek-kwek, and juice.",
                "items": [{"menu_item_id": "tess-combo-8", "quantity": 1}],
            },
            {
                "id": "tess-street-food-set",
                "name": "Street Food Set",
                "description": "Kwek-kwek, fish ball, siomai, and Mountain Dew.",
                "items": [
                    {"menu_item_id": "tess-kwek-kwek", "quantity": 1},
                    {"menu_item_id": "tess-fish-ball", "quantity": 1},
                    {"menu_item_id": "tess-siomai", "quantity": 1},
                    {"menu_item_id": "tess-mountain-dew", "quantity": 1},
                ],
            },
        ],
    },
]


FALLBACK_MENU_IMAGES_BY_CATEGORY = {
    "Coffee": "/images/menu/coffee.png",
    "Non-Coffee": "/images/menu/non-coffee-drink.png",
    "Rice Meals": "/images/menu/chicken-rice.png",
    "Student Meals": "/images/menu/chicken-rice.png",
    "For Sharing": "/images/menu/chicken-share-box.png",
    "Add-ons": "/images/menu/addons.png",
    "Flavors": "/images/menu/sauces.png",
    "Combo Meals": "/images/menu/pancit-combo.png",
    "Street Food / Snacks": "/images/menu/street-food.png",
    "Rice Meals and Extras": "/images/menu/rice-meal.png",
    "Sandwiches / Burgers": "/images/menu/sandwich-burger.png",
    "Drinks / Extras": "/images/menu/bottled-drinks.png",
}

FALLBACK_MENU_IMAGES_BY_ITEM_KEYWORD = {
    "poppers": "/images/menu/chicken-poppers.png",
    "nuggets": "/images/menu/chicken-poppers.png",
    "softdrinks": "/images/menu/bottled-drinks.png",
    "water": "/images/menu/bottled-drinks.png",
    "coffee": "/images/menu/coffee.png",
    "lemonade": "/images/menu/non-coffee-drink.png",
    "shake": "/images/menu/non-coffee-drink.png",
}

MENU_IMAGE_OVERRIDES_BY_ITEM_ID = {
    "econ-brewed-coffee": "/images/food/food-nook/brewed-coffee.jpg",
    "econ-cafe-americano": "/images/food/food-nook/cafe-americano.jpg",
    "econ-coffee-latte": "/images/food/food-nook/coffee-latte.webp",
    "econ-cappuccino": "/images/food/food-nook/cappuccino.png",
    "econ-macchiato": "/images/food/food-nook/macchiato.webp",
    "econ-spanish-latte": "/images/food/food-nook/spanish-latte.jpg",
    "econ-taro-latte": "/images/food/food-nook/taro-latte.webp",
    "econ-frappe": "/images/food/food-nook/frappe.jpg",
    "econ-chocolate-drink": "/images/food/food-nook/chocolate-drink.webp",
    "econ-fruit-shake-single": "/images/food/food-nook/fruit-shake-single.jpg",
    "econ-fruit-shake-combo": "/images/food/food-nook/fruit-shake-combo.jpg",
    "econ-lemonade": "/images/food/food-nook/lemonade.webp",
    "econ-strawberry-lemonade": "/images/food/food-nook/strawberry-lemonade.jpg",
    "econ-strawberry-milk": "/images/food/food-nook/strawberry-milk.jpg",
    "econ-matcha-latte": "/images/food/food-nook/matcha-latte.jpg",
    "econ-coconut-tablea": "/images/food/food-nook/coconut-tablea.jpg",
    "cc-daegu": "/images/food/chicken-city/daegu.jpg",
    "cc-chicken-steak-xl": "/images/food/chicken-city/chicken-steak-xl.jpg",
    "cc-chicken-poppers": "/images/food/chicken-city/chicken-poppers.jpg",
    "cc-chicken-nuggets": "/images/food/chicken-city/chicken-nuggets.jpg",
    "cc-cheezy-chicken": "/images/food/chicken-city/cheezy-chicken.jpg",
    "cc-bucket-poppers-small": "/images/food/chicken-city/bucket-poppers-small.jpg",
    "cc-bucket-poppers-large": "/images/food/chicken-city/bucket-poppers-large.jpg",
    "cc-box-nuggets-12": "/images/food/chicken-city/box-nuggets-12.jpg",
    "cc-box-nuggets-24": "/images/food/chicken-city/box-nuggets-24.jpg",
    "cc-hashbrown": "/images/food/chicken-city/hashbrown.jpg",
    "cc-chicken-skin": "/images/food/chicken-city/chicken-skin.jpg",
}

FOOD_IMAGE_DIRS_BY_RESTAURANT = {
    "econ-lounge": "/images/food/food-nook",
    "chicken-city": "/images/food/chicken-city",
    "tess-store": "/images/food/tess-store",
}

MENU_ID_PREFIXES_BY_RESTAURANT = {
    "econ-lounge": "econ-",
    "chicken-city": "cc-",
    "tess-store": "tess-",
}


def _menu_image_path(restaurant_id: str, item_id: str):
    image_dir = FOOD_IMAGE_DIRS_BY_RESTAURANT.get(restaurant_id)
    if not image_dir:
        return None

    item_slug = item_id.removeprefix(MENU_ID_PREFIXES_BY_RESTAURANT.get(restaurant_id, ""))
    return f"{image_dir}/{item_slug}.png"


def _apply_menu_images():
    for restaurant in restaurants:
        for item in restaurant["menu"]:
            item_name = item["name"].lower()
            item["fallbackImage"] = next(
                (
                    image
                    for keyword, image in FALLBACK_MENU_IMAGES_BY_ITEM_KEYWORD.items()
                    if keyword in item_name
                ),
                FALLBACK_MENU_IMAGES_BY_CATEGORY.get(item["category"], restaurant["image"]),
            )
            item["image"] = (
                MENU_IMAGE_OVERRIDES_BY_ITEM_ID.get(item["id"])
                or _menu_image_path(restaurant["id"], item["id"])
                or item["fallbackImage"]
            )


_apply_menu_images()


def get_restaurant(restaurant_id: str):
    return next((restaurant for restaurant in restaurants if restaurant["id"] == restaurant_id), None)
