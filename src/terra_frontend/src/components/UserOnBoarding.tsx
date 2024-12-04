import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface UserOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string, acceptedTerms: boolean) => Promise<void>;
}

export const UserOnboardingModal: React.FC<UserOnboardingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [username, setUsername] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(username, acceptedTerms);
      onClose();
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        Complete Your Profile
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              sx={{
                color: 'primary.main',
                '&.Mui-checked': { color: 'secondary.main' },
              }}
            />
          }
          label="I accept the Terms and Conditions"
          sx={{ color: 'text.primary' }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          sx={{
            width: '80%',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Complete Profile'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserOnboardingModal;
