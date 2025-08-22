import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  rating: number;
  price: string;
  originalPrice?: string;
  image: string;
  affiliateLink: string;
  category: string;
}

export const ProductCard = ({
  title,
  description,
  rating,
  price,
  originalPrice,
  image,
  affiliateLink,
  category,
}: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-product hover:scale-[1.02] bg-gradient-card border-border/50">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="rating" className="gap-1">
            <Star className="w-3 h-3 fill-current" />
            {rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center gap-1 mb-3">
          {renderStars(rating)}
          <span className="text-sm text-muted-foreground ml-2">
            ({rating.toFixed(1)}/5.0)
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="affiliate" 
          className="w-full"
          onClick={() => window.open(affiliateLink, '_blank')}
        >
          Xem Deal Ngay
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};