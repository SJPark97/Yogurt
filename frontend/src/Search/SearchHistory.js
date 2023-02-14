import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './SearchHistory.css';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './SearchHistory.css';
function SearchHistory({ searchData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/stores/${searchData.id}`);
  };

  return (
    <Box
      sx={{
        marginBottom: '8px',
        margin: '16px',
        display: 'flex',
        height: '100%',
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        fontSize: '1rem',
        paddingY: '8px',
      }}
    >
      <SearchIcon
        sx={{
          color: 'gray',
        }}
      />
      <Typography
        variant="p"
        component="div"
        role="presentation"
        sx={{ textAlign: 'start', marginLeft: '1rem' }}
        onClick={handleClick}
      >
        {searchData.nickName}
      </Typography>
    </Box>
  );
}

export default SearchHistory;
