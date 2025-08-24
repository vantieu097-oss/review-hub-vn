import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  affiliate_link: string;
  category: string;
  rating: number;
  pros: string[];
  cons: string[];
  is_published: boolean;
}

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">Đang tải sản phẩm...</div>
        </div>
      </section>
    );
  }
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
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                title={product.name}
                description={product.description || ""}
                image={product.image_url || "/placeholder.svg"}
                rating={product.rating || 0}
                price="" // Not used in current design
                originalPrice="" // Not used in current design
                affiliateLink={product.affiliate_link || "#"}
                category={product.category || ""}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Chưa có sản phẩm nào được xuất bản.</p>
          </div>
        )}
        
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