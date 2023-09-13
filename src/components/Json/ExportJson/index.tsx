import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  jsonFile: Record<string, any>[];
};

const ExportJson: FC<Props> = ({ jsonFile }) => {
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(jsonFile),
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'jsonFile.json';
    link.click();
  };

  return (
    <Button variant="outlined" component="label" onClick={exportData}>
      Export Json
    </Button>
  );
};
export default ExportJson;
