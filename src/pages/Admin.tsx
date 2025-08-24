import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  created_at: string;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    affiliate_link: "",
    category: "",
    rating: 5,
    pros: "",
    cons: "",
    is_published: false,
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        toast({
          title: "Không có quyền truy cập",
          description: "Bạn không có quyền truy cập trang admin",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchProducts();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách sản phẩm",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        pros: formData.pros.split(",").map(item => item.trim()).filter(Boolean),
        cons: formData.cons.split(",").map(item => item.trim()).filter(Boolean),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;

        toast({
          title: "Cập nhật thành công",
          description: "Sản phẩm đã được cập nhật",
        });
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;

        toast({
          title: "Thêm thành công",
          description: "Sản phẩm mới đã được thêm",
        });
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        image_url: "",
        affiliate_link: "",
        category: "",
        rating: 5,
        pros: "",
        cons: "",
        is_published: false,
      });
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      image_url: product.image_url || "",
      affiliate_link: product.affiliate_link || "",
      category: product.category || "",
      rating: product.rating || 5,
      pros: product.pros?.join(", ") || "",
      cons: product.cons?.join(", ") || "",
      is_published: product.is_published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Xóa thành công",
        description: "Sản phẩm đã được xóa",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Kiểm tra quyền truy cập...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý sản phẩm</h1>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: "",
                  description: "",
                  image_url: "",
                  affiliate_link: "",
                  category: "",
                  rating: 5,
                  pros: "",
                  cons: "",
                  is_published: false,
                });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm sản phẩm mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Điện tử</SelectItem>
                        <SelectItem value="fashion">Thời trang</SelectItem>
                        <SelectItem value="home">Gia dụng</SelectItem>
                        <SelectItem value="beauty">Làm đẹp</SelectItem>
                        <SelectItem value="sports">Thể thao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL hình ảnh</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="affiliate_link">Link affiliate</Label>
                    <Input
                      id="affiliate_link"
                      value={formData.affiliate_link}
                      onChange={(e) => setFormData({...formData, affiliate_link: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pros">Ưu điểm (ngăn cách bằng dấu phẩy)</Label>
                    <Textarea
                      id="pros"
                      value={formData.pros}
                      onChange={(e) => setFormData({...formData, pros: e.target.value})}
                      placeholder="Ưu điểm 1, Ưu điểm 2, ..."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cons">Nhược điểm (ngăn cách bằng dấu phẩy)</Label>
                    <Textarea
                      id="cons"
                      value={formData.cons}
                      onChange={(e) => setFormData({...formData, cons: e.target.value})}
                      placeholder="Nhược điểm 1, Nhược điểm 2, ..."
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Đánh giá (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="is_published">Xuất bản</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_published"
                        checked={formData.is_published}
                        onCheckedChange={(checked) => setFormData({...formData, is_published: checked})}
                      />
                      <span>{formData.is_published ? "Đã xuất bản" : "Bản nháp"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} variant="premium">
                    {loading ? "Đang lưu..." : editingProduct ? "Cập nhật" : "Thêm sản phẩm"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center text-white">Đang tải...</div>
        ) : (
          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id} className="backdrop-blur-sm bg-background/80 border-white/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {product.name}
                        <Badge variant={product.is_published ? "default" : "secondary"}>
                          {product.is_published ? "Đã xuất bản" : "Bản nháp"}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {product.category} • Đánh giá: {product.rating}/5
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Ưu điểm:</strong>
                      <ul className="list-disc list-inside">
                        {product.pros?.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Nhược điểm:</strong>
                      <ul className="list-disc list-inside">
                        {product.cons?.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {products.length === 0 && (
              <Card className="backdrop-blur-sm bg-background/80 border-white/20">
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">Chưa có sản phẩm nào. Thêm sản phẩm đầu tiên!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;