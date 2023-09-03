import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Product } from "../../../types/product.type";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}
function ProductCard({ product }: ProductCardProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <Card>
      <div className="w-full h-60 py-4">
        <img
          src={product.images[0]}
          alt={product.name_en}
          className="w-full h-full object-contain"
        />
      </div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component={Link}
          to={`/dashboard/products/${product._id}`}
          className="line-clamp-2 text-primary no-underline"
        >
          {language === "en" ? product.name_en : product.name_ar}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-3"
          dangerouslySetInnerHTML={{
            __html:
              language === "en"
                ? product.description_en
                : product.description_ar,
          }}
        />
      </CardContent>
      <CardActions className="gap-4">
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="capitalize"
        >
          {t("productCard.edit")}
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          className="capitalize"
        >
          {t("productCard.delete")}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
