import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { Product } from "../../../types/product.type";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MainModal from "../../ui/modal/MainModal";
import { useState } from "react";
import DeleteWarning from "../../ui/warning/DeleteWarning";
import { useDeleteProductMutation } from "../../../api/product.api";
import { toast } from "react-hot-toast";
import ProductOperations from "./ProductOperations";

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleDelete = (id: string) => {
    deleteProduct({ id })
      .unwrap()
      .then(() => {
        setDeleteModal(false);
      })
      .catch((error) => {
        if (error && "data" in error) {
          toast.error(error?.data?.message);
          return;
        }
        toast.error(t("internet_error"));
      });
  };
  return (
    <>
      <MainModal
        setOpen={setDeleteModal}
        aria="delete product"
        open={deleteModal}
      >
        <DeleteWarning
          onNo={() => setDeleteModal(false)}
          onYes={() => handleDelete(product._id)}
          title={t("product")}
          isLoading={isLoading}
          subtitle={language === "en" ? product.name_en : product.name_ar}
        />
      </MainModal>
      <MainModal
        fullScreen
        aria="edit product"
        open={editModal}
        setOpen={setEditModal}
      >
        <ProductOperations setOpen={setEditModal} data={product} />
      </MainModal>
      <Card className="flex flex-col justify-between">
        <div className="w-full h-56 md:h-60 p-4">
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
            className="line-clamp-2 text-xl md:text-2xl text-primary no-underline capitalize"
          >
            {language === "en" ? product.name_en : product.name_ar}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-3 capitalize"
            dangerouslySetInnerHTML={{
              __html:
                language === "en"
                  ? product.description_en
                  : product.description_ar,
            }}
          />
        </CardContent>
        <CardActions className="justify-between mb-2 gap-1 md:gap-4">
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            className="capitalize"
            onClick={() => setEditModal(true)}
          >
            {t("productCard.edit")}
          </Button>
          <Button
            size="small"
            variant="outlined"
            fullWidth
            color="error"
            className="capitalize !m-0"
            onClick={() => setDeleteModal(true)}
          >
            {t("productCard.delete")}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" className="w-full h-60" />
      <CardContent className="pb-0">
        <Skeleton variant="text" className="w-1/2 h-8" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-full" />
      </CardContent>
      <CardActions className="gap-4">
        <Skeleton variant="text" className="w-1/2 h-12" />
        <Skeleton variant="text" className="w-1/2 h-12" />
      </CardActions>
    </Card>
  );
}
