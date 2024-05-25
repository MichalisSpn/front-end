import React, { useEffect, useState } from "react";

import {
  Alert, Button, CircularProgress,
  Container, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  FormControl, IconButton, InputLabel,
  List, ListItem, ListItemText,
  MenuItem, Select, Stack,
  TextField, Typography,
} from '@mui/material';
import { Add, Edit, Delete, ToggleOff, } from '@mui/icons-material';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const getDummyRepairs = () => {
  return [
    { id: 1, name: 'Repair 1', status: 'Pending', description: '', repairDate: '', propertyId: 1 },
    { id: 2, name: 'Repair 2', status: 'Completed', description: '', repairDate: '', propertyId: 1  },
    { id: 3, name: 'Repair 3', status: 'IN PROGRESS', description: '', repairDate: '', propertyId: 1  },
    { id: 4, name: 'Repair 4', status: 'PENDING', description: '', repairDate: '', propertyId: 1  },
  ];
};

const getDummyProperties = () => {
  return [
    {id : 1, name: 'Property 1'},
    {id : 2, name: 'Property 2'},
    {id : 3, name: 'Property 3'},
  ]
}

const Repair = () => {
  const [repairs, setRepairs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [newRepair, setNewRepair] = useState({
    name: '',
    status: '',
    description: '',
    repairDate: null,
    propertyId: ''  
  });
  console.log("asdad")



  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const repairData = getDummyRepairs();
        const propertyData = getDummyProperties();
        setRepairs(repairData);
        setProperties(propertyData);
      } catch (error) {
        setError('Error fetching repairs data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();

  }, []);

  const handleClickOpen = (repair) => {
    setSelectedRepair(repair);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRepair(null);
  };

  const handleCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleCreateClose = () => {
    setOpenCreate(false);
    setNewRepair({
      name: '',
      status: '',
      typeOfRepair: '',
      description: '',
      repairDate: null,
      propertyId: '',
    });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewRepair((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setNewRepair((prev) => ({
      ...prev,
      repairDate: date,
    }));
  };

  const handleCreateSubmit = () => {
    console.log('New Repair:', newRepair);
    setRepairs((prec) => [
      ...prev,
      { ...newRepair, id: prev.length + 1 },
    ]);
    handleCreateClose();
  }

  const handleCreateRepair = () => {
    console.log('Create New Repair');
  }

  const handleUpdateRepair = () => {
    console.log('Update a Repair');
  }

  const handleDeleteRepair = () => {
    console.log('Delete Repair');
  }

  const handleDeactivateRepair = () => {
    console.log('Deactivate Repair');
  }

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;

  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>REPAIRS</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleCreateOpen}
        style={{ marginBottom: '20px' }}>
        Create New repair
      </Button>
      <List>
        {repairs.map((repair) => (
          <ListItem key={repair.id} divider>
            <ListItemText
              primary={repair.name}
              secondary={`Status: ${repair.staus}`}
            />
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => handleUpdateRepair(repair)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleDeleteRepair(repair)}
              >
                <Delete />
              </IconButton>
              <IconButton
                color="default"
                onClick={() => handleDeactivateRepair(repair)}
              >
                <ToggleOff />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
      </List>

      <Dialog open={openCreate}
        onClose={handleCreateClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedRepair?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Status: {selectedRepair?.status}
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
      </Dialog>

      <Dialog
        open={openCreate}
        onClose={handleCreateClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle> Create New Repair </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type Of Repair</InputLabel>
            <Select
            name = "typeOfRepair"
            value={newRepair.typeOfRepair}
            onChange={handleCreateChange}
            label = "Type of Repair">
              <MenuItem value = "PAINTING">Painting</MenuItem>
              <MenuItem value = "INSULATION">Insulation</MenuItem>
              <MenuItem value = "FRAMES">Frames</MenuItem>
              <MenuItem value = "PLUMBING">Plumbing</MenuItem>
              <MenuItem value = "ELECTRICAL_WORK">Electrical Work</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <LocalizationProvider dateAdapter = {AdapterDateFns}>
              <DatePicker
              label = "Repair Date"
              value = {newRepair.repairDate}
              onChange = {handleDateChange}
              renderInput = {(params) => <TextField{...params}/>}
              />
            </LocalizationProvider>
            </FormControl>

            <FormControl fullWidth margin="normal" sx={{ minWidth: 120 }}>
            <InputLabel>Property</InputLabel>
            <Select
              name="propertyId"
              value={newRepair.propertyId}
              onChange={handleCreateChange}
              label="Property"
            >
              {properties.map((property) => (
                <MenuItem key = {property.id} value = {property.id}>
                {property.name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick = {handleCreateClose} color = "secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateSubmit} color = "primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container >
  );
};
console.log("tsifsa");
export default Repair;

