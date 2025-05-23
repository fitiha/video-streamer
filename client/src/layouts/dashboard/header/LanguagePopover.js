import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';


// Language options
const LANGS = [
  {
    value: 'en',
    label: 'english',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  // {
  //   value: 'de',
  //   label: 'German',
  //   icon: '/assets/icons/ic_flag_de.svg',
  // },
  // {
  //   value: 'fr',
  //   label: 'French',
  //   icon: '/assets/icons/ic_flag_fr.svg',
  // },
  {
    value: 'am',
    label: 'amharic',
    icon: '/assets/icons/ethiopia-flag-icon(2).svg', // <- Add Amharic flag icon (Ethiopia)
  },
];

export default function LanguagePopover() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(null);
  const currentLang = LANGS.find((lang) => lang.value === i18n.language) || LANGS[0];
  const {t} = useTranslation();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLanguage = (lang) => {
    console.log('Language changed to:', lang);
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 30,
          height: 30,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={currentLang.icon} alt={currentLang.label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => handleChangeLanguage(option.value)}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {t(option.label)}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
