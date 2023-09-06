import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  setJson: (value: any) => void;
};

const ImportJSON: FC<Props> = ({ setJson }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader: any = new FileReader();
    if (e.target.files !== null) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
    }
    fileReader.onload = (e: any) => {
      let value: any = JSON.parse(e.target.result);
      value = value.filter(
        (item: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.save === item.save && t.name === item.name),
      );
      setJson((prevState: any) => {
        if (prevState.length !== 0) {
          value = value.filter((item: any) =>
            prevState.some(
              (prevItem: any) => item.name.toLowerCase() !== prevItem.name.toLowerCase(),
            ),
          );
        }
        return [...prevState, ...value];
      });
    };
  };

  return (
    <Button variant="contained" component="label">
      Upload File
      <input
        draggable="true"
        className="input-file"
        id="file"
        type="file"
        hidden
        onChange={e => handleChange(e)}
      />
    </Button>
  );
};
export default ImportJSON;
