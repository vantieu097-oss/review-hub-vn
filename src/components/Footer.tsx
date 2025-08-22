import { Star, Youtube, Instagram, Facebook, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Review Hub VN
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Đánh giá trung thực các sản phẩm công nghệ, giúp bạn đưa ra quyết định mua sắm thông minh. 
              Cập nhật deal tốt nhất và review chi tiết hàng tuần.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liên Kết</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Trang chủ</a></li>
              <li><a href="#products" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Danh mục</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Về tôi</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Smartphone</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Laptop</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Audio</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Gaming</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Review Hub Vietnam. Tất cả quyền được bảo lưu.</p>
          <p className="text-sm mt-2">
            * Links trong website có thể chứa affiliate links. Cảm ơn bạn đã ủng hộ!
          </p>
        </div>
      </div>
    </footer>
  );
};