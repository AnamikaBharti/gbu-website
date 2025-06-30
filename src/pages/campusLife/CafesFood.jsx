
import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';

// Badge component
const Badge = ({ children, className = '', variant = '', ...props }) => {
  const base =
    'inline-block px-2 py-1 rounded-full text-xs font-semibold';
  const variants = {
    outline: 'border border-orange-600 text-orange-600 bg-white',
    secondary: 'bg-gray-200 text-gray-800',
    default: 'bg-orange-600 text-white',
  };
  return (
    <span
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Dialog components (basic modal)
const DialogContext = React.createContext();

const Dialog = ({ open, onOpenChange, children }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === 'boolean';
  const actualOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  return (
    <DialogContext.Provider value={{ open: actualOpen, setOpen }}>
      {children}
      {actualOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen && setOpen(false)}
        />
      )}
    </DialogContext.Provider>
  );
};

const DialogTrigger = ({ asChild, children }) => {
  const { setOpen } = React.useContext(DialogContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e);
        setOpen && setOpen(true);
      },
    });
  }
  return (
    <button onClick={() => setOpen && setOpen(true)}>
      {children}
    </button>
  );
};

const DialogContent = ({ children, className = '' }) => {
  const { open, setOpen } = React.useContext(DialogContext);
  if (!open) return null;
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center`}
      style={{ pointerEvents: 'none' }}
    >
      <div
        className={`relative z-50 ${className}`}
        style={{ pointerEvents: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={() => setOpen && setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-bold mb-2">{children}</h3>
);

// Input component
const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
    {...props}
  />
));

// Label component
const Label = ({ htmlFor, children, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

// Textarea component
const Textarea = React.forwardRef(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
    {...props}
  />
));

// Carousel components (basic horizontal scroll)
const Carousel = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>{children}</div>
);

const CarouselContent = ({ children }) => (
  <div className="flex overflow-x-auto gap-4 pb-2">{children}</div>
);

const CarouselItem = ({ children, className = '' }) => (
  <div className={`flex-shrink-0 ${className}`}>{children}</div>
);

const CarouselPrevious = () => null;
const CarouselNext = () => null;

import { Coffee } from 'lucide-react';

import { useToast } from '../../hooks/use-toast';

const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyle =
    'px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none';
  const variants = {
    default: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};



const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-lg border bg-white text-black shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);


const CafesFood = () => {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All Cafes');
  const { toast } = useToast();

  const filters = [
    { name: 'All Cafes', icon: '🍽️', color: 'bg-blue-600' },
    { name: 'Tea & Snacks', icon: '☕', color: 'bg-orange-600' },
    { name: 'Multi-Cuisine', icon: '🌍', color: 'bg-green-600' },
    { name: '24x7', icon: '🌙', color: 'bg-purple-600' }
  ];

  const cafes = [
    {
      name: 'Central Cafeteria',
      image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqFcm4Co0at8fuwJLOfejXCfJyC5Fzszeuh63ITaGXsH5LMKbgkGWCwCGcM2bz8BVin_SoKjvW3yubTNbBYqlscXJMa-zKiaT-njdq2rxUZ3oN2u04HN3PjDXklWuIpSV3pWgc1AA=s1360-w1360-h1020-rw',
      location: 'School of Management',
      hours: '7:00 AM - 10:00 PM',
      rating: 4.5,
      reviews: 324,
      description: 'Main dining hall with diverse cuisine options',
      menu: ['North Indian', 'South Indian', 'Chinese', 'Continental', 'Snacks', 'Beverages'],
      specialties: ['Biryani', 'Masala Dosa', 'Pizza', 'Sandwich'],
      priceRange: '₹50 - ₹200',
      tags: ['Popular', 'Multi-Cuisine', 'Veg & Non-Veg'],
      category: 'Multi-Cuisine',
      isOpen: true,
      badges: ['🔥 Popular']
    },
    {
      name: 'Coffee Corner',
      image:  "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npRlvOzQu34RmG3RyFKqqjqtbZIkRAVD5amLo3-gjJcbcv2r5L4CNILl48QiQab_S_KPleLspW7_ok8MlLEiSjlgDp0Ibv_xFSA9VZtwcczvqJwWu_zZoLyEFWmvvceZRsA3T5o=s1360-w1360-h1020-rw",
      location: 'Library Building',
      hours: '8:00 AM - 8:00 PM',
      rating: 4.3,
      reviews: 198,
      description: 'Cozy cafe perfect for study breaks',
      menu: ['Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Cookies', 'Cold Drinks'],
      specialties: ['Cappuccino', 'Croissant', 'Brownies', 'Iced Tea'],
      priceRange: '₹30 - ₹150',
      tags: ['Tea & Snacks', 'Study Friendly'],
      category: 'Tea & Snacks',
      isOpen: true,
      badges: []
    },
    {
      name: 'Garden Bistro',
      image: 'https://hostels.gbu.ac.in/images/student-utilities/shopping-complex.jpeg?w=800&h=600&fit=crop',
      location: 'Shopping Complex',
      hours: '11:00 AM - 11:00 PM',
      rating: 4.7,
      reviews: 267,
      description: 'Outdoor dining with garden ambiance',
      menu: ['Healthy Bowls', 'Salads', 'Grilled Items', 'Fresh Juices', 'Smoothies'],
      specialties: ['Quinoa Bowl', 'Grilled Chicken', 'Fresh Fruit Juice', 'Smoothie Bowl'],
      priceRange: '₹80 - ₹300',
      tags: ['Healthy', 'Outdoor Seating'],
      category: 'Multi-Cuisine',
      isOpen: true,
      badges: ['🆕 New']
    },
    {
      name: 'Night Canteen',
      image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npRlvOzQu34RmG3RyFKqqjqtbZIkRAVD5amLo3-gjJcbcv2r5L4CNILl48QiQab_S_KPleLspW7_ok8MlLEiSjlgDp0Ibv_xFSA9VZtwcczvqJwWu_zZoLyEFWmvvceZRsA3T5o=s1360-w1360-h1020-rw',
      location: 'Hostel Area',
      hours: '9:00 PM - 2:00 AM',
      rating: 4.2,
      reviews: 156,
      description: 'Late night food for students',
      menu: ['Instant Noodles', 'Fried Rice', 'Momos', 'Paratha', 'Tea', 'Energy Drinks'],
      specialties: ['Maggi', 'Chicken Momos', 'Aloo Paratha', 'Cutting Chai'],
      priceRange: '₹25 - ₹120',
      tags: ['24x7', 'Late Night'],
      category: '24x7',
      isOpen: true,
      badges: []
    },
    {
      name: 'Health Hub',
      image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npETELmQ518Af5FHbedwWX7BL39ud9sixFtzP3khBjc7KN2UyscEaf3zwoTlobnfooV3eOcDexpLqs3o6Yp9I6vyP_Dd2ksEeldzd0DS8mldgiUbYf_-a5B4NPvpu4tmVdKi2MC=s1360-w1360-h1020-rw',
      location: 'Street cafe',
      hours: '6:00 AM - 9:00 PM',
      rating: 4.4,
      reviews: 89,
      description: 'Healthy food options for fitness enthusiasts',
      menu: ['Protein Shakes', 'Fruit Bowls', 'Salads', 'Boiled Eggs', 'Energy Bars'],
      specialties: ['Protein Smoothie', 'Avocado Toast', 'Greek Yogurt', 'Green Salad'],
      priceRange: '₹60 - ₹250',
      tags: ['Healthy', 'Protein Rich'],
      category: 'Tea & Snacks',
      isOpen: false,
      badges: []
    }
  ];

  const filteredCafes = selectedFilter === 'All Cafes' 
    ? cafes 
    : cafes.filter(cafe => cafe.category === selectedFilter);

  const handleViewMenu = (cafe) => {
    setSelectedCafe(cafe);
  };

  const handleWriteReview = (cafe) => {
    console.log('Write review for:', cafe.name);
    toast({
      title: "Review Form",
      description: `Opening review form for ${cafe.name}. Share your dining experience!`,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reviewData = {
      cafe: selectedCafe?.name,
      reviewerName: formData.get('reviewerName'),
      email: formData.get('email'),
      rating: formData.get('rating'),
      review: formData.get('review')
    };
    
    console.log('Review submitted:', reviewData);
    
    toast({
      title: "Review Submitted Successfully",
      description: "Thank you for your feedback! Your review will be published after moderation.",
    });
    
    e.target.reset();
  };

  return (
    <section id="cafes-food" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cafes & <span className="text-orange-600">Food Courts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover delicious dining options across campus, from quick snacks to full meals.
          </p>
        </div>

        {/* Filter Carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {filters.map((filter, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedFilter === filter.name ? 'ring-4 ring-orange-500 ring-opacity-50' : ''
                    }`}
                    onClick={() => setSelectedFilter(filter.name)}
                  >
                    <CardContent className="p-4">
                      <div className={`${filter.color} text-white rounded-2xl p-6 text-center shadow-lg`}>
                        <div className="text-3xl mb-2">{filter.icon}</div>
                        <h3 className="font-bold text-sm">{filter.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Campus Food Map */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden shadow-2xl rounded-2xl">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-orange-100 to-yellow-100 h-80">
                <img
                  src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4np7pnwdKl5Fl87sJuaGzwfi4olSss9stG5adqZiLxfFlp95plNniwJ-Ia8wbm2KrpuNURWlgqst57uEnOBhWDbZso0gKxnknsPLOi4wOpO0raglcBP_6mp2HAHeXYGYUMOGK7Cq=s1360-w1360-h1020-rw"
                  alt="Campus Food Map"
                  className="w-full h-full object-cover opacity-80"
                />
                {cafes.map((cafe, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCafe(cafe)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-orange-600 border-4 border-white border-solid rounded-full shadow-lg hover:scale-125 transition-all duration-300 animate-pulse"
                    style={{ 
                      left: `${20 + (index * 15)}%`, 
                      top: `${30 + (index % 2 * 30)}%` 
                    }}
                  >
                    <Coffee className="w-4 h-4 text-white mx-auto" />
                  </button>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Campus Dining Locations</h3>
                  <p className="text-sm opacity-90">Click on markers to explore food options</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cafe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCafes.map((cafe, index) => (
            <Card key={index} className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <Badge className="bg-orange-600">
                      ⭐ {cafe.rating}
                    </Badge>
                    {cafe.isOpen ? (
                      <Badge className="bg-green-600">Open Now</Badge>
                    ) : (
                      <Badge className="bg-red-600">Closed</Badge>
                    )}
                  </div>
                  {cafe.badges.length > 0 && (
                    <div className="absolute top-3 left-3">
                      {cafe.badges.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} className="bg-yellow-500 text-black">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{cafe.name}</h3>
                    <Badge variant="secondary">{cafe.priceRange}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{cafe.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div>📍 {cafe.location}</div>
                    <div>🕒 {cafe.hours}</div>
                    <div>⭐ {cafe.rating}/5.0 ({cafe.reviews} reviews)</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {cafe.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleViewMenu(cafe)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      View Menu
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="border-orange-600 border-[1px] border-solid text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg shadow-md"
                        >
                          Write Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-white">
                        <DialogHeader>
                          <DialogTitle>Write a Review for {cafe.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="reviewerName">Your Name</Label>
                            <Input id="reviewerName" name="reviewerName" placeholder="Enter your name" required />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                          </div>
                          <div>
                            <Label htmlFor="rating">Rating</Label>
                            <select id="rating" name="rating" className="w-full p-2 border rounded-md" required>
                              <option value="">Select rating</option>
                              <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                              <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                              <option value="3">⭐⭐⭐ (3 stars)</option>
                              <option value="2">⭐⭐ (2 stars)</option>
                              <option value="1">⭐ (1 star)</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea id="review" name="review" placeholder="Share your dining experience..." required />
                          </div>
                          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                            Submit Review
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cafe Details Modal */}
        {selectedCafe && (
          <Dialog open={!!selectedCafe} onOpenChange={() => setSelectedCafe(null)}>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>{selectedCafe.name} - Menu & Details</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedCafe.image}
                    alt={selectedCafe.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>📍 {selectedCafe.location}</div>
                      <div>🕒 {selectedCafe.hours}</div>
                      <div>⭐ {selectedCafe.rating}/5.0 ({selectedCafe.reviews} reviews)</div>
                      <div>💰 {selectedCafe.priceRange}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Menu Categories</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {selectedCafe.menu.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <h4 className="font-semibold mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedCafe.specialties.map((specialty, specialtyIndex) => (
                      <Badge key={specialtyIndex} className="bg-orange-600">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Quick Stats */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-2xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div className="text-sm opacity-90">Food Outlets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-sm opacity-90">Menu Items</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">18hrs</div>
                  <div className="text-sm opacity-90">Daily Service</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">4.4⭐</div>
                  <div className="text-sm opacity-90">Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CafesFood;
