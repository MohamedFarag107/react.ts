import { useTranslation } from "react-i18next";

interface InternetErrorProps {
  name: string;
}

function InternetError({ name }: InternetErrorProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-primary capitalize">{t(name)}</h1>
      <h2 className="text-danger capitalize">{t('internet_error')}</h2>
    </div>
  );
}

export default InternetError;
