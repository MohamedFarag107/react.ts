import { Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SiAddthis } from "react-icons/si";

interface DashBodyProps {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}
function DashBody({ children, title, onClick }: DashBodyProps) {
  const { t } = useTranslation();
  return (
    <>
      <Paper className="container mb-4" elevation={2}>
        <div className="flex justify-between items-center">
          <h1 className="text-primary capitalize text-xl md:text-[2rem] lg:text-[3rem]">{t(title)}</h1>
          <Button
            sx={{ minWidth: 0 }}
            className="w-10 h-10 rounded-none bg-primary text-white hover:bg-white hover:text-primary"
            onClick={onClick}
          >
            <SiAddthis size={18} />
          </Button>
        </div>
      </Paper>
      <Paper className="container py-4" elevation={2}>
        {children}
      </Paper>
    </>
  );
}

export default DashBody;
