import { Typography } from '@mui/material';

export default function GoodsName({ shortName }: { shortName: string }) {
  return (
    <Typography
      sx={{
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '28px',
      }}
    >
      {shortName}
    </Typography>
  );
}
