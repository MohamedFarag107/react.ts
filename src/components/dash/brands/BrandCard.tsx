import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import MainModal from "../../ui/modal/MainModal";
import DeleteWarning from "../../ui/warning/DeleteWarning";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Brand } from "../../../types/brand.type";
import { useDeleteBrandMutation } from "../../../api/brand.api";
import BrandOperations from "./BrandOperations";

export const BrandCardSkeleton = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" className="w-full h-56" />
      <CardContent className="pb-0 flex justify-center items-center">
        <Skeleton variant="text" className="w-1/2 h-8" />
      </CardContent>
      <CardActions className="gap-4">
        <Skeleton variant="text" className="w-1/2 h-12" />
        <Skeleton variant="text" className="w-1/2 h-12" />
      </CardActions>
    </Card>
  );
};

interface BrandCardProps {
  brand: Brand;
}

function BrandCard({ brand }: BrandCardProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [deleteBrand, { isLoading }] = useDeleteBrandMutation();
  const handleDelete = (_id: string) => {
    deleteBrand({ _id })
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
        aria="delete brand"
        open={deleteModal}
      >
        <DeleteWarning
          onNo={() => setDeleteModal(false)}
          onYes={() => handleDelete(brand._id)}
          title={t("brand")}
          isLoading={isLoading}
          subtitle={language === "en" ? brand.name_en : brand.name_ar}
        />
      </MainModal>
      <MainModal aria="edit brand" open={editModal} setOpen={setEditModal}>
        <BrandOperations setOpen={setEditModal} data={brand} />
      </MainModal>
      <Card className="flex flex-col justify-between items-center">
        <div className="w-56 h-56 md:h-60 p-4">
          <Box
            component="img"
            className="w-full h-full object-contain"
            src={brand.image}
          />
        </div>
        <CardContent>
          <Typography>
            {language === "en" ? brand.name_en : brand.name_ar}
          </Typography>
        </CardContent>
        <CardActions className="w-full justify-between mb-2 gap-1 md:gap-4">
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

export default BrandCard;
