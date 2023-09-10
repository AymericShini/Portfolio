import { Dna } from 'react-loader-spinner';

export default function DNALoader() {
  return (
    <Dna
      visible
      height="140"
      width="140"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}
