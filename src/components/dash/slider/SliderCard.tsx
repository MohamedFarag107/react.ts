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
import { Slider } from "../../../types/slider.type";
import { useDeleteSliderMutation } from "../../../api/slider.api";
import SliderOperations from "./SliderOperations";

export const SliderCardSkeleton = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" className="w-full h-56" />

      <CardActions className="gap-4">
        <Skeleton variant="text" className="w-1/4 h-12" />
        <Skeleton variant="text" className="w-1/4 h-12" />
      </CardActions>
    </Card>
  );
};

interface SliderCardProps {
  slider: Slider;
}

function BrandCard({ slider }: SliderCardProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { t } = useTranslation();
  const [deleteSlider, { isLoading }] = useDeleteSliderMutation();
  const handleDelete = (_id: string) => {
    deleteSlider({ _id })
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
        aria="delete slider"
        open={deleteModal}
      >
        <DeleteWarning
          onNo={() => setDeleteModal(false)}
          onYes={() => handleDelete(slider._id)}
          title={t("slider")}
          isLoading={isLoading}
          subtitle={t("slider")}
        />
      </MainModal>
      <MainModal aria="edit brand" open={editModal} setOpen={setEditModal}>
        <SliderOperations setOpen={setEditModal} data={slider} />
      </MainModal>
      <Card className="flex flex-col justify-between items-center">
        <div className="w-full h-56 md:h-60">
          <Box
            component="img"
            className="w-full h-full object-cover"
            src={slider.image}
          />
        </div>

        <CardActions className="w-full justify-items-start gap-1 md:gap-4">
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            className="capitalize w-1/4"
            onClick={() => setEditModal(true)}
          >
            {t("productCard.edit")}
          </Button>
          <Button
            size="small"
            variant="outlined"
            fullWidth
            color="error"
            className="capitalize w-1/4 !m-0"
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
