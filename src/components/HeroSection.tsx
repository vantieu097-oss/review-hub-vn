import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Users, Award } from "lucide-react";

export const HeroSection = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Review Hub
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-glow">
              Vietnam
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Đánh giá chi tiết và trung thực về các sản phẩm công nghệ, điện tử, và lifestyle. 
            Giúp bạn đưa ra quyết định mua sắm thông minh.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="font-bold text-lg">500+</div>
                <div className="text-sm text-white/80">Sản phẩm đã review</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="font-bold text-lg">50K+</div>
                <div className="text-sm text-white/80">Người theo dõi</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="w-6 h-6 text-green-400" />
              <div>
                <div className="font-bold text-lg">3+</div>
                <div className="text-sm text-white/80">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            variant="gradient" 
            size="lg" 
            onClick={scrollToProducts}
            className="text-lg px-8 py-4 h-auto mb-12"
          >
            Khám Phá Reviews
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </Button>
          
          {/* Trust indicators */}
          <div className="text-sm text-white/70">
            ✓ Review trung thực và khách quan | ✓ Cập nhật hàng tuần | ✓ Deal tốt nhất thị trường
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};