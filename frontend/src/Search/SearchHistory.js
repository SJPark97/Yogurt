import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import './SearchHistory.css';

function SearchHistory({ content }) {
  return (
    <Box
      sx={{
        marginBottom: '8px',
        margin: '16px',
        display: 'grid',
        gridTemplateColumns: '7fr 1fr',
        height: '100%',
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="p" component="div" sx={{ textAlign: 'start' }}>
        {content}
      </Typography>
      <IconButton
        size="medium"
        color="inherit"
        aria-label="alarm-close"
        onClick={() => console.log('삭제하기!')}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default SearchHistory;
