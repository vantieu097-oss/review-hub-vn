import { ProductCard } from "./ProductCard";
import headphonesImage from "@/assets/headphones.jpg";
import smartphoneImage from "@/assets/smartphone.jpg";
import laptopImage from "@/assets/laptop.jpg";
import smartwatchImage from "@/assets/smartwatch.jpg";

const sampleProducts = [
  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Tai nghe chống ồn hàng đầu với chất lượng âm thanh tuyệt vời, pin 30 giờ và thiết kế thoải mái. Phù hợp cho công việc và giải trí.",
    rating: 4.8,
    price: "7.990.000₫",
    originalPrice: "8.990.000₫",
    image: headphonesImage,
    affiliateLink: "https://example.com/headphones",
    category: "Audio"
  },
  {
    title: "iPhone 15 Pro Max 256GB",
    description: "Smartphone cao cấp với chip A17 Pro, camera 48MP, titanium design. Màn hình 6.7 inch Super Retina XDR với Dynamic Island.",
    rating: 4.7,
    price: "34.990.000₫",
    originalPrice: "36.990.000₫",
    image: smartphoneImage,
    affiliateLink: "https://example.com/iphone",
    category: "Smartphone"
  },
  {
    title: "MacBook Pro M3 14 inch",
    description: "Laptop mạnh mẽ với chip M3, 16GB RAM, 512GB SSD. Màn hình Liquid Retina XDR 14 inch, pin 18 giờ. Hoàn hảo cho creative work.",
    rating: 4.9,
    price: "52.990.000₫",
    originalPrice: "54.990.000₫", 
    image: laptopImage,
    affiliateLink: "https://example.com/macbook",
    category: "Laptop"
  },
  {
    title: "Apple Watch Series 9 GPS 45mm",
    description: "Smartwatch thông minh với chip S9, màn hình Always-On Retina, theo dõi sức khỏe toàn diện và tính năng Double Tap mới.",
    rating: 4.6,
    price: "10.990.000₫",
    originalPrice: "11.990.000₫",
    image: smartwatchImage,
    affiliateLink: "https://example.com/applewatch",
    category: "Smartwatch"
  }
];

export const ProductGrid = () => {
  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Sản Phẩm Đã Review
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những sản phẩm tôi đã trải nghiệm và đánh giá chi tiết. 
            Mỗi review đều trung thực và khách quan nhất.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Đây chỉ là một số sản phẩm mẫu. Website thực tế sẽ có đầy đủ reviews!
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Audio</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Smartphone</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Laptop</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Smartwatch</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Gaming</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Lifestyle</span>
          </div>
        </div>
      </div>
    </section>
  );
};