import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { BookForm } from '../BookForm/BookForm';
import { Box } from '@mui/system';
import { getAuth } from 'firebase/auth';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
    editable: true,
  },
  {
    field: 'published_date',
    headerName: 'Published Date',
    width: 150,
    editable: true,
  },
  {
    field: 'publisher',
    headerName: 'Publisher',
    width: 150,
    editable: true,
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    width: 110,
    editable: true,
    type: 'number'
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
    editable: true,
    type: 'number'
  },
  {
    field: 'stock_quantity',
    headerName: 'Available Stock',
    width: 110,
    editable: true,
    type: 'number'
  },

  {
    field: 'image_url',
    headerName: 'Cover Image',
    width: 500,
    editable: true,
  },
];

interface gridData {
  data: {
    id?: string;
  }
}


export const DataTable = () => {

  let { bookData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridRowSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData)


  const MyAuth = localStorage.getItem('myAuth');
  console.log(MyAuth);

  //Conditional to render DataTable only for authenticated users
  if (MyAuth == 'true') {
    return (
      <Box style={{ height: 400, width: '100%' }}>
        <h2>Book In Inventory</h2>
        <DataGrid
          rows={bookData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel) }}
          {...bookData}
        />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

        {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Book</DialogTitle>
          <DialogContent>
            <DialogContentText>Book id: {gridData[0]}</DialogContentText>
            <BookForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color="primary">Done</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else {
    return ( 
      <div>
        <h3>Please Sign In to View Your Book Collection</h3>
      </div>
    )
  };
}
